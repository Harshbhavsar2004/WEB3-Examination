import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Header from './Header';
import './examinerdashboard.css';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ExaminerDash = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const [data, setData] = useState(false);
  const history = useNavigate();
  const [Checked, isChecked] = useState(false);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);




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

      const response = await fetch('https://examination-center.onrender.com/Score', {
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


  const handleResetCounts = async (userId) => {
    try {
        console.log(userId)
      const response = await fetch(`https://examination-center.onrender.com/resetCounts/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Optionally include Authorization header if required by your backend
          // 'Authorization': `Bearer ${token}`
        }
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Update the state or handle success message
        Swal.fire({
            title: 'Done',
            text: data.message,
            confirmButtonText: 'OK'
          });

          const updatedUsers = users.map(user => {
            if (user._id === userId) {
              return { ...user, Cheat: [] }; // Reset Cheat array for the specific user
            }
            return user;
          });
          setUsers(updatedUsers)
    

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to reset counts. Please try again.');
      console.error('Error resetting counts:', error);
    }
  };
  




  const showCheat = async (userId) => {
    try {
        const response = await fetch(`https://examination-center.onrender.com/cheat/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
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
      console.log('There was a problem with the fetch operation:', error);
      Swal.fire({
        title: 'Error',
        text: 'Could not fetch cheat data',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        
        const response = await fetch('https://examination-center.onrender.com/fetchusers', {
          method: 'GET',
          headers: {

            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsers(data); // Update state with fetched users
        setLoading(false); // Set loading to false once data is fetched

      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to fetch user data',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };

    fetchUsers();
  }, []);


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
    <Header />
    <div className="bucket">
      <h1>Examiner Dashboard</h1>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Score</th>
              <th>Cheat Count</th>
              <th>Cheat occurrences</th>
              <th>Reset Cheat</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.Score}</td>
                <td>{user.Cheat.length}</td>
                <td>
                  <button onClick={() => showCheat(user._id)} className='button-Css'>Show Cheat Alert</button>
                </td>
                <td className="button-container">
                  <button onClick={() => handleResetCounts(user._id)} className='button-Css'>Reset Cheat</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>

  );
};


export default ExaminerDash;
