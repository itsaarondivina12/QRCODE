import React, { useEffect, useState } from 'react';
import { getRegisteredUsers } from '../api'; // Adjust the path to match the directory structure
import RegisteredUserDetails from './RegisteredUser'; // Import your details component

interface User {
    Hrid: string;
    FullName: string;
    LocationDesc: string;
    Team: string;
    DateRegistered: string; // Or Date if you parse it
}

const RegisteredUsers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null); // State for selected user

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
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.Hrid} onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer' }}>
                        {user.FullName} - {user.LocationDesc} - {user.Team} - {user.DateRegistered}
                    </li>
                ))}
            </ul>

            {/* Display user details if a user is selected */}
            {selectedUser && <RegisteredUserDetails user={selectedUser} />}
        </div>
    );
};

export default RegisteredUsers;
