// Leaves.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CasualLeave from "./CasualLeave";
import CompOffLeave from "./CompoOffLeave";
import LeaveWithoutPay from "./LeaveWithoutPay";

// Interface for LeaveType
interface LeaveType {
  available: number;
  booked: number;
}

// Styled components CSS
const LeavesContainer = styled.div`
  margin-top: 5%;
  width: 38%;
  margin-left: 50px;
  text-align: center;
`;

const LeavesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

function Leaves() {
  // State variables for different types of leaves
  const [casualLeave, setCasualLeaves] = useState<LeaveType>({
    available: 0,
    booked: 0,
  });
  const [compOffLeave, setCompOffLeaves] = useState<LeaveType>({
    available: 0,
    booked: 0,
  });
  const [leaveWithoutPay, setLeaveWithoutPay] = useState<LeaveType>({
    available: 0,
    booked: 0,
  });

  useEffect(() => {
    // Fetch available leaves data from API
    fetch(`/api/availableLeave?id=` + localStorage.getItem("id"))
      .then((response) => response.json())
      .then((data) => {
        // Extract and update state for each type of leave
        const casualLeaveData = data.availableLeaves.find(
          (leave: { name: string }) => leave.name === "Casual Leave"
        );
        if (casualLeaveData) {
          setCasualLeaves({
            available: casualLeaveData.available || 0,
            booked: casualLeaveData.booked || 0,
          });
        }

        const compOffLeaveData = data.availableLeaves.find(
          (leave: { name: string }) => leave.name === "Compensatory Leave"
        );
        if (compOffLeaveData) {
          setCompOffLeaves({
            available: compOffLeaveData.available || 0,
            booked: compOffLeaveData.booked || 0,
          });
        }

        const leaveWithoutPayData = data.availableLeaves.find(
          (leave: { name: string }) => leave.name === "Leave Without Pay"
        );
        if (leaveWithoutPayData) {
          setLeaveWithoutPay({
            available: leaveWithoutPayData.available || 0,
            booked: leaveWithoutPayData.booked || 0,
          });
        }
      })
      .catch((error) =>
        console.error("Error fetching available leaves:", error)
      );
  }, []);

  return (
    <>
      <LeavesContainer>
        <LeavesWrapper>
          <CasualLeave casualLeave={casualLeave} />
          <CompOffLeave compOffLeave={compOffLeave} />
          <LeaveWithoutPay leaveWithoutPay={leaveWithoutPay} />
        </LeavesWrapper>
      </LeavesContainer>
    </>
  );
}

export default Leaves;
