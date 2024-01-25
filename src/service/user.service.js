import axios from "axios";
import api, { setAuthToken } from "../utils/api";
import {errorHandler} from "../utils/errorHandler";

const userService = {
    getUserById: async (userId) => {
	   try {
		  const response = await axios.get('http://localhost:3001/api/users/user/'+userId,{ withCredentials: true });
		  console.log(response);
		  if (!response.data) {
			 throw new Error('Login failed');
		  }

		  return response.data;
	   } catch (error) {
		  console.error('Login Error:', error);
		  return errorHandler(error);
	   }
    }

}

export default userService;