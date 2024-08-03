import React, { useEffect, useState } from "react";
import { IoIosHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import "./Certificate.css"


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



const CertificateNavbar = () => {
    const history = useNavigate();

    const handlehomeclickback = () => {
        history('/dash')
    }

    return (
            <div className="left-hand-side">
                <DownloadButton
                    className="downloadbutton-main-one"
                    onClick={handlehomeclickback}
                >
                    <IoIosHome /> Home Page
                </DownloadButton>
                <Link to={'/DownloadCertificate'}>
                <DownloadButton
                >
                    Download Certificate
                </DownloadButton>
                </Link>
                <Link to={'/reportDownloader'}>
                <DownloadButton>
                    Youre Report
                </DownloadButton>
                </Link>
            </div>
    );
};

export default CertificateNavbar;
