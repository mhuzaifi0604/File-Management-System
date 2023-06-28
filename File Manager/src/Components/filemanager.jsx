import { useState } from "react";
import FileUpload from "./Upload";

function File_Manager() {
    return(
        <>
        <div className="flex flex-col justify-center items-center h-full w-full">
            <FileUpload/>
        </div>
        
        </>
    )
}
export default File_Manager;