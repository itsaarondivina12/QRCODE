import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisteredUsers from "./modules/registere-users.tsx"; // Ensure the import path is correct
import Home from "./modules/Home.tsx"; // Import the new Home component

function App() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "auto", // Adjust height to auto for dynamic content
        display: "flex",
        alignItems: "center",
        paddingTop: "80px", // Adjust padding based on your navbar height (e.g., 80px)
      }}
    >
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/registered-users" element={<RegisteredUsers />} /> {/* User List route */}
      </Routes>
    </Container>
  );
}

export default App;
