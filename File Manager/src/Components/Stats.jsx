import React from 'react'
import { useLocation } from 'react-router-dom'

const Stats = () => {
    const location = useLocation()
    const data = location.state.data
    console.log(data)
    const stats = data.from === "virustotal" ? data.data.data.attributes.stats : data.details.stats
    const meta = data.from === "virustotal" ? data.data.meta.file_info : data.details.meta
    const analysis_id = data.from === "virustotal" ? data.data.data.id : data.details.analysis_id
  return (
    <div className='flex w-screen h-screen flex-col justify-start items-center gap-4 my-10'>
        <h1 className='flex w-full justify-center items-center text-2xl font-bold '>Analysis Results</h1>
        <p><strong>Status - </strong><i className={`${stats.malicious > 0 ? "text-red-500" : "text-green-500"} font-bold underline`}>{data.data.result ? data.data.result : stats.malicious > 0 ? "Malicious" : "Bening"}</i></p>
        <h2 className='flex w-full text-xl font-bold justify-center item-center'>Hash Details</h2>
        <p><strong>MD5 - </strong><i>{meta.md5 }</i></p>
        <p><strong>SHA1 - </strong><i>{meta.sha1}</i></p>
        <p><strong>SHA256 - </strong><i>{meta.sha256}</i></p>
        <hr className='flex w-[95%] border-1 border-white' />
        <h1 className='flex w-full justify-center items-center font-bold text-3xl'>Stats</h1>
        <div className="flex flex-col w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg p-6 rounded-lg shadow-lg border border-opacity-30 border-white gap-4">
          <p className="flex w-full justify-center items-center text-white">
            <strong><i>Analysis Id - </i></strong> {analysis_id}
          </p>

          {/* <p className="text-white">
            <strong><i>TimeStamp - </i></strong> {new Date(data.data.attributes.date * 1000).toLocaleString()}
          </p> */}

          <p className="flex w-full justify-center items-center text-white">
            <strong><i>Total Vendors - </i></strong> {data.from === "virustotal" ? Object.keys(data.data.data.attributes.results).length : Object.values(stats).reduce((acc, value) => acc + value, 0) }
          </p>
          </div>
        
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '20px' 
        }}>
            {Object.entries(stats).map(([key, value]) => (
                <div 
                    key={key} 
                    style={{ 
                        border: '1px solid #ccc', 
                        padding: '10px', 
                        textAlign: 'center',
                        borderRadius: '5px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <strong>{key}</strong>
                    <div>{value}</div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Stats