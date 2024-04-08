import React from "react";
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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
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

interface LeaveWithoutPayProps {
  leaveWithoutPay: LeaveType;
}

// styled compoenent
const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
`;

const CustomTypography = styled(Typography)`
  && {
    font-family: "Poppins", sans-serif !important;
    font-size: 1rem !important;
    margin-bottom: 8px;
  }
`;

const CustomCalendarTodayIcon = styled(CalendarTodayIcon)`
  && {
    color: #e05654;
    font-size: 3rem;
  }
`;

const StyledTableCell = styled(MuiTableCell)`
  && {
    font-family: "Poppins", sans-serif !important;
    /* Add other styles as needed */
  }
`;

const StyledTableRow = styled(MuiTableRow)`
  && {
    /* Add styles as needed */
  }
`;

const LeaveWithoutPay: React.FC<LeaveWithoutPayProps> = (props) => {
  const navigate = useNavigate();

  const redirectToApplyLeave = () => {
    navigate("/applyleave", { state: { leaveType: "Leave Without Pay" } });
  };

  return (
    <>
      <GlobalStyles />
      <div className="row" onClick={redirectToApplyLeave}>
        <div className="col-sm-12">
          <Card className="text-center">
            <CardContent>
              <CustomTypography variant="h6" gutterBottom>
                Leave Without Pay
              </CustomTypography>
              <CustomCalendarTodayIcon />
              <Table className="my-3 mx-auto">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>Available</StyledTableCell>
                    <StyledTableCell>
                      {props.leaveWithoutPay.available}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Booked</StyledTableCell>
                    <StyledTableCell>
                      {props.leaveWithoutPay.booked}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LeaveWithoutPay;
