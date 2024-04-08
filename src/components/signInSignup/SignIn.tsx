import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useNavigate } from "react-router-dom";

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
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const Button = styled.button`
  width: 65%;
  padding: 0.5rem;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 0.25rem;
`;

// Styled Link component for SignUp button
const SignUpLink = styled(Link)`
  text-decoration: none;
  color: white;
  background-color: #28a745; // Green color for SignUp button
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  margin-top: 1rem;
  display: inline-block;
`;

function SignIn() {
    const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    const signedUpUser = localStorage.getItem("name");
    if (signedUpUser) {
      const firstName = signedUpUser.split(" ")[0];
      setUserName(firstName);
    }
  }, []);

  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSignIn = () => {
    setEmailError("");
    setPasswordError("");

    const emailValue = email.current?.value.trim() || "";
    const passwordValue = password.current?.value.trim() || "";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (passwordValue.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
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
      .then(response => {
        if (!response.ok) {
          throw new Error("User Not Found, please SignUp");
        }
        navigate("/home")
      })
      .catch(error => {
        // Handle error, show error message
        setPasswordError(error.message);
      });
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
          <Button onClick={handleSignIn}>Log In</Button>
          <SignUpLink to="/signup">Sign Up</SignUpLink> {/* SignUp button */}
        </Card>
      </Container>
    </>
  );
}

export default SignIn;
