import LandingPage from "./components/LandingPage";
import ExamDashboard from "./components/ExamDashboard";

import PolicyPage from "./components/PolicyPage";
import Po1 from "./components/Po1";
import PolicyPageCloud from "./components/PolicyPageCloud";
import HomePage from "./components/HomePage";
import HomePageCloud from "./components/HomePageCloud";
import EApp from './ExamComponents/EApp';
// import EAppCloud from './ExamComponentsCloud/EAppCloud';

// import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import FullScreenExample from "./components/Fullscreen2";
import Examiner from "./components/Examiner";
import ExaminerDash from "./components/ExaminerDash";
import Dashboard from "./components/Dashboard";
// import "./App.css"

function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://examination-center.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      console.log("user not valid");
    } else {
      console.log("user verify");
      setLoginData(data)
      history("/dash");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      DashboardValid();
      setData(true)
    }, 2000)

  }, [])

  return (
    <>
      {
        data ? (
          <>
            {/* <Header /> */}

            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/examiner" element={<Examiner />} />

              <Route path="/examinerdash" element={<ExaminerDash />} />

              <Route path="/dash" element={<Dashboard />} />
              <Route path="/examDashboard" element={<ExamDashboard />} />
              <Route path="/password-reset" element={<PasswordReset />} />
              <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
              
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/po1" element={<Po1 />} />
              <Route path="/policyCloud" element={<PolicyPageCloud />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/homecloud" element={<HomePageCloud />} />
              <Route path='/eapp' element={ <EApp/> } />
              <Route path="/fullscreen" element={ <FullScreenExample/> } />
              {/* <Route path='/eappcloud' element={ <EAppCloud/> } /> */}

              <Route path="*" element={<Error />} />
            </Routes>
          </>

        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }


    </>
  );
}

export default App;
