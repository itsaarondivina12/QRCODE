import { useState } from "react";
import { Box, Container, Grid, Typography, Modal, Button } from "@mui/material";
import { Route, Routes, Link } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import "./App.css";
import landingImage from "./assets/landing_image.png";
import RegisteredUsers from "./modules/registere-users.tsx"; // Ensure the import path is correct

function App() {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setScanResult(null);
    setError(null);
  };

  const handleResult = (result: { text: string } | null, error: Error | null) => {
    if (result) {
      setScanResult(result.text);
      setCount((prevCount) => prevCount + 1);
      setError(null);
    }

    if (error) {
      setError("Error accessing camera or reading QR code.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: "75vh", display: "flex", alignItems: "center" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to the VXI QR Scanner
          </Typography>
          <Typography variant="body1" gutterBottom>
            Please scan the QR code before entering the office to ensure a smooth and safe entry process.
          </Typography>

          {scanResult && (
            <Typography variant="body2" color="green" gutterBottom>
              Last Scanned Result: {scanResult}
            </Typography>
          )}

          <Typography variant="body2" gutterBottom>
            Scans made: {count}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "20px" }}>
            <button className="scan-button" onClick={handleOpen}>
              Scan QR
            </button>
            <Link to="/registered-users">
              <Button variant="contained" sx={{ marginLeft: 2 }}>
                User List
              </Button>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={landingImage}
            alt="Landing"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: "8px",
              display: "block",
              margin: "0 auto",
            }}
          />
        </Grid>
      </Grid>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: "8px" }}>
          <Typography id="modal-title" variant="h6" component="h2">
            QR Code Scanner
          </Typography>

          <QrReader delay={300} onResult={handleResult} style={{ width: "100%", marginTop: "20px" }} />

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Typography id="modal-description" sx={{ mt: 2 }}>
            {scanResult ? `Scanned Result: ${scanResult}` : "Scan a QR code to see the result."}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
      
      {/* Define Routes */}
      <Routes>
        <Route path="/registered-users" element={<RegisteredUsers />} /> {/* Ensure the path is correct */}
      </Routes>
    </Container>
  );
}

export default App;
