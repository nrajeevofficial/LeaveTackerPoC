import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1567001576987-68ef38768347?q=80&w=1769&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: fixed;
  background-size: 100%;
`;

const Card = styled.div`
  text-align: center;
  padding: 4rem;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  width: 400px;
  background-color: rgba(255, 255, 255, 0.01);
  width: 20%;
`;

const Title = styled.h2`
  color: white;
  font-weight: bolder;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const ErrorMessage = styled.span`
  color: red;
  position: absolute;
  bottom: -1.5rem;
  left: 0;
  font-size: 12px !important;
`;

const Button = styled.button`
  width: 45%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 0.25rem;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 106%;
`;

function SignIn() {
  const navigate = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSignIn = () => {
    // Clear previous error messages
    setEmailError("");
    setPasswordError("");

    // Get input values
    const emailValue = email.current?.value.trim() || "";
    const passwordValue = password.current?.value.trim() || "";

    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!passwordValue) {
      setPasswordError("Please enter the correct password");
      return;
    }

    // Make API call to signIn endpoint
    fetch("/api/signIn", {
      method: "POST",
      body: JSON.stringify({ email: emailValue, password: passwordValue }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User Not Found, please SignUp");
        }
        navigate("/home");
      })
      .catch((error) => {
        // Handle error, show error message
        setPasswordError(error.message);
      });
  };

  const handleSignUp = () => {
    // Navigate to SignUp page
    navigate("/signUp");
  };

  return (
    <>
      <Container>
        <Card>
          <Title>LogIn</Title>

          <FormGroup>
            <Input placeholder="Email" type="text" ref={email} />

            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Input placeholder="Password" type="password" ref={password} />

            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
          </FormGroup>

          <ButtonContainer>
            <Button onClick={handleSignIn}>Log In</Button>

            <Button onClick={handleSignUp}>Sign Up</Button>
          </ButtonContainer>
        </Card>
      </Container>
    </>
  );
}

export default SignIn;
