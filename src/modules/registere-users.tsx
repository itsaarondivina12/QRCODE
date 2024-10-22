import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { getRegisteredUsers } from '../api'; // Adjust the path to match the directory structure
import RegisteredUserDetails from './RegisteredUser'; // Import your details component

interface User {
  Hrid: string;
  FullName: string;
  LocationDesc: string;
  Team: string;
  DateRegistered: string;
}

const RegisteredUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getRegisteredUsers();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Registered Users
      </Typography>
      <TableContainer component={Paper} sx={{ width: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>HRID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Date Registered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.Hrid}
                hover
                onClick={() => setSelectedUser(user)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{user.Hrid}</TableCell>
                <TableCell>{user.FullName}</TableCell>
                <TableCell>{user.LocationDesc}</TableCell>
                <TableCell>{user.Team}</TableCell>
                <TableCell>
                {new Date(user.DateRegistered).toLocaleString('en-PH', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false, // 24-hour format
                })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Display user details if a user is selected */}
      {selectedUser && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">User Details</Typography>
          <RegisteredUserDetails user={selectedUser} />
        </div>
      )}
    </div>
  );
};

export default RegisteredUsers;
