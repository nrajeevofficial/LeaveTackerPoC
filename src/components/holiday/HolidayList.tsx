import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import styled from "styled-components";

interface Holiday {
  name: string;
  description: string;
  date: string;
  image: string;
}

// Styled components
const StyledContainer = styled(Container)`
  margin-top: 30px;
`;

const StyledCard = styled(Card)`
  && {
    height: 100%; /* Set the height to 100% */
    display: flex;
    flex-direction: column;
    border-radius: 5px;
  }
`;

const StyledCardContent = styled(CardContent)`
  && {
    flex-grow: 1;
  }
`;

const StyledTypographyTitle = styled(Typography)`
  && {
    font-size: 20px;
    font-family: cursive;
    font-weight: bold;
  }
`;

const StyledTypographyDescription = styled(Typography)`
  && {
    font-size: 1rem;
    font-family: cursive;
  }
`;

const StyledTypographyDate = styled(Typography)`
  && {
    font-size: 1rem;
    font-family: cursive;
    margin-top: 10px;
    font-weight: bold;
  }
`;

function HolidayList() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    fetch("/api/holidayList")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.holidayList) {
          setHolidays(data.holidayList);
        }
      })
      .catch((error) => {
        console.error("Error fetching holidays:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <StyledContainer>
        <Grid container spacing={5}>
          {holidays.map((holiday, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={holiday.image}
                  alt={holiday.name}
                />
                <StyledCardContent>
                  <StyledTypographyTitle variant="h5">
                    {holiday.name}
                  </StyledTypographyTitle>
                  <StyledTypographyDescription
                    variant="body2"
                    color="textSecondary"
                  >
                    {holiday.description}
                  </StyledTypographyDescription>
                  <StyledTypographyDate variant="body2" color="textSecondary">
                    {holiday.date}
                  </StyledTypographyDate>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </StyledContainer>
    </>
  );
}

export default HolidayList;
