import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Stlyed Component CSS
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
  width: 30%;
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
  width: 65%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 0.25rem;
`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const mobileNumberRef = useRef<HTMLInputElement>(null);

  const [firstNameError, setFirstNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [mobileNumberError, setMobileNumberError] = useState<string>("");

  const handleClick = () => {
    // Reset all error messages
    setFirstNameError("");
    setLastNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setMobileNumberError("");

    const userData = {
      firstName: firstNameRef.current?.value.trim() || "",
      lastName: lastNameRef.current?.value.trim() || "",
      email: emailRef.current?.value.trim() || "",
      password: passwordRef.current?.value.trim() || "",
      confirmPassword: confirmPasswordRef.current?.value.trim() || "",
      mobileNumber: mobileNumberRef.current?.value.trim() || "",
    };

    // Validation for each field
    if (!userData.firstName) {
      setFirstNameError("Please enter your first name.");
      return;
    }

    if (!userData.lastName) {
      setLastNameError("Please enter your last name.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!userData.password) {
      setPasswordError("Please enter the password.");
      return;
    }

    if (userData.password.length < 6) {
      setPasswordError("Password must be 6 characters long.");
      return;
    }

    if (!/(?=.*[A-Z])/.test(userData.password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/(?=.*\d)(?=.*[@$!%*?&])/.test(userData.password)) {
      setPasswordError(
        "Password must contain at least one number and one special symbol."
      );
      return;
    }

    // Confirm Password Validation
    if (userData.password !== userData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    // Mobile Number Validation
    if (!userData.mobileNumber) {
      setMobileNumberError("Please enter your mobile number.");
      return;
    } else if (
      userData.mobileNumber.length < 10 ||
      userData.mobileNumber.length > 15
    ) {
      setMobileNumberError("Mobile number should be between 10 and 15 digits.");
      return;
    }

    // Make API call to signUp endpoint
    fetch("/api/signUp", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create account.");
        }
        return response.json();
      })
      .then((data) => {
        // Account created successfully, redirect to /home page or handle navigation
        navigate("/home", { state: { userData: data } });
      })
      .catch((error) => {
        // Handle error, show error message
        console.error("Error creating account:", error);
      });
  };

  return (
    <Container>
      <Card>
        <Title>Signup</Title>
        <FormGroup>
          <Input placeholder="First Name" type="text" ref={firstNameRef} />
          {firstNameError && <ErrorMessage>{firstNameError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Input placeholder="Last Name" type="text" ref={lastNameRef} />
          {lastNameError && <ErrorMessage>{lastNameError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Input placeholder="Email" type="email" ref={emailRef} />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Input placeholder="Password" type="password" ref={passwordRef} />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Input
            placeholder="Confirm Password"
            type="password"
            ref={confirmPasswordRef}
          />
          {confirmPasswordError && (
            <ErrorMessage>{confirmPasswordError}</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <Input placeholder="Mobile Number" type="tel" ref={mobileNumberRef} />
          {mobileNumberError && (
            <ErrorMessage>{mobileNumberError}</ErrorMessage>
          )}
        </FormGroup>
        <Button onClick={handleClick}>Sign Up</Button>
      </Card>
    </Container>
  );
};

export default SignUp;
