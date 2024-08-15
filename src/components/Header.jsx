import React, { useContext, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "./ContextProvider/Context";
import "./header.css";

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [hasToken, setHasToken] = useState(false);
  const [hasExaminerToken, setHasExaminerToken] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const userToken = localStorage.getItem("usersdatatoken");
    const examinerToken = localStorage.getItem("examinerToken");
    setHasToken(!!userToken);
    setHasExaminerToken(!!examinerToken);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutuser = () => {
    try {
      localStorage.removeItem("usersdatatoken");
      localStorage.removeItem("examinerToken");
      setLoginData(false);
      setHasToken(false);
      setHasExaminerToken(false);
      navigate("/login");
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
  };

  const goDash = () => {
    navigate("/dash");
  };

  const goExDash = () => {
    navigate("/examDashboard");
  };
  const goEx2Dash = () => {
    navigate("/examinerdash");
  };

  const goLogin = () => {
    navigate("/login");
  };

  const goRegister = () => {
    navigate("/register");
  };

  const goExaminer = () => {
    navigate("/examiner");
  };

  return (
    <div className="harshalthe">
      <nav>
        <div className="logo">
          <img src="./App_Logo1.png" alt="App Logo" />
          <h2>Secure Pariksha</h2>
          <hr />
        </div>
        <div className="avatar">
          {logindata.ValidUserOne ? (
            <Avatar
              style={{
                background: "salmon",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              onClick={handleClick}
            >
              {logindata.ValidUserOne.fname[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar style={{ background: "blue" }} onClick={handleClick} />
          )}
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {hasExaminerToken ? (
            <>
              <MenuItem
                onClick={() => {
                  goExDash();
                  handleClose();
                }}
              >
                Add Exam
              </MenuItem>
              <MenuItem
                onClick={() => {
                  goEx2Dash();
                  handleClose();
                }}
              >
                Users stats
              </MenuItem>
              <MenuItem
                onClick={logoutuser}
              >
                Logout
              </MenuItem>
            </>
          ) : hasToken ? (
            <>
              <MenuItem
                onClick={() => {
                  goDash();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  goExDash();
                  handleClose();
                }}
              >
                Exam Dashboard
              </MenuItem>
              <MenuItem
                onClick={logoutuser}
              >
                Logout
              </MenuItem>
            </>
          ) : (
            <>
              <MenuItem
                onClick={() => {
                  goLogin();
                  handleClose();
                }}
              >
                Sign In
              </MenuItem>
              <MenuItem
                onClick={() => {
                  goRegister();
                  handleClose();
                }}
              >
                Sign Up
              </MenuItem>
              <MenuItem
                onClick={() => {
                  goExaminer();
                  handleClose();
                }}
              >
                Examiner login
              </MenuItem>
            </>
          )}
        </Menu>
      </nav>
    </div>
  );
};

export default Header;
