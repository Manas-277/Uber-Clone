import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className='bg-cover bg-center bg-[url(D:\BACKEND_PROJECTS\UBER_CLONE\FRONTEND\images\Gemini_Generated_Image_qg00spqg00spqg00.png)] h-screen pt-9 w-full bg-amber-400 flex justify-between flex-col'>
        <img className='w-20 ml-10' src="https://www.edigitalagency.com.au/wp-content/uploads/Uber-logo-white-png-900x313.png" alt="" />
        <div className='bg-white py-4 px-4 pb-7'>
          <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
          <Link to='/login' className='flex items-center justify-center font-bold w-full bg-black text-white rounded-2xl py-3 mt-5'>Continue</Link>
        </div>
      </div>
    </div>
  )
}

export default Start