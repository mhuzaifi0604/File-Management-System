import React, { useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import filescan from '../assets/filescan.png';
import PacmanLoader from "react-spinners/PacmanLoader";
import AOS from 'aos'
import "aos/dist/aos.css"


const Clone = () => {
  const [active, setActive] = useState("File");
  const [file, setFile] = useState(null);
  const [loading, setloading] = useState(false)
  const [data, setdata] = useState(null);
  const fileInputRef = useRef(null); // Ref for the hidden file input
  const navigate = useNavigate()

  // Function to trigger file input click when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };

  // Function to handle file selection and submit the file to the server
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Update the state with the selected file
      handleFileSubmit(selectedFile); // Call the function to send the file to the server
    }
  };

  // Function to send the file to the backend server
  const handleFileSubmit = async (selectedFile) => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile); // Append selected file to the form data

    try {
      console.log("Sending File For Analysis...")
      setloading(true)
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log("Response: ", data);
      setdata(data)
      setloading(false)
      navigate('/stats', {state: {data: data}})
      // You can add any further action you want to perform after getting the response
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    AOS.init({ // animation initialization and setting duration
      duration: 2000
    })
  }, [])
  

  return (
    <div className='flex w-full flex-col justify-start items-center gap-8 my-10'>
      <h1 className='flex w-full justify-center items-center text-5xl font-bold text-white text-green-500'>
        Sentinel Guard
      </h1>
      <p className='flex w-[70%] text-lg font-semibold text-white font-sans text-center justify-center'>
        Malicious File Detection System
      </p>

      {/* Buttons for Different Sections */}
      <div className='flex flex-row w-[70%] justify-center items-center'>
        <button
          className={`flex justify-center items-center bg-transparent w-1/3 border-t-0 border-l-0 border-r-0 rounded-none text-lg font-semibold focus:outline-none focus:ring-0 ${active === "File" ? "text-green-500 border-b-4 border-green-500" : "text-white border-b-1 border-white"}`}
          onClick={() => setActive("File")}
        >
          File
        </button>

        <button
          className={`flex justify-center items-center bg-transparent w-1/3 border-t-0 border-l-0 border-r-0 rounded-none text-lg font-semibold focus:outline-none focus:ring-0 ${active === "Hash" ? "text-green-500 border-b-4 border-green-500" : "text-white border-b-1 border-white"}`}
          onClick={() => setActive("Hash")}
        >
          Hash
        </button>

        <button
          className={`flex justify-center items-center bg-transparent w-1/3 border-t-0 border-l-0 border-r-0 rounded-none text-lg font-semibold focus:outline-none focus:ring-0 ${active === "URL" ? "text-green-500 border-b-4 border-green-500" : "text-white border-b-1 border-white"}`}
          onClick={() => setActive("URL")}
        >
          URL
        </button>
      </div>

      {/* File Upload Section */}
      {active === "File" &&
        <div className='flex flex-col w-[70%] justify-center items-center gap-8'>
          <img src={filescan} alt="Scan Your File" className='w-28 h-28' />
          {loading ? <PacmanLoader color='#00FF00' loading={loading} size={25} /> :
            <button
              className='w-max text-semibold text-green-500 bg-transparent border border-green-500 rounded-lg focus:outline-none focus:ring-0 hover:text-black transition-all duration-300 hover:bg-gray-500 hover:scale-105 transform transition-all duration-300 ease-in-out'
              onClick={handleButtonClick} // Trigger file input
            >
              Upload File
            </button>}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange} // Automatically submit after selection
            style={{ display: 'none' }} // Hide the input
          />
          {/* {
            loading ? <p className='w-[70%] text-center text-white font-sans animate-pulse'>Awaiting Analyses Results</p>
              : <div>
                {data && (
                  <div className="flex flex-col w-full justify-start items-start gap-4" data-aos="slide-in">
                    <h2 className="w-full text-center text-xl text-white font-semibold">
                      Analysis Results
                    </h2>

                    <div className="flex flex-col w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg border border-opacity-30 border-white gap-4">
                      
                      <p className="text-white">
                        <strong><i>File Hash (SHA-256) - </i></strong> {data.meta.file_info.sha256}
                      </p>
                      <p className="text-white">
                        <strong><i>Analysis Id - </i></strong> {data.data.id}
                      </p>

                      <p className="text-white">
                        <strong><i>TimeStamp - </i></strong> {new Date(data.data.attributes.date * 1000).toLocaleString()}
                      </p>

                      <p className="text-white">
                        <strong><i>Total Vendors - </i></strong> {Object.keys(data.data.attributes.results).length}
                      </p>
                      <div className="flex flex-row justify-start items-center flex-wrap w-full gap-2">
                        {Object.entries(data.data.attributes.stats).map(([key, value], index) => (
                          <p className="text-white" key={index}>
                            <strong><i>{key} - </i></strong> {value} &nbsp;&nbsp; | &nbsp;&nbsp;
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                )}


              </div>
          } */}
        </div>
      }

      {/* Hash Input Section */}
      {active === "Hash" &&
        <div className='flex flex-col w-[70%] justify-center items-center gap-8'>
          {/* Add Hash Input Section here */}
        </div>
      }

      {/* URL Input Section */}
      {active === "URL" &&
        <div className='flex flex-col w-[70%] justify-center items-center gap-8'>
          {/* Add URL Input Section here */}
        </div>
      }
    </div>
  );
};

export default Clone;
