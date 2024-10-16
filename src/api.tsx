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
export const registerUser = async (hrid: string) => {
    try {
      console.log("Searching HRID on external API: ", hrid);
  
    //   const searchResponse = await axios.get(`https://api.vxiusa.com/api/GlobalHR/Employees/FindEEByWinIDDomain/${hrid}/VXIPHP`);
      const searchResponse = await axios.get(`https://vxicareers.com/srv2-api/api/v1/login/GetEmpDetailsOnGlobalAPI?nt=${hrid}&domain=VXIPHP`);
    //   console.log("Search Response.data:", searchResponse.data.UserInfo);
    //   console.log("Search Response:", searchResponse);
      if (searchResponse.data.UserInfo) {
        // Extract necessary user data from the search response
        const user = searchResponse.data.UserInfo;  // Adjust this based on the actual response structure
  
        const registerResponse = await axios.post('http://127.0.0.1:8000/api/registered-users-list/', {
          Hrid: hrid,
          FullName: user.FirstName +" "+user.LastName || "test",
          LocationDesc: user.LocationDesc || "locationDesc", 
          Team: user.Team || "team",  
          DateRegistered: new Date().toISOString() 
        });
  
        console.log("User registered successfully:", registerResponse.data);
        return registerResponse.data;
      } else {
        console.error("HRID not found in external API.");
        throw new Error('HRID not found');
      }
  
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };
