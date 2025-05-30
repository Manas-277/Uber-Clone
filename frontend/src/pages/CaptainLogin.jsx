import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [CaptainData, setCaptainData] = useState({})
    const navigate = useNavigate();

    const submitHandler = async (e)=>{
      console.log(email, password);
      const captainData = {
        email: email,
        password: password
      }
      e.preventDefault();

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
      if(response.status === 200){
        const data = response.data;
        setCaptainData(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home')
      }
      setEmail('');
      setPassword('');
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3.5' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      <form onSubmit={(e)=>{
        submitHandler(e);
      }}>
        <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
        <input 
        required 
        value={email}
        onChange={(e)=>{
          // console.log(e.target.value);
          setEmail(e.target.value)
        }}
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        type="email" 
        placeholder='email@example.com' 
        />
        <h3 className='text-lg mb-2 font-medium'>Enter Password</h3>
        <input 
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        required 
        value={password}
        onChange={(e)=>{
          setPassword(e.target.value)
        }}
        type="password" 
        placeholder='password' 
        />
        <button className='bg-[#111] text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
      </form>
        <p className='text-center'>Want to join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to='/login' className='flex items-center justify-center mb-5 bg-[#bc9a58] text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin