import React from "react";
import { useState } from "react";
import classNames from 'classnames';
import img from '../assets/img.jpg';


function Picflip({ imageurl, vendors, total, check }) {
    const [isContentVisible, setIsContentVisible] = useState(false);

    const toggleContent = () => {
        setIsContentVisible(!isContentVisible);
    };

    const pictureClasses = classNames('cursor-pointer', {
        'hidden': isContentVisible,
    });

    const contentClasses = classNames('mt-4', {
        'hidden': !isContentVisible,
    });
    
    return (
        <>
            {!isContentVisible && (
                <img
                    src={check ? imageurl : img}
                    alt="Picture"
                    className={`${pictureClasses} w-full object-cover rounded-md`}
                    onClick={toggleContent}
                />
            )}

            {isContentVisible && (
                <div className={`${contentClasses} flex relative w-full mt-0 rounded-md bg-[#212134] bg-opacity-30 justify-center items-center`} onClick={toggleContent}>
                    <p className=" text-teal-500 font-sans font-extrabold text-4xl absolute top-1 left-15">
                        {check ? "Total Vendors" : "Total Files"}
                    </p>
                    <p className=" text-teal-500 font-sans font-extrabold text-8xl absolute bottom-1 right-15">
                        {check ? `${vendors}` : `${total}`}
                    </p>
                </div>
            )}
        </>
    )
}
export default Picflip;