import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const filesPerPage = 8;
    const [secs, setsecs] = useState(0);
    const [mins, setmins] = useState(0);
    const [hours, sethours] = useState(0);
 useEffect(() => {
    const time= new Date();
    setsecs(time.getSeconds());
    setmins(time.getMinutes());
    sethours(time.getHours());
 })

    const onDrop = useCallback((acceptedFiles) => {
        setSelectedFiles([...selectedFiles, ...acceptedFiles]);
    }, [selectedFiles]);

    const removeFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const filteredFiles = selectedFiles.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalFiles = filteredFiles.length;
    const totalPages = Math.ceil(totalFiles / filesPerPage);
    const indexOfLastFile = currentPage * filesPerPage;
    const indexOfFirstFile = indexOfLastFile - filesPerPage;
    const currentFiles = filteredFiles.slice(indexOfFirstFile, indexOfLastFile);

    const renderPagination = () => {
        if (totalPages <= 1) {
            return null;
        }
        return (
            <div className="mt-4 flex justify-center">
                {Array.from(Array(totalPages), (x, index) => index + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`mx-1 w-10 px-2 py-1 rounded font-bold ${page === currentPage ? 'bg-teal-500 text-black' : 'bg-[#1a1a1a] text-teal-500'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col items-center h-full w-full">
            <div className="flex justify-center w-3/5 h-12 items-center m-2 p-2 border border-teal-500 rounded-full bg-[#212134] font-sans font-semibold text-lg absolute top-0 shadow-md shadow-gray-500">
                Welcome To &nbsp;<p className="text-teal-500 font-sans font-semibold text-lg">File Manager</p>
            </div>
            <div className="flex items-center w-full h-16 mt-20">
                <div className="w-4/5 m-2">
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full border border-teal-500 p-2 rounded-full h-10 ml-8"
                    />
                </div>
                <div className="w-1/5">
                    <div {...getRootProps()} className="ml-10">
                        <input {...getInputProps()} />
                        <button className="bg-[#1a1a1a] text-teal-500 hover:bg-teal-500 hover:text-black font-bold py-2 px-4 rounded">
                            Upload Files
                        </button>
                    </div>
                </div>
            </div>
            <ul className="mt-4 w-5/6 relative">
                {currentFiles.map((file, index) => (
                    <li key={index} className="flex items-center w-full h-10 bg-[#212134] border border-teal-500 m-2 p-2 rounded-full font-bold">
                        <span className='absolute left-4'>{index+1} - {file.name}                            
                        </span>
                        <span className='absolute right-1/3'>${hours}h:${mins}m:${secs}s</span>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg absolute right-3"
                            onClick={() => removeFile(index)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            {renderPagination()}
        </div>
    );
};

export default FileUpload;
