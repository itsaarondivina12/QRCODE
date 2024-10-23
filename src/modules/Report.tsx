import React, { useEffect, useState } from "react";
import { getAttendance } from "../api.tsx"; // Ensure the correct path
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface Attendance {
  id: number;
  Hrid: string;
  FullName: string;
  LocationDesc: string;
  time_in: string;
  time_out: string;
}

const Report: React.FC = () => {
  const [attendanceList, setAttendanceList] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendance();
        setAttendanceList(data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching attendance data");
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="App">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <h1>Attendance Log</h1>
        </div>
      </header>

      {/* Attendance Table */}
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell> </TableCell>
              <TableCell>HRID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Time In</TableCell>
              <TableCell>Time Out</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceList.map((attendance, index) => (
              <TableRow key={attendance.id}>
                <TableCell>{index + 1}</TableCell> {/* Use index for count */}
                <TableCell>{attendance.Hrid}</TableCell>
                <TableCell>{attendance.FullName}</TableCell>
                <TableCell>{attendance.LocationDesc}</TableCell>
                <TableCell>
                  {new Date(attendance.time_in).toLocaleString("en-PH", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false, // 24-hour format
                  })}
                </TableCell>
                <TableCell>
                  {attendance.time_out
                    ? new Date(attendance.time_out).toLocaleString("en-PH", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false, // 24-hour format
                      })
                    : "Still Active"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Report;
