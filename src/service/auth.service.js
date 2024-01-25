import axios from "axios";
import api, { setAuthToken } from "../utils/api";
import {errorHandler} from "../utils/errorHandler";

const authService = {
    // Function to log in a user
    login: async (email, password) => {
        try {
		const response = await axios.post('http://localhost:3001/api/auth/login',{email,password}, {withCredentials: true})
		 
            if (!response.data) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.data;
            localStorage.setItem('user', JSON.stringify(data.user));
            console.log(data)
            return data; // Return the parsed data
        } catch (error) {
            console.error('There was an error!', error);
        }
        
    },

    // Function to log out a user
    logout: () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        // Add any other cleanup logic here
    },

    // Function to get the current user from local storage
    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default authService;
