import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisteredUsers from "./modules/registere-users.tsx"; // Ensure the import path is correct
import Home from "./modules/Home.tsx"; // Import the new Home component

function App() {
  return (
    <Container maxWidth="lg" sx={{ height: "75vh", display: "flex", alignItems: "center" }}>
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} /> {/* Home route */}
        <Route path="/registered-users" element={<RegisteredUsers />} /> {/* User List route */}
      </Routes>
    </Container>
  );
}

export default App;
