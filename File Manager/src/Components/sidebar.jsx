import React, { useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import{faGauge, faFolder, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faGauge, faFolder, faRightFromBracket);
function SideBar() {

    const location = useLocation().pathname;
    const navigate = useNavigate();
    const handlefiles = () =>{
        navigate('/file-manager');
    }
    const handledashboard = () =>{
        navigate('/dashboard');
    }
    const handlelogout = () => {
        navigate('/');
    }

    return (
        <div className="flex flex-col border-2 overflow-auto h-screen w-full bg-[#1b1b5b] bg-opacity-30 border-[#170c27]">
            <div className="flex h-32 mt-10 justify-center items-center">
                <img src="https://icon-library.com/images/upload-icon/upload-icon-5.jpg" alt="Cloud upload" className="w-24 h-24 justify-center items-center rounded-full border-2 border-black p-1 hover:w-28 hover:h-28" />
            </div>
            <div className="flex h-12 m-0 justify-center">
                <p className="text-black font-serif font-xl font-bold hover:animate-bounce">File Manager</p>
            </div>
            <div className="flex h-96 mt-8 justify-center">
                <ol className="justify-center items-center mt-6 p-6 text-center">
                    <button onClick={handledashboard} className="w-full h-12 mb-4 overflow-hidden">
                        <li className={location === '/dashboard' ? "text-teal-500 underline font-serif font-extrabold text-xl mb-12"
                            : "text-black font-serif font-extrabold text-xl mb-12 hover:underline hover:text-white"}>
                            <FontAwesomeIcon icon={faGauge} />&nbsp;Dashboard
                        </li>
                    </button>
                    <button onClick={handlefiles} className="w-full h-12 mb-4" ><li className={location === '/file-manager' ? "text-teal-500 underline font-serif font-extrabold text-xl mb-12"
                        : "text-black font-serif font-extrabold text-xl mb-12 hover:text-white hover:underline"}>
                        <FontAwesomeIcon icon={faFolder} />&nbsp;File Manager
                    </li>
                    </button>
                    <button onClick={handlelogout} className="w-full h-12 mb-4"><li className="text-black font-serif font-extrabold text-xl mb-12 hover:underline hover:text-white">
                    <FontAwesomeIcon icon={faRightFromBracket} />&nbsp;LogOut
                    </li>
                    </button>
                </ol>
            </div>
            <div className="flex h-20 mt-6 p-6">
                <p className="text-black font-serif font-xl font-bold text-center">
                    Manage all your Files with File's cloud. 📂
                </p>
            </div>
        </div>
    )
}
export default SideBar;