import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { parseISO, format } from "date-fns";
import Navbar from "../navbar/Navbar";
import { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";

//styled components css
const StyledDiv = styled.div`
  text-align: center;
  font-size: 18px;
  text-decoration: underline;
`;

const StyledHeader = styled.h4`
  font-weight: 500;
`;

interface FormData {
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  teamEmail: string;
}

function ApplyLeave() {
  const navigate = useNavigate();
  const location = useLocation();
  const leaveType = (location.state && location.state.leaveType) || "";
  const [formData, setFormData] = useState<FormData>({
    employeeName: "",
    leaveType: leaveType,
    startDate: "",
    endDate: "",
    reason: "",
    teamEmail: "",
  });

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name || ""]: value as string,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("api/updateLeave", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.leaveType,
          booked: getDaysDifference(formData.startDate, formData.endDate),
        }),
      });
      const data = await response.json();
      console.log("Updated leave data:", data);
    } catch (error) {
      console.error("Error updating leave:", error);
    }

    try {
      const response = await fetch("api/updateLeaveHistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeName: formData.employeeName,
          type: formData.leaveType,
          startDate: formatDate(formData.startDate),
          endDate: formatDate(formData.endDate),
          reason: formData.reason,
          teamEmail: formData.teamEmail,
        }),
      });
      const data = await response.json();
      // console.log("Updated leave data:", data);
    } catch (error) {
      console.error("Error updating leave history:", error);
    }

    navigate("/home", { replace: true });
  };

  const formatDate = (dateString: string) => {
    if (dateString) {
      const parsedDate = parseISO(dateString);
      if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
        return format(parsedDate, "yyyy-MM-dd");
      } else {
        console.error("Invalid date string:", dateString);
      }
    } else {
      console.error("Date string is undefined or null");
    }

    return "";
  };

  function getDaysDifference(dateString1: string, dateString2: string) {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);

    const differenceInMs = Math.abs(date2.getTime() - date1.getTime());

    const millisecondsInDay = 1000 * 60 * 60 * 24;
    const differenceInDays = Math.floor(differenceInMs / millisecondsInDay) + 1;

    return differenceInDays;
  }

  return (
    <>
      <Navbar />
      <StyledDiv>
        <StyledHeader>Leave Form</StyledHeader>
      </StyledDiv>

      <Container
        maxWidth="sm"
        sx={{ boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.2)", borderRadius: "10px" }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Employee Name"
            name="employeeName"
            value={formData.employeeName}
            onChange={(e) => handleChange(e as SelectChangeEvent<string>)}
            margin="normal"
            variant="outlined"
            required
          />
          <FormControl fullWidth margin="normal" variant="outlined" required>
            <InputLabel id="leaveType-label">Leave Type</InputLabel>
            <Select
              labelId="leaveType-label"
              id="leaveType"
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              label="Leave Type"
            >
              <MenuItem value="">Select Leave Type</MenuItem>
              <MenuItem value="Casual Leave">Casual Leave</MenuItem>
              <MenuItem value="Compensatory Off">Compensatory Off</MenuItem>
              <MenuItem value="Leave Without Pay">Leave Without Pay</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            margin="normal"
            variant="outlined"
            required
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            fullWidth
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            margin="normal"
            variant="outlined"
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            label="Team Email ID"
            name="teamEmail"
            value={formData.teamEmail}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            margin="normal"
            variant="outlined"
            type="email"
            required
          />
          <TextField
            fullWidth
            label="Reason for Leave"
            multiline
            rows={4}
            name="reason"
            value={formData.reason}
            onChange={(e) =>
              handleChange(e as React.ChangeEvent<HTMLInputElement>)
            }
            margin="normal"
            variant="outlined"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mb: 1 }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
}

export default ApplyLeave;