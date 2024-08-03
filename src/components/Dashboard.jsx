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

  const DashboardValid = async () => {
    let token = localStorage.getItem('usersdatatoken');
    console.log(token)
    const res = await fetch('https://examination-center.onrender.com/validuser', {
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
