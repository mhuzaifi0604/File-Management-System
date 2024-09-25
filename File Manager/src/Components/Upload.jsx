// import React, { useCallback, useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

// const FileUpload = () => {
//     const [selectedFiles, setSelectedFiles] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const filesPerPage = 8;
//     const [secs, setsecs] = useState(0);
//     const [mins, setmins] = useState(0);
//     const [hours, sethours] = useState(0);

//     const [file, setFile] = useState(null);
//     const [message, setMessage] = useState('');

//     const onFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };

//     const onFileUpload = async (e) => {
//         e.preventDefault();
//         if (!file) {
//             setMessage('Please select a file first!');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://localhost:3001/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });
//             setMessage(response.data.message);
//         } catch (error) {
//             setMessage('Error uploading file.');
//             console.error(error);
//         }
//     };
// //  useEffect(() => {
// //     const time= new Date();
// //     setsecs(time.getSeconds());
// //     setmins(time.getMinutes());
// //     sethours(time.getHours());
// //  })

// //     const onDrop = useCallback((acceptedFiles) => {
// //         setSelectedFiles([...selectedFiles, ...acceptedFiles]);
// //     }, [selectedFiles]);

// //     const removeFile = (index) => {
// //         const updatedFiles = [...selectedFiles];
// //         updatedFiles.splice(index, 1);
// //         setSelectedFiles(updatedFiles);
// //     };

// //     const handleSearch = (event) => {
// //         setSearchTerm(event.target.value);
// //         setCurrentPage(1);
// //     };

// //     const handlePageChange = (page) => {
// //         setCurrentPage(page);
// //     };

// //     const { getRootProps, getInputProps } = useDropzone({ onDrop });

// //     const filteredFiles = selectedFiles.filter((file) =>
// //         file.name.toLowerCase().includes(searchTerm.toLowerCase())
// //     );

// //     const totalFiles = filteredFiles.length;
// //     const totalPages = Math.ceil(totalFiles / filesPerPage);
// //     const indexOfLastFile = currentPage * filesPerPage;
// //     const indexOfFirstFile = indexOfLastFile - filesPerPage;
// //     const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

//     // const renderPagination = () => {
//     //     if (totalPages <= 1) {
//     //         return null;
//     //     }
//     //     return (
//     //         <div className="mt-4 flex justify-center">
//     //             {Array.from(Array(totalPages), (x, index) => index + 1).map((page) => (
//     //                 <button
//     //                     key={page}
//     //                     onClick={() => handlePageChange(page)}
//     //                     className={`mx-1 w-10 px-2 py-1 rounded font-bold ${page === currentPage ? 'bg-teal-500 text-black' : 'bg-[#1a1a1a] text-teal-500'
//     //                         }`}
//     //                 >
//     //                     {page}
//     //                 </button>
//     //             ))}
//     //         </div>
//     //     );
//     // };

//     return (
//         <div className="flex flex-col items-center h-full w-full">
//              <div>
//             <h2>File Upload to VirusTotal</h2>
//             <form onSubmit={onFileUpload}>
//                 <input type="file" onChange={onFileChange} />
//                 <button type="submit">Upload</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//             {/* <div className="flex justify-center w-3/5 h-12 items-center m-2 p-2 border border-teal-500 rounded-full bg-[#212134] font-sans font-semibold text-lg absolute top-0 shadow-md shadow-gray-500">
//                 Welcome To &nbsp;<p className="text-teal-500 font-sans font-semibold text-lg">File Manager</p>
//             </div>
//             <div className="flex items-center w-full h-16 mt-20">
//                 <div className="w-4/5 m-2">
//                     <input
//                         type="text"
//                         placeholder="Search by name"
//                         value={searchTerm}
//                         onChange={handleSearch}
//                         className="w-full border border-teal-500 p-2 rounded-full h-10 ml-8"
//                     />
//                 </div>
//                 <div className="w-1/5">
//                     <div {...getRootProps()} className="ml-10">
//                         <input {...getInputProps()} />
//                         <button className="bg-[#1a1a1a] text-teal-500 hover:bg-teal-500 hover:text-black font-bold py-2 px-4 rounded">
//                             Upload Files
//                         </button>
//                     </div>
//                 </div>
//             </div>
//             <ul className="mt-4 w-5/6 relative">
//                 {currentFiles.map((file, index) => (
//                     <li key={index} className="flex items-center w-full h-10 bg-[#212134] border border-teal-500 m-2 p-2 rounded-full font-bold">
//                         <span className='absolute left-4'>{index+1} - {file.name}                            
//                         </span>
//                         <span className='absolute right-1/3'>${hours}h:${mins}m:${secs}s</span>
//                         <button
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg absolute right-3"
//                             onClick={() => removeFile(index)}
//                         >
//                             Delete
//                         </button>
//                     </li>
//                 ))}
//             </ul>
//             {renderPagination()} */}
//         </div>
//     );
// };

// export default FileUpload;
import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data); // Set the result from VirusTotal API
      console.log("Response: ", data)
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      {result && (
        <div>
          <h3>VirusTotal Result:</h3>
          <pre className='overflow-auto'>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
