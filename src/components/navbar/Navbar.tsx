import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import Icon from "../../assets/brand-engagement.png";
import styled from "styled-components";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const signedUpUser = localStorage.getItem("name");
    if (signedUpUser) {
      const firstName = signedUpUser.split(" ")[0];
      setUserName(firstName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("signUp");
    navigate("/");
  };

  // Styled components

  const BrandLogo = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 20px;
  `;

  const StyledAppBar = styled(AppBar)`
    background-color: #455a64 !important;
  `;

  const StyledTypography = styled(Typography)`
    flex-grow: 1;
    font-size: 14px;
  `;
  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <BrandLogo src={Icon} alt="Brand Logo" />
          <StyledTypography variant="h5">Welcome! {userName}</StyledTypography>
          <div>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/applyleave">
              Apply Leave
            </Button>
            <Button color="inherit" component={Link} to="/holidaylist">
              Holidays
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </StyledAppBar>
    </>
  );
}

export default Navbar;
