import { useState, useEffect } from "react";
import classNames from 'classnames';
import Picflip from "./picflip";
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import 'animate.css';

function Home() {
    const [vendors, setvendors] = useState(5);
    const [names, setnames] = useState(['NUCES', 'Comsats', 'Air', 'LUMS', 'GIKI']);
    const [files, setfiles] = useState([10, 20, 15, 30, 25]);
    const [total, settotal] = useState(0);
    const [check, setcheck] = useState(true);
    const imageurl = 'https://www.shutterstock.com/image-photo/vendor-concept-wooden-letters-on-260nw-709623133.jpg';
    const [rating, setrating] = useState([]);
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    const generateRating = () => {
        const min = 1;
        const max = 5;
        const ratings = Math.floor(Math.random() * (max - min + 1)) + min;
        return ratings;
    };

    const handleRatingClick = (index) => {
        const updatedRatings = [...rating];
        updatedRatings[index] = generateRating();
        setrating(updatedRatings);
    };

    useEffect(() => {
        let temp = 0;
        for (let i = 0; i < files.length; i++) {
            temp += parseInt(files[i]);
        }
        settotal(temp);
    }, [files])

    const handleSunbmit = (e) => {
        e.preventDefault();
        const newname = e.target.elements.vendor.value;
        const newfile = parseInt(e.target.elements.Files.value);
        setvendors(vendors + 1);
        setfiles([...files, newfile]);
        setnames([...names, newname]);
        e.target.reset();
    };

    const data = {
        labels: names,
        datasets: [
            {
                label: 'no of files',
                data: files,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.4)",
                    "rgba(54, 162, 235, 0.3)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.3)",
                    "rgba(123, 213, 133, 0.4)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(0, 212, 180, 1)"
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 10, // Adjust the font size for the labels
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'No. of files',
                },
            },
            x: {
                title: {
                    display: false,
                    text: 'vendor names',
                },
                ticks: {
                    font: {
                        size: 2,
                    },
                },
            },
        },
    };

    return (
        <>
            <div className="flex flex-col items-center h-full w-full">
                <div className="flex justify-center w-3/5 h-12 items-center m-2 p-2 border border-teal-500 rounded-full bg-[#212134] font-sans font-semibold text-lg absolute top-0 shadow-md shadow-gray-500">
                    Welcome To &nbsp;<p className="text-teal-500 font-sans font-semibold text-lg">Dashboard</p>
                </div>
                <form method="POST" onSubmit={handleSunbmit} className="flex justify-center items-center w-full mt-24 h-16">
                    <label className=" text-white font-serif italic">Vendor:&nbsp;</label>
                    <input type="text" name='vendor' placeholder="Enter New Vendor" className="text-white w-2/6 border-2 border-teal-500 bg-transparent p-1 m-2 rounded-full focus:bg-[#212134]" />
                    <label className=" text-white font-serif italic">Files:&nbsp;</label>
                    <input type="number" name='Files' placeholder="Enter No. of files" className="text-white w-2/6 border-2 border-teal-500 bg-transparent p-1 m-2 rounded-full focus:bg-[#212134]" />
                    <button type="submit" className="w-0.5/6 bg-[#1a1a1a] text-teal-500 justify-center ml-6 hover:h-12 hover:bg-teal-500 hover:text-black ">Add Vendor</button>
                </form>
                <div className="flex items-center w-full h-48 mt-8">
                    <div className="flex w-1/3 h-full text-white rounded-lg m-4 bg-[#212134] border border-teal-500">
                        <Picflip imageurl={imageurl} vendors={vendors} total={total} check={check} />
                    </div>
                    <div className="flex w-1/3 h-full text-white rounded-lg m-4 bg-[#212134] border border-teal-500">
                        <Picflip imageurl={imageurl} vendors={vendors} total={total} check={!check} />
                    </div>
                    <div className="flex w-1/3 h-full text-white rounded-lg m-4 bg-[#212134] border border-teal-500">
                        <Doughnut data={data} options={options} className="animate-pulse" />
                    </div>
                </div>
                <div className="flex items-center w-full h-6">
                    <div className="flex justify-center items-center w-1/3 h-full text-white m-4 text-sm">▶ Click To Check Total Vendors</div>
                    <div className="flex justify-center items-center w-1/3 h-full text-white m-4 text-sm">▶ Click To Check Total Files</div>
                    <div className="flex justify-center items-center w-1/3 h-full text-white m-4 text-sm">▶ Graph: Vendors & Files</div>
                </div>
                <div className="flex justify-center items-center h-full w-full overflow-y-auto p-2">
                    <ul className="w-5/6 relative">
                        {names.map((vendor_name, index) => (
                            <li key={index} className={`flex items-center w-full h-12 bg-[#212134] border border-teal-500 m-2 p-2 rounded-full font-bold relative animate__animated ${animate ? "animate__slideInLeft" : ""}`}>
                                <span className='flex items-center justify-center'>{index + 1} - {vendor_name}
                                    {rating[index] !== undefined ? (
                                        <span className="absolute right-4">{'⭐'.repeat(rating[index])}</span>
                                    ) : (
                                        <button onClick={() => handleRatingClick(index)} className="p-2 m-2 h-10 rounded-lg text-sm bg-[#1a1a1a] text-teal-500 hover:bg-teal-500 hover:text-black absolute right-4">View Rating</button>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </>
    )
}
export default Home;