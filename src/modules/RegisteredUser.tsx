import React from 'react';

// Define the User interface to type the user object
interface User {
    Hrid: string;          // HR ID of the user
    FullName: string;      // Full name of the user
    LocationDesc: string;  // Location description
    Team: string;          // Team the user belongs to
    DateRegistered: string; // Date the user registered (could be parsed to a Date object)
}

// Define the props for the RegisteredUserDetails component
interface RegisteredUserDetailsProps {
    user: User; // Prop that accepts a user object of type User
}

// Functional component to display registered user details
const RegisteredUserDetails: React.FC<RegisteredUserDetailsProps> = ({ user }) => {
    return (
        <div className="user-details">
            <h3>User Details</h3>
            <p><strong>HR ID:</strong> {user.Hrid}</p>
            <p><strong>Full Name:</strong> {user.FullName}</p>
            <p><strong>Location:</strong> {user.LocationDesc}</p>
            <p><strong>Team:</strong> {user.Team}</p>
            <p><strong>Date Registered:</strong> {new Date(user.DateRegistered).toLocaleString()}</p>
        </div>
    );
};

export default RegisteredUserDetails;
