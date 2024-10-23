import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisteredUsers from "./modules/registere-users.tsx"; // Ensure the import path is correct
import Home from "./modules/Home.tsx"; // Import the new Home component
import Report from "./modules/Report.tsx"; // Import the new Home component

function App() {
  return (
    <Container
      maxWidth={false} // Set maxWidth to false for full width
      sx={{
        height: 'auto', // Adjust height to auto for dynamic content
        display: 'flex',
        flexDirection: 'column', // Optional: set to column for vertical stacking
        paddingTop: '20px', // Adjust padding based on your navbar height
      }}
    >
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/registered-users" element={<RegisteredUsers />} /> {/* User List route */}
        <Route path="/report" element={<Report />} /> {/* Report route */}
      </Routes>
    </Container>
  );
}

export default App;
