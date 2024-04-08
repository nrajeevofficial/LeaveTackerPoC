import React from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/homepage/Home";
import ApplyLeave from "./components/leaveForm/ApplyLeaveForm";
import Holidays from "./components/holiday/HolidayList";
import SignIn from "./components/signInSignup/SignIn";
import SignUp from "./components/signInSignup/SignUp";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/applyleave" element={<ApplyLeave />} />
            <Route path="/holidaylist" element={<Holidays />} />
            <Route path="/" element={<SignIn/>} />
            <Route path="/signUp" element={<SignUp/>} />
          </>
        </Routes>
      </Router>
    </>
  );
}

export default App;
