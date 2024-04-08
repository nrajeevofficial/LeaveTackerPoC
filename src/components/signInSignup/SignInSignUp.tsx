import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

function SignInSignupWithLocalStorage() {
  const navigate = useNavigate();
  const [showSignIn, setShowSignIn] = useState<boolean>(false);
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const localSignUp: string | null = localStorage.getItem("signUp");
  const localEmail: string | null = localStorage.getItem("email");
  const localPassword: string | null = localStorage.getItem("password");

  useEffect(() => {
    if (localSignUp) {
      navigate("/home");
    } else if (localEmail) {
      setShowSignIn(true);
    } else {
      setShowSignUp(true);
    }
  }, [localSignUp, localEmail, navigate]);

  return (
    <div>
      {/* {showSignIn ? (
        <SignIn localEmail={localEmail!} localPassword={localPassword!} />
      ) : showSignUp ? (
        <SignUp />
      ) : null} */}
    </div>
  );
}

export default SignInSignupWithLocalStorage;
