import AllLeaves from "../leaves/AllLeave";
import AllHoliday from "../holiday/AllHoliday";
import Navbar from "../navbar/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <AllLeaves />
      <AllHoliday />
    </>
  );
}

export default Home;
