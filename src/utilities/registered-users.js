import React, { useEffect, useState } from 'react';
import { getRegisteredUsers } from '../api'; // Ensure this path is correct

const RegisteredUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        return  <div>Loading...</div>;

    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Registered Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.Hrid}>
                        {user.FullName} - {user.LocationDesc} - {user.Team} - {user.DateRegistered}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegisteredUsers;
