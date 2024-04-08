import { log } from "console";
import { createServer, Response } from "miragejs";

type Holiday = {
  id: number;
  name: string;
  date: Date;
  location: string;
  shifts: string;
};

type AvailableLeave = {
  name: string;
  available: number;
  booked?: number;
};

type UpdateLeaveBody = {
  name: string;
  booked: number;
};

type LeaveHistoryEntry = {
  type: string;
  startDate: Date;
};

type HolidayListEntry = {
  name: string;
  image: string;
  description: string;
  date: string;
};

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber: string;
}

createServer({
  routes() {
    this.namespace = "api";

    this.get("/holidays", () => {
      return {
        holidays: [
          {
            id: 1,
            name: "New Year",
            date: new Date("2024-01-01"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 2,
            name: "Republic Day",
            date: new Date("2024-01-26"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 3,
            name: "Holi",
            date: new Date("2024-03-25"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 4,
            name: "Gudi Padwa",
            date: new Date("2024-04-09"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 5,
            name: "Maharashtra Day",
            date: new Date("2024-05-01"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 6,
            name: "Bakri Eid / Eid al Adha",
            date: new Date("2024-06-17"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 7,
            name: "Independence Day",
            date: new Date("2024-08-15"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 8,
            name: "Gandhi Jayanti",
            date: new Date("2024-10-02"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 9,
            name: "Diwali",
            date: new Date("2024-10-31"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 10,
            name: "Diwali",
            date: new Date("2024-11-01"),
            location: "All Locations",
            shifts: "All Shifts",
          },
          {
            id: 11,
            name: "Christmas",
            date: new Date("2024-12-25"),
            location: "All Locations",
            shifts: "All Shifts",
          },
        ],
      };
    });

    let userDataArray: UserData[] = [];

    let availableLeaves: AvailableLeave[] = [];

// Retrieve available leave data from local storage
const availableLeavesString = availableLeaves.toString();
if (availableLeavesString) {
  try {
    availableLeaves = JSON.parse(availableLeavesString);
  } catch (error) {
    console.error("Error parsing available leave data from localStorage:", error);
  }
} else {
  console.log("No available leave data found in localStorage.");
}

// If availableLeaves is still empty, initialize it with default data
if (availableLeaves.length === 0) {
  availableLeaves = [
    {
      name: "Casual Leave",
      available: 6,
      booked: 0,
    },
    {
      name: "Compensatory Leave",
      available: 6,
      booked: 0,
    },
    {
      name: "Leave Without Pay",
      available: 0, // Set a default value for the available property
      booked: 0,
    },
  ];
}

// API endpoint to fetch available leave data
this.get("/availableLeave", () => {
  return {
    availableLeaves,
  };
});

// API endpoint to update leave data
this.post("/updateLeave", (schema, request) => {
  const updatedLeave: UpdateLeaveBody = JSON.parse(request.requestBody);
  const leaveName = updatedLeave.name;

  const leaveIndex = availableLeaves.findIndex((leave) => leave.name === leaveName);

  if (leaveIndex !== -1) {
    if (availableLeaves[leaveIndex].available > 0) {
      availableLeaves[leaveIndex].available -= updatedLeave.booked;
      availableLeaves[leaveIndex].booked = (availableLeaves[leaveIndex].booked || 0) + updatedLeave.booked;
    } else if (availableLeaves[leaveIndex].name === "Leave Without Pay") {
      availableLeaves[leaveIndex].booked = (availableLeaves[leaveIndex].booked || 0) + updatedLeave.booked;
    }
  }

  // Update local storage with the modified available leave data
  // localStorage.setItem("availableLeaves", JSON.stringify(availableLeaves));

  return {
    availableLeaves,
  };
});


    

    // let leaveHistory: LeaveHistoryEntry[] = JSON.parse(localStorage.getItem("leaveHistory") || "[]") || [
    //   {
    //     type: "Holi",
    //     startDate: new Date("2024-01-26"),
    //   },
    //   {
    //     type: "New Year",
    //     startDate: new Date("2024-01-01"),
    //   },
    // ];
    let leaveHistory: LeaveHistoryEntry[] = [];
    const leaveHistoryString =leaveHistory.toString();
    if (leaveHistoryString) {
      try {
        leaveHistory = JSON.parse(leaveHistoryString);
      } catch (error) {
        console.error("Error parsing leave history from localStorage:", error);
      }
    } else {
      console.log("No leave history found in localStorage.");
    }
    
    // If leaveHistory is still empty, initialize it with default data
    if (leaveHistory.length === 0) {
      leaveHistory = [
        {
          type: "Holi",
          startDate: new Date("2024-01-26"),
        },
        {
          type: "New Year",
          startDate: new Date("2024-01-01"),
        },
      ];
    }
    
    // Store leaveHistory back into localStorage
    // try {
    //   localStorage.setItem("leaveHistory", JSON.stringify(leaveHistory));
    // } catch (error) {
    //   console.error("Error storing leave history in localStorage:", error);
    // }
    
    this.get("/leaveHistory", () => {
      return {
        leaveHistory,
      };
    });

    // const updateLeaveHistory = () => {
    //   try {
    //     localStorage.setItem("leaveHistory", JSON.stringify(leaveHistory));
    //   } catch (error) {
    //     console.error("Error storing leave history in localStorage:", error);
    //   }
    // };

    this.post("/updateLeaveHistory", (schema, request) => {
      let history: LeaveHistoryEntry = JSON.parse(request.requestBody);
      leaveHistory.push(history);
      // updateLeaveHistory();
      return {
        leaveHistory,
      };
    });

    this.get("/holidayList", () =>{
      return{
        holidayList: [
          {
            name: "New year",
            image: "https://images.unsplash.com/photo-1546272192-c19942fa8b26?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5ldyUyMHllYXJ8ZW58MHx8MHx8fDA%3D",
            description: "New Year's Eve, celebrated globally on December 31st, marks the transition from the old year to the new with festive gatherings, fireworks, and anticipation for what lies ahead.",
            date: "01-01-2024"
          },
          {
            name: "Republic Day",
            image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cmVwdWJsaWMlMjBkYXklMjBpbmRpYXxlbnwwfHwwfHx8MA%3D%3D",
            description: "Indian Republic Day, observed annually on January 26th, commemorates the adoption of the Indian Constitution in 1950, marking the nation's transition to a democratic republic.",
            date: "26-01-2024"
          },
          {
            name: "Holi",
            image: "https://images.unsplash.com/photo-1496024840928-4c417adf211d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvbGl8ZW58MHx8MHx8fDA%3D",
            description: "Holi, celebrated in India, is a vibrant festival known as the 'Festival of Colors.' It marks the arrival of spring and the triumph of good over evil.",
            date: "25-03-2024"
          },
          {
            name: "Gudi Padwa",
            image: "https://images.unsplash.com/photo-1602045627378-4581cfbd0018?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VkaXBhZHdhfGVufDB8fDB8fHww",
            description: "Gudi Padwa, an Indian festival, marks the New Year in the Hindu calendar, typically falling in March or April.",
            date: "09-04-2024"
          },
          {
            name: "Maharashtra Day",
            image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8TWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D",
            description: "Maharashtra Day, observed on May 1st, commemorates the formation of the Indian state of Maharashtra in 1960. It celebrates the rich cultural heritage and achievements of the state, fostering a sense of pride and unity among its people.",
            date: "01-05-2024"
          },
          {
            name: "Bakri Eid / Eid al Adha",
            image: "https://images.unsplash.com/photo-1574246604907-db69e30ddb97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWlkfGVufDB8fDB8fHww",
            description: "Bakri Eid, also known as Eid al-Adha or the Festival of Sacrifice, is a significant Islamic holiday celebrated worldwide. It honors the willingness of Prophet Ibrahim to sacrifice his son as an act of obedience to God.",
            date: "17-06-2024"
          },
          {
            name: "Independence Day",
            image: "https://images.unsplash.com/photo-1585802540432-60662b65ca62?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kZXBlbmRlbmNlJTIwZGF5JTIwaW5kaWF8ZW58MHx8MHx8fDA%3D",
            description: "Independence Day, celebrated on August 15th, marks India's freedom from British rule in 1947. It's a national holiday filled with flag hoisting ceremonies, patriotic speeches, and cultural events, symbolizing India's sovereignty and unity.",
            date: "15-08-2024"
          },
          {
            name: "Gandhi Jayanti",
            image: "https://images.unsplash.com/photo-1641994751533-d9a98dcba149?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFoYXRtYSUyMGdhbmRoaXxlbnwwfHwwfHx8MA%3D%3D",
            description: "Gandhi Jayanti, observed on October 2nd, commemorates the birth anniversary of Mahatma Gandhi, the Father of the Nation in India.",
            date: "02-10-2024"
          },

          {
            name: "Diwali",
            image: "https://images.unsplash.com/photo-1577083753695-e010191bacb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGl3YWxpfGVufDB8fDB8fHww",
            description: "Diwali, also known as the Festival of Lights, is a major Hindu festival celebrated worldwide. It signifies the victory of light over darkness, good over evil, and knowledge over ignorance.",
            date: "31-10-2024"
          },
          {
            name: "Christmas",
            image: "https://images.unsplash.com/photo-1545622783-b3e021430fee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNocmlzdG1hc3xlbnwwfHwwfHx8MA%3D%3D",
            description: "Christmas Day, observed on December 25th, commemorates the birth of Jesus Christ, central to Christianity. It's celebrated globally with festive decorations, gift-giving, and gatherings of family and friends.",
            date: "25-12-2024"
          }
        ]
      }
    })

    this.post("/signUp", (schema, request) => {
      let userData = JSON.parse(request.requestBody);
      console.log(userData);
      // Validate user data
      const { firstName, lastName, email, password, confirmPassword, mobileNumber } = userData;
    
      // Check if all required fields are present
      if (!firstName || !lastName || !email || !password || !confirmPassword || !mobileNumber) {
        return new Response(400, {}, { error: "Please provide all required fields." });
      }
    
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return new Response(400, {}, { error: "Please provide a valid email address." });
      }
    
      // Password validation
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
      if (!passwordRegex.test(password)) {
        return new Response(400, {}, { error: "Password must be 6 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special symbol." });
      }
    
      // Confirm password validation
      if (password !== confirmPassword) {
        return new Response(400, {}, { error: "Passwords do not match." });
      }
    
      // Mobile number validation (You can add your own validation logic here)
    
      // Create an array of user data
      userDataArray.push(userData);
      console.log(userDataArray);
      
    
      // Save user data to your API or database
      // Example: schema.db.users.insert(userData);
    
      return new Response(200, {}, { message: "Account created successfully!!", userData: userDataArray });
    });

   this.post("/signIn", (schema, request) => {
  let signInData = JSON.parse(request.requestBody);
  console.log(signInData);
  console.log(userDataArray);
  // Find the user data with the matching email
  const userData = userDataArray.find(userData => userData.email === signInData.email);
console.log(userData);
  // If userData is found and passwords match, return it
  if (userData && userData.password === signInData.password) {
    return new Response(200, {}, { userData });
  } else {
    // If no matching email is found or passwords don't match, return an error response
    return new Response(400, {}, { error: "Invalid email or password." });
  }
});

    
    
  },
});

export default createServer;
