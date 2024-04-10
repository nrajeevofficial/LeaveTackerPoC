import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { parseISO, format } from "date-fns";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";
import { createGlobalStyle } from "styled-components";

// Global styles
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
`;

// Styled components
const StyledDiv = styled.div`
  margin-left: 50px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  width: 95%;
  margin-top: 50px;
  background-color: #ede7f6;
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ffffff;
  padding: 10px;
`;

const StyledHeaderWrapper = styled.div`
  font-family: "Poppins", sans-serif !important;
  font-size: 1.5rem !important;
`;

const StyledTableCell = styled(TableCell)`
  line-height: 40px;
  border-bottom: 0.5px solid #eeeeee;
  font-family: "Poppins", sans-serif !important;
  font-size: 1rem !important;
`;

const HoverableTableBody = styled(TableBody)`
  tr:hover {
    background-color: #bdbdbd;
  }
`;

const StyledButton = styled(Button)`
  margin: 3px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  text-transform: capitalize;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

// Interface for holiday and leave
interface Holiday {
  name: string;
  date: string;
  location: string;
  shifts: string;
}

interface Leave {
  type: string;
  startDate: string;
  reason: string;
}

function AllHoliday() {
  const [holidays, setHolidays] = useState<Holiday[] | null>(null);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
  const [leaveHistory, setLeaveHistory] = useState<Leave[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("All");

  const location = useLocation();
  const allLeave: boolean = location.pathname === "/applyLeave";

  // Fetch holidays on component mount
  useEffect(() => {
    fetch("/api/holidays")
      .then((res) => res.json())
      .then((json) => setHolidays(json.holidays))
      .catch((err) => console.log(err));
  }, []);

  // Handle button click
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    switch (buttonName) {
      case "All":
        resetHolidays();
        break;
      case "Upcoming":
        filterUpcomingHolidays();
        break;
      case "History":
        fetchLeaveHistory();
        break;
      default:
        break;
    }
  };

  // Filter upcoming holidays
  const filterUpcomingHolidays = () => {
    const currentDate = new Date();
    const upcomingHolidays = holidays?.filter((holiday) => {
      const holidayDate = new Date(holiday.date);
      return holidayDate > currentDate;
    });

    setHolidays(upcomingHolidays || []);
    setShowUpcoming((upcomingHolidays || []).length > 0);
    setShowHistory(false);
  };

  // Reset holidays
  const resetHolidays = () => {
    fetch("/api/holidays")
      .then((res) => res.json())
      .then((json) => setHolidays(json.holidays))
      .catch((err) => console.log(err));
    setShowUpcoming(false);
    setShowHistory(false);
  };

  // Fetch leave history
  const fetchLeaveHistory = () => {
    fetch(`/api/leaveHistory?id=` + localStorage.getItem("id"))
      .then((res) => res.json())
      .then((json) => setLeaveHistory(json.leaveHistory))
      .catch((err) => console.log(err));
    setShowHistory(true);
  };

  return (
    <>
      {!allLeave && (
        <>
          <GlobalStyles />
          <StyledDiv className="mt-4">
            <StyledContainer>
              <StyledHeaderWrapper>
                <h4>All Holidays</h4>
              </StyledHeaderWrapper>
              <StyledButtonContainer>
                <StyledButton
                  color="inherit"
                  sx={{
                    bgcolor: activeButton === "All" ? "white" : "white",
                    color: activeButton === "All" ? "#4b89dc" : "darkwhite",
                  }}
                  onClick={() => handleButtonClick("All")}
                >
                  All
                </StyledButton>
                <StyledButton
                  color="inherit"
                  sx={{
                    bgcolor: activeButton === "Upcoming" ? "white" : "white",
                    color:
                      activeButton === "Upcoming" ? "#4b89dc" : "darkwhite",
                  }}
                  onClick={() => handleButtonClick("Upcoming")}
                >
                  Upcoming
                </StyledButton>
                <StyledButton
                  color="inherit"
                  sx={{
                    bgcolor: activeButton === "History" ? "white" : "white",
                    color: activeButton === "History" ? "#4b89dc" : "darkwhite",
                  }}
                  onClick={() => handleButtonClick("History")}
                >
                  History
                </StyledButton>
              </StyledButtonContainer>
            </StyledContainer>
            {/* Render leave history */}
            {showHistory && (
              <TableContainer component={Paper} className="mt-4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Type</StyledTableCell>
                      <StyledTableCell>Start Date</StyledTableCell>
                      <StyledTableCell>Reason</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <HoverableTableBody>
                    {leaveHistory.map((leave, index) => (
                      <TableRow key={index}>
                        <StyledTableCell>{leave.type}</StyledTableCell>
                        <StyledTableCell>
                          {format(parseISO(leave.startDate), "dd MMM yyyy")}
                        </StyledTableCell>
                        <StyledTableCell>{leave.reason}</StyledTableCell>
                      </TableRow>
                    ))}
                  </HoverableTableBody>
                </Table>
              </TableContainer>
            )}
            {/* Render holidays */}
            <div>
              {holidays && !showHistory && (
                <TableContainer component={Paper} className="mt-4">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Location</StyledTableCell>
                        <StyledTableCell>Shift</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <HoverableTableBody>
                      {holidays.map((holiday, index) => (
                        <TableRow key={index}>
                          <StyledTableCell>{holiday.name}</StyledTableCell>
                          <StyledTableCell>
                            {format(parseISO(holiday.date), "dd MMM yyyy")}
                          </StyledTableCell>
                          <StyledTableCell>{holiday.location}</StyledTableCell>
                          <StyledTableCell>{holiday.shifts}</StyledTableCell>
                        </TableRow>
                      ))}
                      {/* Show message if no upcoming holidays */}
                      {showUpcoming && !holidays.length && !showHistory && (
                        <TableRow>
                          <StyledTableCell colSpan={4}>
                            No upcoming holidays
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </HoverableTableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          </StyledDiv>
        </>
      )}
    </>
  );
}

export default AllHoliday;
