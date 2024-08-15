import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import styled from "styled-components";
import {
    FaAward,
    FaUserGraduate,
    FaSchool,
    FaCheckCircle,
    FaCalendarAlt,
} from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./Certificate.css";
import { IoIosHome } from "react-icons/io";
import Button from '@mui/material/Button';
import CertificateNavbar from "./certificatenavbar";
import { FaDownload } from "react-icons/fa";
const CertificateContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 3rem auto;
  background-color: white;
  border: 4px solid #4f46e5;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const CertificateContent = styled.div`
  border: 4px solid #4f46e5;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #4f46e5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Subtitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecipientName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Description = styled.div`
  font-size: 1.125rem;
  color: #6b7280;
  text-align: center;
`;

const AwardBy = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5;
  font-size: 1.5rem;
  font-weight: bold;
  gap: 0.5rem;
`;

const Marks = styled.div`
  font-size: 1.125rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Date = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #4f46e5;
  padding-top: 1rem;
  text-align: center;
  color: #6b7280;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const DownloadButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Certificate = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [currentDate, setCurrentDate] = useState("");
    const history = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("https://first-project-backend-ycff.onrender.com/user-data", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("usersdatatoken")}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setUserData(data);
                if (!data.score) {
                    toast.error("You have not given the exam", {
                        duration: 3000,
                    });
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchUserData();
    }, []);

    //   useEffect(() => {
    //     const options = { year: 'numeric', month: 'long', day: 'numeric' };
    //     setCurrentDate(new Date().toLocaleDateString(undefined, options));
    //   }, []);

    const generateCertificate = () => {
        const certificateContainer = document.getElementById("certificate");
        html2canvas(certificateContainer)
            .then((canvas) => {
                const dataUrl = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = "certificate.png";
                link.click();
            })
            .catch((error) => console.error("Error generating certificate:", error));
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handlehomeclickback = () => {
        history('/dash')
    }

    return (

        <div className="app-container">
            <CertificateNavbar />
            <div className="content-wrapper">
                <div className="certificate-generated-showing">
                    {userData && userData.score ? (
                        <div>
                            <Button onClick={generateCertificate} variant="outline" className="button-css-downloadcontain">
                                <FaDownload className="icon-for-download"/>
                            </Button>
                            <CertificateContainer id="certificate">
                                <CertificateContent>
                                    <Title>
                                        <FaAward />
                                        Certificate of Achievement
                                    </Title>
                                    <Subtitle>
                                        <FaUserGraduate />
                                        Awarded to
                                    </Subtitle>
                                    <RecipientName>
                                        {userData.name} {userData.lastname}
                                    </RecipientName>
                                    <Description>
                                        For outstanding contributions and dedication to the Blockchain
                                        Examination.
                                    </Description>
                                    <AwardBy>
                                        <FaSchool />
                                        Awarded by SVKM IoT Dhule
                                    </AwardBy>
                                    <Marks>
                                        <FaCheckCircle />
                                        Marks: {userData.score}
                                    </Marks>
                                </CertificateContent>
                                <Date>
                                    <FaCalendarAlt />
                                    Presented on the online Basis
                                </Date>
                            </CertificateContainer>
                        </div>
                    ) : (
                        !userData && <p>Loading...</p>
                    )}
                </div>
            </div>
            <Toaster />
        </div>

    );
};

export default Certificate;
