import axios from "axios";
import api from "../utils/api";
import { errorHandler } from "../utils/errorHandler";

const chatService = {

	getAllChatsByDepartment: async (deptId, userId) => {
		try {
			const response = await axios.get(`http://localhost:3001/api/chats/department/${deptId}/${userId}` ,{ withCredentials: true });
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

	assignReprentativeToChat: async (chatId, repId) => {

		try {
			const response = await axios.put(`http://localhost:3001/api/chats/assign/${chatId}`, {representativeId: repId} ,{ withCredentials: true });
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

	getMessagesByChat: async (chatId) => {
		
		try {
			const response = await axios.get(`http://localhost:3001/api/chats/messages/${chatId}` ,{ withCredentials: true });
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

	exportChat : async (chatId, email) => {
		try {
			const response = await axios.post(`http://localhost:3001/api/chats/history/${chatId}` , email,{ withCredentials: true });
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



}

export default chatService;