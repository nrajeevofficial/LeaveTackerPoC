import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AllLeaves from "../leaves/AllLeave";
import AllHoliday from "../holiday/AllHoliday";
import Navbar from "../navbar/Navbar";

function Home() {
  const navigate = useNavigate();

  // Check if the id is present in the local storage
  const id = localStorage.getItem("id");

  useEffect(() => {
    // If id is not present, redirect to "/"
    if (!id) {
      navigate("/");
    }
  }, [id, navigate]);

  // If id is present or after redirection, render the components
  return (
    <>
      <Navbar />
      <AllLeaves />
      <AllHoliday />
    </>
  );
}

export default Home;
