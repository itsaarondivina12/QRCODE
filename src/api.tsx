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




