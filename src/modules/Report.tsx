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
  TextField,
  Button,
} from "@mui/material";
import * as XLSX from "xlsx";

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
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

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

  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToDate(event.target.value);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredAttendanceList.map((attendance) => ({
        HRID: attendance.Hrid,
        "Full Name": attendance.FullName,
        Location: attendance.LocationDesc,
        "Time In": attendance.time_in,
        "Time Out": attendance.time_out || "Still Active",
      }))
    );

    worksheet["!cols"] = [
      { wch: 10 },  // HRID column width
      { wch: 20 },  // Full Name column width
      { wch: 15 },  // Location column width
      { wch: 30 },  // Time In column width
      { wch: 30 },  // Time Out column width
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, "Attendance_Report.xlsx");
  };

  const filteredAttendanceList = attendanceList.filter((attendance) => {
    const timeInDate = new Date(attendance.time_in).toISOString().split("T")[0];
    return (
      (!fromDate || timeInDate >= fromDate) &&
      (!toDate || timeInDate <= toDate)
    );
  });

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

      {/* Date Range Filter and Export Button */}
      <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <TextField
            label="From Date"
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="To Date"
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <Button variant="contained" color="primary" onClick={exportToExcel}>
          Export to Excel
        </Button>
      </div>

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
            {filteredAttendanceList.map((attendance, index) => (
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
                    hour12: false,
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
                        hour12: false,
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
