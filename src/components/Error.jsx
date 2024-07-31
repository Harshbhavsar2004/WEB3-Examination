
// *************************************** Working Code ***********************************


import React from 'react';
import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src="/404.svg" alt="error" style={{ width: "500px", marginBottom: 20 }} />
        {/* <h1 className="mb-3">404 ERROR </h1> */}
        <h2 className="mb-3">PAGE NOT FOUND</h2>
        <br />
        <p style={{ color: "black", fontSize: 18 }}><NavLink to="/">Back To Home Page</NavLink></p>
      </div>
    </div>
  );
};

export default Error;
