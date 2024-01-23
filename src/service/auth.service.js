import axios from "axios";
import api, { setAuthToken } from "../utils/api";
import {errorHandler} from "../utils/errorHandler";

const authService = {
    // Function to log in a user
    login: async (email, password) => {
        try {
		await axios.get('http://localhost:3001/api/auth/login', {withCredentials: true}).then((response) => {
           console.log(response);
          })
		 
        console.log(response);
            if (!response.data) {
                throw new Error('Login failed');
            }

            return response.data;
        } catch (error) {
            console.error('Login Error:', error);
            return errorHandler(error);
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
