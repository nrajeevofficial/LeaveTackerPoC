import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Icon from "../../assets/brand-engagement.png";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data from the server
        const response = await axios.get("/api/userData", {
          params: { id: localStorage.getItem("id") },
        });
        // Set the first name from the fetched user data
        setFirstName(response.data.userData.firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    // Remove user ID from localStorage and navigate to login page
    localStorage.removeItem("id");
    navigate("/");
  };

  // Styled components

  // Styled Brand Logo image
  const BrandLogo = styled.img`
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 20px;
  `;

  // Styled AppBar with custom background color
  const StyledAppBar = styled(AppBar)`
    background-color: #455a64 !important;
  `;

  // Styled Typography with custom font size and flex-grow
  const StyledTypography = styled(Typography)`
    flex-grow: 1;
    font-size: 14px;
  `;

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <BrandLogo src={Icon} alt="Brand Logo" />
          <StyledTypography variant="h5">
            {/* Display Welcome message along with first name */}
            Welcome, {firstName}!
          </StyledTypography>
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
