import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/', // Adjust the base URL as needed
});

// Function to get registered users
export const getRegisteredUsers = async () => {
    try {
        const response = await api.get('registered-users-list/'); // Make sure the endpoint matches your Django URL
        return response.data;
    } catch (error) {
        console.error('Error fetching registered users:', error);
        throw error; 
    }
};
