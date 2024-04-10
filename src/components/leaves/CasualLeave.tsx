import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import {
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from "@mui/material";

interface LeaveType {
  available: number;
  booked: number;
}

interface CasualLeaveProps {
  casualLeave: LeaveType;
}
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
`;
const CustomTypography = styled(Typography)`
  && {
    margin-bottom: 8px;
    font-family: "Poppins", sans-serif !important;
    font-size: 1rem !important;
  }
`;

const CustomCalendarTodayIcon = styled(CalendarTodayIcon)`
  && {
    color: #5895ff;
    font-size: 3rem;
  }
`;

const StyledTableCell = styled(MuiTableCell)`
  && {
    font-family: "Poppins", sans-serif !important;
  }
`;

const StyledTableRow = styled(MuiTableRow)`
  && {
  }
`;

const StyledCard = styled(Card)`
  text-align: center;
  background-color: #ede7f6 !important;
`;

const CasualLeave: React.FC<CasualLeaveProps> = (props) => {
  const navigate = useNavigate();

  const redirectToApplyLeave = () => {
    navigate("/applyleave", { state: { leaveType: "Casual Leave" } });
  };

  return (
    <>
      <GlobalStyles />
      <div className="row" onClick={redirectToApplyLeave}>
        <div className="col-sm-12">
          <StyledCard>
            <CardContent>
              <CustomTypography variant="h6" gutterBottom>
                Casual Leave
              </CustomTypography>
              <CustomCalendarTodayIcon />
              <Table className="my-3 mx-auto">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>Available</StyledTableCell>
                    <StyledTableCell>
                      {props.casualLeave.available}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Booked</StyledTableCell>
                    <StyledTableCell>
                      {props.casualLeave.booked}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </CardContent>
          </StyledCard>
        </div>
      </div>
    </>
  );
};

export default CasualLeave;
