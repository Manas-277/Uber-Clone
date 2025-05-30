import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear captain's authentication token from localStorage
    localStorage.removeItem('captainToken');
    localStorage.removeItem('captainInfo');
    
    // Add any other captain-specific items to clear
    
    // Redirect to login page
    navigate('/captain-login');
  }, [navigate]);

  return (
    <div className="logout-container">
      <h2>Logging out...</h2>
      <p>Please wait while we log you out safely.</p>
    </div>
  );
};

export default CaptainLogout;