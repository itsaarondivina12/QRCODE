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

export const getAttendance = async () => {
  try {
      const response = await api.get('attendance-list/');
      return response.data;
  } catch (error) {
      console.error('Error fetching Attendance:', error);
      throw error; 
  }
};

// Function to register a user (sending HRID)

// Define the structure of the UserInfo type

interface UserInfo {
  FirstName: string;
  LastName: string;
  LocationDesc: string;
  Team: string;
}





export const registerUser = async (hrid: string) => {
  try {
    console.log("Searching HRID on external API: ", hrid);

    // Check if the HRID already exists in the local system
    const existingUserResponse = await axios.get('http://127.0.0.1:8000/api/registered-users-list/');
    console.log("list: ", existingUserResponse);

    // Filter the response to check if the HRID already exists
    const userExists = existingUserResponse.data.some((user: { Hrid: string }) => user.Hrid === hrid);

    if (userExists) {
      console.log(`HRID ${hrid} already exists.`);
      return { data: null, message: `HRID ${hrid} already exists`, success: false };
    } else {
      // If HRID is not found, proceed with external API call
      const searchResponse = await axios.get(`https://vxicareers.com/srv2-api/api/v1/login/GetEmpDetailsOnGlobalAPI?nt=${hrid}&domain=VXIPHP`);

      if (searchResponse.data.UserInfo) {
        const user: UserInfo = searchResponse.data.UserInfo;

        // Register the user
        const registerResponse = await axios.post('http://127.0.0.1:8000/api/registered-users-list/', {
          Hrid: hrid,
          FullName: user.FirstName + " " + user.LastName || "test",
          LocationDesc: user.LocationDesc || "locationDesc",
          Team: user.Team || "team",
          DateRegistered: new Date().toISOString()
        });

        console.log("User registered successfully:", registerResponse.data);
        // Return both registerResponse.data and true
        return { data: registerResponse.data, success: true, message : "User registered successfully" };
      } else {
        console.error("HRID not found in external API.");
        throw new Error('HRID not found');
      }
    }

  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const AttendanceUser = async (hrid: string) => {
  try {
    // Fetch the registered users
    const existingUserResponse = await axios.get('http://127.0.0.1:8000/api/registered-users-list/');
    
    // Check if the HRID exists
    const foundUser = existingUserResponse.data.find((user: { Hrid: string }) => user.Hrid === hrid);
    
    if (!foundUser) {
      console.log(`HRID ${hrid} does not exist.`);
      return; // Exit early if user is not found
    }

    // Fetch the attendance list
    const existingAttendanceResponse = await axios.get('http://127.0.0.1:8000/api/attendance-list/');
    
    // Filter attendance entries for the given hrid
    const filteredAttendance = existingAttendanceResponse.data.filter((attendance: { Hrid: string; }) => attendance.Hrid === hrid);
    console.log("Filtered: ",filteredAttendance)

    // Get the latest attendance entry if it exists
    const lastAttendance = filteredAttendance[filteredAttendance.length - 1];
    console.log("Last attendance: ",lastAttendance)

    const currentTime = new Date().toISOString(); // Get the current time in ISO format

    if (lastAttendance) {
      // Update the last attendance entry
      if (!lastAttendance.time_out) {
        
        const updateResponse = await axios.put(`http://127.0.0.1:8000/api/attendance-list/${lastAttendance.id}/`, {
          Hrid: lastAttendance.Hrid,
          FullName: lastAttendance.FullName,
          LocationDesc: "VXI CLARK",
          time_out: currentTime,
          time_in: lastAttendance.time_in
        });
              console.log("Attendance updated successfully:", updateResponse.data);
      } else {

        const attendanceData = {
          Hrid: hrid,
          FullName: foundUser.FullName || "test",
          LocationDesc: "VXI CLARK",
          Team: foundUser.Team || "team",
          time_in: currentTime, 
          time_out: null, // Set time_out to current time if the last entry has time_out
        };
        console.log("Data before saving: ", attendanceData)
        const registerResponse = await axios.post('http://127.0.0.1:8000/api/attendance-list/', attendanceData);
        console.log("User registered successfully:", registerResponse.data);
        return "User registered successfully."; // Return success message for registration
      }
    } else {
      const attendanceData = {
          Hrid: hrid,
          FullName: foundUser.FullName || "test",
          LocationDesc: "VXI CLARK",
          Team: foundUser.Team || "team",
          time_in: currentTime, 
          time_out: null, // Set time_out to current time if the last entry has time_out
        };
      const registerResponse = await axios.post('http://127.0.0.1:8000/api/attendance-list/', attendanceData);
      console.log("User registered successfully:", registerResponse.data);
    }
  } catch (error) {
    console.error('Error Transaction:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    // Sending a DELETE request to the API endpoint with the user HRID
    console.log('API : DELETE',id)
    const response = await api.delete(`registered-users-list/${id}/`);
    console.log('User deleted successfully:', response.data);
    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new Error('Failed to delete user');
  }
};


// interface AttendanceEntry {
//   id: number; // Adjust this type based on your actual data structure
//   Hrid: string; // Make sure this matches your data
//   FullName?: string; // Optional, if not always present
//   LocationDesc?: string; // Optional, if not always present
//   Time_in?: string; // Adjust this type based on your actual data structure
//   Time_out?: string; // Adjust this type based on your actual data structure
// }





