import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const userLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [UserData, setUserData] = useState({})
  const submitHandler = (e)=>{
    console.log(email, password);
    setUserData({
      email: email,
      password: password
    })

    console.log(UserData)
    e.preventDefault();
    setEmail('');
    setPassword('');
  }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-10' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="" />
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
        <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create an Account</Link></p>
      </div>
      <div>
        <Link to='/captain-login' className='flex items-center justify-center mb-5 bg-[#1ed760] text-[#fff] font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default userLogin