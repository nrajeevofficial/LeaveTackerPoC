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

//styled css
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
`;

const StyledDiv = styled.div`
  margin-left: 50px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  width: 95%;
  margin-top: 50px;
`;

const StyledHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Poppins", sans-serif !important;
  font-size: 1.5rem !important;
`;

const StyledTableCell = styled(TableCell)`
  line-height: 40px;
  border-bottom: 0.5px solid #eeeeee;
  font-family: "Poppins", sans-serif !important;
  font-size: 1rem !important;
`;

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

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

function AllHoliday() {
  const [holidays, setHolidays] = useState<Holiday[] | null>(null);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);
  const [leaveHistory, setLeaveHistory] = useState<Leave[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("All");

  const location = useLocation();
  const allLeave: boolean = location.pathname === "/apply-leave";

  useEffect(() => {
    fetch("/api/holidays")
      .then((res) => res.json())
      .then((json) => setHolidays(json.holidays))
      .catch((err) => console.log(err));
  }, []);

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

  const resetHolidays = () => {
    fetch("/api/holidays")
      .then((res) => res.json())
      .then((json) => setHolidays(json.holidays))
      .catch((err) => console.log(err));
    setShowUpcoming(false);
    setShowHistory(false);
  };

  const fetchLeaveHistory = () => {
    fetch("/api/leaveHistory")
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
            <div className="d-flex align-items-center justify-content-between border-bottom border-white">
              <StyledHeaderWrapper>
                <h4>All Holidays</h4>
                <div>
                  <Button
                    color="inherit"
                    sx={{
                      bgcolor: activeButton === "All" ? "white" : "white",
                      color: activeButton === "All" ? "#4b89dc" : "darkwhite",
                      margin: "3px",
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleButtonClick("All")}
                  >
                    All
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      bgcolor: activeButton === "Upcoming" ? "white" : "white",
                      color:
                        activeButton === "Upcoming" ? "#4b89dc" : "darkwhite",
                      margin: "3px",
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleButtonClick("Upcoming")}
                  >
                    Upcoming
                  </Button>
                  <Button
                    color="inherit"
                    sx={{
                      bgcolor: activeButton === "History" ? "white" : "white",
                      color:
                        activeButton === "History" ? "#4b89dc" : "darkwhite",
                      margin: "3px",
                      boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)",
                      textTransform: "capitalize",
                    }}
                    onClick={() => handleButtonClick("History")}
                  >
                    History
                  </Button>
                </div>
              </StyledHeaderWrapper>
            </div>
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
                  <TableBody>
                    {leaveHistory.map((leave, index) => (
                      <TableRow key={index}>
                        <StyledTableCell>{leave.type}</StyledTableCell>
                        <StyledTableCell>
                          {format(parseISO(leave.startDate), "dd MMM yyyy")}
                        </StyledTableCell>
                        <StyledTableCell>{leave.reason}</StyledTableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
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
                    <TableBody>
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
                      {showUpcoming && !holidays.length && !showHistory && (
                        <TableRow>
                          <StyledTableCell colSpan={4}>
                            No upcoming holidays
                          </StyledTableCell>
                        </TableRow>
                      )}
                    </TableBody>
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
