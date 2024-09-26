import React, { useState } from 'react';
import file from './assets/file.jpg';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  Outlet
} from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/login';
import SideBar from './Components/sidebar';
import File_Manager from './Components/filemanager';
import FileUpload from './Components/Clone';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login_Manager />} />
          <Route path='/dashboard' element={<Dashboard_Manager />} />
          <Route path='/file-manager' element={<File_Manager_Layout />} />
        </Routes>
      </Router>
    </>
  );
}

function Login_Manager() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
      <Outlet />
    </div>
  )
}
function Dashboard_Manager() {
  return (
    <div className="flex flex-grow flex-shrink h-screen w-screen overflow-auto">
      <div className="flex flex-grow flex-shrink basis-1/5 justify-center shadow-inner shadow-teal-500">
        <SideBar />
      </div>
      <div className="flex flex-grow flex-shrink basis-4/5 justify-center bg-[#170c27]">
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}
function File_Manager_Layout() {
  return (
    <div className="flex flex-grow flex-shrink h-screen w-screen overflow-auto">
      <div className="flex flex-grow flex-shrink basis-1/5 justify-center shadow-inner shadow-teal-500">
        <SideBar />
      </div>
      <div className="flex flex-grow flex-shrink basis-4/5 justify-center bg-[#170c27]">
        <Routes>
          <Route path='/' element={<FileUpload />} />
        </Routes>
        <Outlet />
      </div>
    </div>
  );
}
export default App;
