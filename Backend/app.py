from flask import Flask, request, jsonify
import os
import requests
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = 'upload'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Create the upload folder if it doesn't exist

VIRUSTOTAL_API_KEY = ""
VIRUSTOTAL_UPLOAD_URL = "https://www.virustotal.com/api/v3/files"
VIRUSTOTAL_ANALYSIS_URL = "https://www.virustotal.com/api/v3/analyses/"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

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
                    # Return the completed analysis result
                    print("\n ========== .:: Analysis Result ::. ==========\n[+] - Sending to Server")
                    return jsonify(analysis_result), 200
                else:
                    # Sleep for a few seconds before checking again
                    time.sleep(10)

            return jsonify({"error": "Analysis did not complete"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
