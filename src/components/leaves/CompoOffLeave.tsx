import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { createGlobalStyle } from "styled-components";
import {
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from "@mui/material";

interface LeaveType {
  available: number;
  booked: number;
}

interface CompOffLeaveProps {
  compOffLeave: LeaveType;
}

// Styled components

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

const CustomSpan = styled.span`
  font-size: 2.3rem;
  color: lightgreen;
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
  cursor: pointer;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
  }
`;

const CompOffLeave: React.FC<CompOffLeaveProps> = (props) => {
  const navigate = useNavigate();

  const redirectToApplyLeave = () => {
    navigate("/applyleave", { state: { leaveType: "Compensatory Leave" } });
  };

  return (
    <>
      <GlobalStyles />
      <div className="row" onClick={redirectToApplyLeave}>
        <div className="col-sm-12">
          <StyledCard>
            <CardContent>
              <CustomTypography variant="h6" gutterBottom>
                Compensatory Off
              </CustomTypography>
              <div>
                <CustomSpan className="text-center">CO</CustomSpan>
              </div>
              <Table className="my-3 mx-auto">
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell>Available</StyledTableCell>
                    <StyledTableCell>
                      {props.compOffLeave.available}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell>Booked</StyledTableCell>
                    <StyledTableCell>
                      {props.compOffLeave.booked}
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

export default CompOffLeave;
