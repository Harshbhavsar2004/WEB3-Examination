import LandingPage from "./components/LandingPage";
import ExamDashboard from "./components/ExamDashboard";
import PolicyPage from "./components/PolicyPage";
import Po1 from "./components/Po1";
import HomePage from "./components/HomePage";
import HomePageCloud from "./components/HomePageCloud";
import EApp from './ExamComponents/EApp';
import Login from "./components/Login";
import Register from "./components/Register";
import Error from "./components/Error";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { LoginContext } from "./components/ContextProvider/Context";
import FullScreenExample from "./components/Fullscreen2";
import Examiner from "./components/Examiner/Examiner";
import ExaminerDash from "./components/Examiner/ExaminerDash";
import Dashboard from "./components/Dashboard";
import Certificate from "./components/Certificate/Certificate";
import ReportProblem from "@mui/icons-material/ReportProblem";
import CertificateNavbar from "./components/Certificate/certificatenavbar";
import "./App.css"
import ReportDownloader from "./components/Certificate/ReportDownloader";
import ProtectedRoute from "./components/Examiner/ProtectedRoute";
import DataAdd from "./components/Examiner/add-Exam/Dataadd.jsx";

function App() {

  const [data, setData] = useState(false);

  const { logindata, setLoginData } = useContext(LoginContext);


  const history = useNavigate();

  const DashboardValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    const res = await fetch("https://first-project-backend-ycff.onrender.com/validuser", {
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
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/examiner" element={<Examiner />} />
              <Route path="/examinerdash" element={<ProtectedRoute element={<ExaminerDash />} />} />
              <Route path="/dash" element={<Dashboard />} />
              <Route path="/examDashboard" element={<ExamDashboard />} />
              <Route path="/addExam" element={<DataAdd /> } />
              <Route path="/password-reset" element={<PasswordReset /> } />
              <Route path="/forgotpassword/:id/:token" element={<ForgotPassword />} />
              <Route path="/policy" element={<PolicyPage />} />
              <Route path="/po1" element={<Po1 />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/homecloud" element={<HomePageCloud />} />
              <Route path="/eapp" element={<EApp />} />
              <Route path="/fullscreen" element={<FullScreenExample />} />
              <Route path="/DocumentDownloader" element={<CertificateNavbar />} />
              <Route path="/reportDownloader" element={<ReportDownloader />} />
              <Route path="/DownloadCertificate" element={<Certificate />} />
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
