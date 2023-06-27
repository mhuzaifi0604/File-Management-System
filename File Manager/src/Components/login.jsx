import React, { useState } from 'react';
import file from '../assets/file.jpg';
import {
  BrowserRouter as Router,
  Routes,
  Link,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    formValidation();
    if (!error) {
      navigate('/dashboard')
    }
  };

  const formValidation = () => {
    if (email === '' && password === '') {
      setError('The form is empty');
    } else if (email === '') {
      setError('Please enter your email');
    } else if (email.indexOf('.') === -1) {
      setError('Email format is missing a "."')
    } else if (password === '') {
      setError('Please enter your password');
    } else if (password.length < 8) {
      setError('Password Length must be at least 8 characters')
    } else if (password === '        ') {
      setError('You cannot set all characters of password == space.')
    }
    else {
      getFormData();
      setError('');
      setEmail('');
      setPassword('');
    }
  };

  const getFormData = () => {
    const newData = {
      Email: email,
      Password: password,
    };

    setFormData((prevData) => [...prevData, newData]);
    console.log(formData);
  };

  return (

    <div className='flex flex-grow flex-shrink h-screen w-screen border-2 border-pink-950'>
      <div className='flex flex-grow basis-1/2 justify-center items-center overflow-auto bg-[#1b1b5b] bg-opacity-30'>
        <form onSubmit={handleSubmit} className="m-5 p-6 w-4/5 border-2 border-blue-900 bg-[#170c27] backdrop-filter backdrop-blur-md shadow-lg shadow-teal-100 rounded-md">
          <div className='flex justify-center items-center'>
            <h2 className="text-3xl mb-2 font-serif text-justify italic font-semibold text-white text-opacity-90" >Nice to See you again</h2>
          </div>
          <div className='flex justify-center items-center'>
            <h3 className="text-white block mb-5 font-serif italic">
              Please enter your details.
            </h3>
          </div>
          <label htmlFor="email" className="block mb-6 text-white font-serif italic">
            Email
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border mt-2 border-blue-500 p-2 w-full rounded-md focus:outline-none focus:border-teal-500 bg-transparent text-white"
            />
          </label>

          <label htmlFor="password" className="block mb-3 text-white font-serif italic">
            Password
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border mt-2 border-blue-500 p-2 w-full rounded-md focus:outline-none focus:border-teal-500 bg-transparent text-white"
            />
          </label>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex items-center justify-between mb-5">
            <label htmlFor="check-box" className='appearance-none w-32 h16 rounded-md cursor-pointer'>
              <input type="checkbox" id="check-box" className="text-white mr-2 font-serif " />
              Remember Me
            </label>

            <a href="#!" className="text-teal-500 text-sm underline italic font-serif">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            Sign in
          </button>
          <p className='text-center'>
            <a href="#!" className="text-teal-500 text-sm">
              Don't have an account? Sign up
            </a>
          </p>
        </form>
      </div>
      <div className='flex flex-grow basis-1/2 overflow-auto bg-gray-400 text-black'>
        <img
          src={file}
          alt="image from unsplash"
          className="w-full object-cover"
        />
      </div>
    </div>
  )
}
export default Login;