import api from "../utils/api";
import { errorHandler } from "../utils/errorHandler";

const departmentService = {

	getAllDepartments: async () => {
		try {
			const response = await api.get('/department/all', {
				withCredentials: true
			});
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

export default departmentService;