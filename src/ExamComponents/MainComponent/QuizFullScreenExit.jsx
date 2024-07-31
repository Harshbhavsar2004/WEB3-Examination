import React, { useEffect, useContext } from 'react';
import swal from 'sweetalert';
import { LoginContext } from '../../components/ContextProvider/Context';
import { useNavigate } from 'react-router-dom';

function App() {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.keyCode === 27) {
        swal({
          title: 'Logout?',
          text: 'Do you really want to log out?',
          icon: 'warning',
          buttons: ['Cancel', 'Logout'],
        }).then((willLogout) => {
          if (willLogout) {
            logoutuser();
          }
        });
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const logoutuser = async () => {
    let token = localStorage.getItem('usersdatatoken');

    const res = await fetch('https://block-chain-backend.onrender.com/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        Accept: 'application/json',
      },
      credentials: 'include',
    });

    const data = await res.json();
    console.log(data);

    if (data.status === 201) {
      console.log('User Logout');
      localStorage.removeItem('usersdatatoken');
      setLoginData(false);
      history('/');
    } else {
      console.log('Error');
    }
  };

  return (
    <div>
      {/* Your app code here */}
    </div>
  );
}

export default App;




// --------------------------------------------------------------------------------------------

