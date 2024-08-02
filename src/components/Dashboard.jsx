import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Header from './Header';
import './Dashboard.css';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const history = useNavigate();
  const [photoUrl, setPhotoUrl] = useState('');
  const [Checked, isChecked] = useState(false);

  const DashboardValid = async () => {
    let token = localStorage.getItem('usersdatatoken');
    console.log(token)
    const res = await fetch('http://localhost:3000/validuser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    });
    const data = await res.json();
    if (data.status === 401 || !data) {
      history('*');
    } else {
      setLoginData(data);
      setData(data);
      setPhotoUrl(data.ValidUserOne.photo); // Photo URL from Cloudinary
      history('/dash');
    }
  };

  const goToExamDashboard = () => {
    history('/examDashboard');
  };

  const CheckResult = async () => {
    try {
      const token = localStorage.getItem('usersdatatoken');
      if (!token) {
        Swal.fire({
          title: 'Error',
          text: 'User not authenticated',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      const response = await fetch('http://localhost:3000/Score', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      Swal.fire({
        title: 'Your Score',
        text: `Your score is ${data.Score} / 6`,
        icon: 'info',
        confirmButtonText: 'OK'
      });

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      Swal.fire({
        title: 'Error',
        text: 'Could not fetch the score',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const CheckUserProblem = () => {
    isChecked(!Checked);
  };

  const handleResetCounts = async () => {
    try {
      const token = localStorage.getItem('usersdatatoken');
      const response = await fetch('http://localhost:3000/resetCounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to reset counts. Please try again.');
      console.error(error);
    }
  };

  const showSwal = () => {
    Swal.fire({
      title: 'Cheating Detected',
      html: '<p>If you have been caught cheating, click the button below to reset the exam.</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reset Exam',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleResetCounts();
      }
    });
  };

  const showCheat = async () => {
    try {
      const token = localStorage.getItem('usersdatatoken');
      if (!token) {
        Swal.fire({
          title: 'Error',
          text: 'User not authenticated',
          icon: 'error',
          confirmButtonText: 'OK'
        });
        return;
      }

      const response = await fetch('http://localhost:3000/cheat', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Show alerts for each cheat entry
      const cheatAlerts = data.Cheat.map(cheat => {
        return `<p><strong>Type:</strong> ${cheat.type}<br /><strong>Timestamp:</strong> ${cheat.timestamp}</p>`;
      }).join('<hr>'); // Join with <hr> for separation between alerts

      // Show Swal alert with cheats and transaction URL
      Swal.fire({
        title: 'Cheating Detected',
        html: `${cheatAlerts}<hr><p><strong>Transaction URL:</strong> <a href="${data.txUrl}" target="_blank">${data.txUrl}</a></p>`,
        icon: 'warning',
        confirmButtonText: 'OK'
      });

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      Swal.fire({
        title: 'Error',
        text: 'Could not fetch cheat data',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true);
    }, 2000);
  }, []);

  return (
    <>
      <Header />
      {data ? (
        <div className="bucket">
          <h1>Examinee Details</h1>
          <div className="profile_data">
            <div className="profile-card" style={{ marginTop: "10px" }}>
              <img src={photoUrl} alt="Profile" />
              <div className="profile-info">
                <h2>
                  Name: {logindata ? logindata.ValidUserOne.fname + ' ' + logindata.ValidUserOne.lname : ''}
                </h2>
                <p>Email: {logindata ? logindata.ValidUserOne.email : ''}</p>
                <p>Course: {logindata ? logindata.ValidUserOne.course : ''}</p>
              </div>
            </div>
          </div>
          <div className="bucket1">
            <div className="profile-more">
              <p>Phone Number: {logindata ? logindata.ValidUserOne.phone : ''}</p>
              <p>Date of Birth: {logindata ? logindata.ValidUserOne.dob : ''}</p>
              <p>Batch: {logindata ? logindata.ValidUserOne.batch : ''}</p>
              <p>Gender: {logindata ? logindata.ValidUserOne.gender : ''}</p>
              <p>Nationality: {logindata ? logindata.ValidUserOne.nationality : ''}</p>
            </div>
          </div>
          <button onClick={goToExamDashboard} className='button-Css'>GO to DashBoard</button>
        {/* <button onClick={CheckResult} className='button-Css'>Check the Result</button>
          <button onClick={showSwal} className='button-Css'>Show Reset Button</button>
          <button onClick={showCheat} className='button-Css'>Show Cheat Alert</button>  */}
          <ToastContainer />

        </div>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Dashboard;
