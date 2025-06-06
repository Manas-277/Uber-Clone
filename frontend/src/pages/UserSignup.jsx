import React, { useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../Context/userContext'

const UserSignup = () => {
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [UserData, setUserData] = useState({})

  const navigate = useNavigate(); 

  const {user, setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e)=>{
    e.preventDefault();
    const newUser = {
      fullName:{
        firstName: firstName,
        lastName: lastName,
      }, 
      email: Email,
      password: Password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
    if(response.status === 201){
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('token', data.token)
      navigate('/home');
    }

    setfirstName('')
    setlastName('')
    setEmail('')
    setPassword('')
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-10' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h3 className='text-lg mb-2 font-medium'>What's your Name</h3>
        <div className='flex gap-3 mb-5'>
        <input 
        required 
        value={firstName}
        onChange={(e)=>{
          setfirstName(e.target.value);
        }}
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm'
        type="text" 
        placeholder='First name' 
        />
        <input 
        required 
        value={lastName}
        onChange={(e)=>{
          setlastName(e.target.value);
        }}
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder:text-sm'
        type="text" 
        placeholder='Last name' 
        />
        </div>
        <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
        <input 
        required 
        value={Email}
        onChange={(e)=>{
          setEmail(e.target.value);
        }}
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-base placeholder:text-sm'
        type="email" 
        placeholder='email@example.com' 
        />
        <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
        <input 
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-base placeholder:text-sm'
        required 
        value={Password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        type="password" 
        placeholder='password' 
        />
        <button className='bg-[#111] text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-base placeholder:text-base'>Create Account</button>
      </form>
        <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className="text-[10px] text-gray-500 text-center">
          By signing up, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>. Your information is kept secure and will not be shared without your consent.
        </p>
      </div>
    </div>
  )
}

export default UserSignup