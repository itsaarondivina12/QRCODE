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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { getRegisteredUsers, deleteUser } from '../api'; // Adjust the path to match the directory structure

interface User {
  id: number;
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
  const [open, setOpen] = useState(false);
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

  const handleDeleteClick = (user: User) => {
    console.log('selectedUser', user);
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        const result = await deleteUser(selectedUser.id);
        if (result.success) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUser.id));
        }
      } catch (error) {
        setError('Failed to delete user');
      } finally {
        handleClose();
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

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
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
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
                    hour12: false,
                  })}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove {selectedUser?.FullName} from the registered users?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RegisteredUsers;
