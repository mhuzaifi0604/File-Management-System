from flask import Flask, request, jsonify
import os
import requests
import time
from flask_cors import CORS
import hashlib
from pymongo import MongoClient
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'upload'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create the upload folder if it doesn't exist

try:
    client = MongoClient(os.getenv("MONGO_URI"))
    # Check the connection
    client.server_info()  # This will throw an exception if the connection fails
    print("[+] Connected to MongoDB")
except Exception as e:
    print("[-] Failed to connect to MongoDB:", str(e))
    exit(1)

# Accessing database and collection
db = client["Sentinal_Guard"]
print("[+] Database 'Sentinal_Guard' accessed")
collection = db["Results"]
print("[+] Collection 'Results' accessed")
detailsCollection = db["Details"]
print("[+] Collection 'Details' accessed")

# Fetch and print all records from the collection
# print("[+] Records in Collection:")
# records = collection.find_one({"type": "file"})
# print("Record: ", records)

VIRUSTOTAL_API_KEY = os.getenv("API_KEY")
# print("Virustotal API key: ", VIRUSTOTAL_API_KEY)
VIRUSTOTAL_UPLOAD_URL = "https://www.virustotal.com/api/v3/files"
VIRUSTOTAL_ANALYSIS_URL = "https://www.virustotal.com/api/v3/analyses/"

def compute_sha256(file_path):
    sha256_hash = hashlib.sha256()
    with open(file_path, "rb") as f:
        for byte_block in iter(lambda: f.read(4096), b""):
            sha256_hash.update(byte_block)
    return sha256_hash.hexdigest()

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    file_hash = compute_sha256(file_path)
    print("SHA 256 Hash of File: ", file_hash)

    # Check if the file hash already exists in the MongoDB collection
    existing_record = collection.find_one({"content": file_hash, "type": "file"})
    print("Existing Record: ", existing_record)
    if existing_record:
        print("Record Obtained from db: ", existing_record)
        existing_record['_id'] = str(existing_record['_id'])
        analysis_id = existing_record.get('analysis_id')
        detailsRecord = detailsCollection.find_one({"analysis_id": analysis_id})
        detailsRecord['_id'] = str(detailsRecord['_id'])
        # If the file hash exists, return the existing result
        return jsonify({"from": "mongo", "data":existing_record, "details":detailsRecord}), 200

    # Send the file to VirusTotal
    try:
        with open(file_path, "rb") as f:
            files = { "file": (file.filename, f, "application/octet-stream") }
            headers = {
                "accept": "application/json",
                "x-apikey": VIRUSTOTAL_API_KEY
            }
            upload_response = requests.post(VIRUSTOTAL_UPLOAD_URL, files=files, headers=headers)
            upload_result = upload_response.json()
            print("\n ========== .:: Upload Result ::. ==========\n", upload_result)
            # Get the analysis ID
            analysis_id = upload_result.get('data', {}).get('id')
            if not analysis_id:
                return jsonify({"error": "No analysis ID returned from VirusTotal"}), 500

            # Poll the VirusTotal API to get analysis result
            analysis_url = VIRUSTOTAL_ANALYSIS_URL + analysis_id
            analysis_status = "queued"

            while analysis_status != "completed":
                analysis_response = requests.get(analysis_url, headers=headers)
                analysis_result = analysis_response.json()

                # Get the analysis status
                analysis_status = analysis_result.get('data', {}).get('attributes', {}).get('status', 'queued')
                
                if analysis_status == "completed":
    # Return the completed analysis
                    print("[+] - Adding Results Record to DB\n")
                    
                    # Inserting the result into the 'collection'
                    collection.insert_one({
                        "type": "file", 
                        "content": file_hash, 
                        "analysis_id": upload_result['data']['id'], 
                        "result": "malicious" if analysis_result['data']['attributes']['stats']['malicious'] > 0 else "Benign"
                    })
                    
                    print("[+] - Adding Details Record to DB\n")
                    
                    # Make sure to access the correct paths for stats and meta
                    stats = analysis_result['data']['attributes']['stats']
                    meta = analysis_result['meta']['file_info']  # Use .get() to handle cases where meta might be missing
                    
                    # print("Stats: ", stats)
                    # print("Meta: ", meta)
                    
                    # Inserting the stats and meta into the 'detailsCollection'
                    detailsCollection.insert_one({
                        "analysis_id": upload_result['data']['id'],
                        "stats": stats,  # The stats object
                        "meta": meta     # The meta object
                    })
                    
                    print("\n ========== .:: Analysis Result ::. ==========\n[+] - Sending to Server")
                    
                    return jsonify({"from": "virustotal", "data": analysis_result}), 200
                else:
                    # Sleep for a few seconds before checking again
                    time.sleep(10)


            return jsonify({"error": "Analysis did not complete"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000, use_reloader=False)  # Disable the reloader

