import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Header from './Header';
import './Dashboard.css';
import { FaPhone, FaCalendarAlt, FaUser, FaFlag } from 'react-icons/fa';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { AiFillCaretRight } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
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
          <Typography variant="h4" gutterBottom className="header-main-mui">Examinee Details</Typography>
          <div className="profile-container">
            <Card className="profile-card">
              <img src={photoUrl} alt="Profile" className="profile-image" />
              <CardContent className="profile-info-container">
                <Typography variant="h6">
                  <strong>Name:</strong> <span>{logindata ? `${logindata.ValidUserOne.fname} ${logindata.ValidUserOne.lname}` : ''}</span>
                </Typography>
                <Typography>
                  <strong>Email:</strong> <span>{logindata ? logindata.ValidUserOne.email : ''}</span>
                </Typography>
                <Typography>
                  <strong>Course:</strong> <span>{logindata ? logindata.ValidUserOne.course : ''}</span>
                </Typography>
              </CardContent>
            </Card>
            <div className="profile-more">
              <Card className='profile-card2'>
                <Typography>
                  <FaPhone className="icon" />
                  <strong>Phone Number:</strong> <span>{logindata ? logindata.ValidUserOne.phone : ''}</span>
                </Typography>
                <Typography>
                  <FaCalendarAlt className="icon" />
                  <strong>Date of Birth:</strong> <span>{logindata ? logindata.ValidUserOne.dob : ''}</span>
                </Typography>
                <Typography>
                  <FaUser className="icon" />
                  <strong>Batch:</strong> <span>{logindata ? logindata.ValidUserOne.batch : ''}</span>
                </Typography>
                <Typography>
                  <FaFlag className="icon" />
                  <strong>Gender:</strong> <span>{logindata ? logindata.ValidUserOne.gender : ''}</span>
                </Typography>
                <Typography>
                  <FaFlag className="icon" />
                  <strong>Nationality:</strong> <span>{logindata ? logindata.ValidUserOne.nationality : ''}</span>
                </Typography>
              </Card>
            </div>
          </div>
          <Button variant="contained" color="primary" onClick={goToExamDashboard} className='dashboard-button'>
            <AiFillCaretRight />GO to Dashboard
          </Button>
            <Link to={'/DocumentDownloader'}><Button variant='contained' className='dashboard-button1'>
            <IoMdDownload/><strong>Download Certificate</strong></Button></Link>
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
