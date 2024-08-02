import React, { useState, useEffect } from 'react';
import './Model3.css';

const Model3 = () => {
  const [countdown, setCountdown] = useState(10); // 300 seconds = 5 minutes
  const [buttonEnabled, setButtonEnabled] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setButtonEnabled(true);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleHome = async () => {
    const token = localStorage.getItem('usersdatatoken');
    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch('https://examination-center.onrender.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ submit: true })
        });

        if (!response.ok) {
            console.error('Error submitting', response.statusText);
            return;
        }

        console.log('Submission successful');
        
        // Delay the redirection by 5 seconds
        setTimeout(() => {
            window.location.href = "/dash";
        }, 3000); // 5000 milliseconds = 5 seconds

    } catch (error) {
        console.error('Error in submission process:', error);
    }
};


  // Format seconds into minutes and seconds for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };


  return (
    <div className='Model3'>
      <h2>You have been flagged for potential cheating multiple times. Your exam has been blocked.</h2>
      <p>Please contact your exam administrator for further assistance.</p>
      <p>Redirecting to <strong>DashBoard</strong> in {formatTime(countdown)}...</p>
      {buttonEnabled && <button onClick={handleHome}>Go to Home Page</button>}
    </div>
  );
};

export default Model3;
