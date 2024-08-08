import React, { useState, useEffect } from 'react';
import './Model3.css';

const Model3 = () => {
  const [countdown, setCountdown] = useState(10); // 300 seconds = 5 minutes
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setLoading(true); // Set loading to true when the button is clicked
    const token = localStorage.getItem('usersdatatoken');
    if (!token) {
        console.error('No token found');
        setLoading(false); // Set loading to false in case of error
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ submit: true })
        });

        if (!response.ok) {
            console.error('Error submitting', response.statusText);
            setLoading(false); // Set loading to false in case of error
            return;
        }

        console.log('Submission successful');
        setLoading(false);
        history('/dash')

    } catch (error) {
        console.error('Error in submission process:', error);
        setLoading(false); // Set loading to false in case of error
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
      {buttonEnabled && (
        <button onClick={handleHome} disabled={loading}>
          {loading ? (
            <div className="spinner"></div>
          ) : (
            "Go to Home Page"
          )}
        </button>
      )}
    </div>
  );
};

export default Model3;
