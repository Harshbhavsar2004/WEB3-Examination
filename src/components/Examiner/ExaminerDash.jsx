import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Header from '../Header';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';
import './examinerdashboard.css';
import ResetIcon from '@mui/icons-material/RestartAlt';
import AlertIcon from '@mui/icons-material/ReportProblem';
import Searchbar from './Searchbar';
import ReactPaginate from 'react-paginate';
import DeleteIcon from '@mui/icons-material/Delete'; // Import Delete icon
const ITEMS_PER_PAGE = 10;

const ExaminerDash = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);


    const handleDeleteUser = async (userId) => {
      try {
        const response = await fetch(`https://first-project-backend-ycff.onrender.com/deleteUser/${userId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          toast.success("User has been deleted", { position: 'top-center' });
  
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
          
        } else {
          const data = await response.json();
          toast.error(data.message);
        }
      } catch (error) {
        toast.error('Failed to delete user. Please try again.');
        console.error('Error deleting user:', error);
      }
    };

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://first-project-backend-ycff.onrender.com/fetchusers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to fetch user data',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = users.filter(user =>
      user.fname.toLowerCase().includes(lowercasedTerm) ||
      user.lname.toLowerCase().includes(lowercasedTerm)
    );
    setFilteredUsers(filtered);
    setCurrentPage(0); // Reset to the first page when searching
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  const handleResetCounts = async (userId) => {
    try {
      const response = await fetch(`https://first-project-backend-ycff.onrender.com/resetCounts/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        toast.success("Exam attempt has been reset", { position: 'bottom-right' });

        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === userId ? { ...user, Cheat: [] } : user))
        );
        handleSearch(''); // Refresh search results
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Failed to reset counts. Please try again.');
      console.error('Error resetting counts:', error);
    }
  };

  const showCheat = async (userId) => {
    try {
      const response = await fetch(`https://first-project-backend-ycff.onrender.com/cheat/${userId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const cheatAlerts = data.Cheat.map(
        (cheat) => `<p><strong>Type:</strong> ${cheat.type}<br /><strong>Timestamp:</strong> ${cheat.timestamp}</p>`
      ).join('<hr>');

      Swal.fire({
        title: 'Cheating Detected',
        html: `${cheatAlerts}<hr><p><strong>Transaction URL:</strong> <a href="${data.txUrl}" target="_blank">${data.txUrl}</a></p>`,
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.log('There was a problem with the fetch operation:', error);
      Swal.fire({
        title: 'Error',
        text: 'Could not fetch cheat data',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Calculate the users to display for the current page
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageUsers = filteredUsers.slice(offset, offset + ITEMS_PER_PAGE);

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
      <div className="bucket-main">
        <h1>Examiner Dashboard</h1>
        <Searchbar onSearch={handleSearch} />
        <div className="user-table-container">
          <table className="user-table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Score</th>
                <th>Cheat Count</th>
                <th>Cheat</th>
                <th>Reset Exam</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {currentPageUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.fname}</td>
                  <td>{user.lname}</td>
                  <td>{user.Score}</td>
                  <td>{user.Cheat.length}</td>
                  <td className='button-container-main'>
                    <button onClick={() => showCheat(user._id)} className="button-css">
                      <AlertIcon className="icon" /> Show Cheat Alert
                    </button>
                  </td>
                  <td className="button-container">
                    <button onClick={() => handleResetCounts(user._id)} className="button-css">
                      <ResetIcon className="icon" /> Reset Cheat
                    </button>
                  </td>
                  <td className="button-container">
                    <button onClick={() => handleDeleteUser(user._id)} className="button-css">
                      <DeleteIcon className="icon" /> Delete User
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={Math.ceil(filteredUsers.length / ITEMS_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
        <Toaster />
      </div>
    </>
  );
};

export default ExaminerDash;

