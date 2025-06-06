import React, { createContext, useState } from 'react'
export const CaptainDataContext = createContext();


const captainContext = ({children}) => {
    const [Captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    }

    const value = {
        Captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        setError,
        updateCaptain
    }
  return (
    <div>
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    </div>
  )
}

export default captainContext