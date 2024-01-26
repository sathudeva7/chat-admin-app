import React, { useEffect, useState } from 'react';
import AddUser from './AddUser';
import userService from '../service/user.service';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
	const [users, setUsers] = useState([]);
	const [openModel, setOpenModel] = useState(false);
	const naigate = useNavigate();

	const handleAddUser = () => {
		setOpenModel(true);
	};

	const handleClose = () => {
		setOpenModel(false);
	};

	useEffect(() => {
		userService.getAllUsers().then((res) => {
			console.log(res);
			setUsers(res.users);
		})

	}, [])


	return (
		<div className="p-8">
			<div className="pb-4">
				<h1 className="text-2xl font-semibold">User Management</h1>
			</div>

			<div className="flex mb-4">
				<div className="flex-grow">
					<input
						type="search"
						placeholder="Search..."
						className="p-2 border rounded"
					/>
				</div>
				<button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddUser}>
					Add User
				</button>
			</div>

			<div className="bg-white shadow-md rounded my-6">
				<table className="text-left w-full border-collapse">
					<thead>
						<tr>
							<th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
							<th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Department</th>
							<th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user.id} className="hover:bg-grey-lighter">
								<td className="py-4 px-6 border-b border-grey-light flex items-center">
									<img className="h-8 w-8 rounded-full mr-2" src='https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg' alt={user.username} />
									{user.username}
								</td>
								<td className="py-4 px-6 border-b border-grey-light">
									{user.departments.map((department, index) => (
										<div key={index}>{department.name}</div>
									))}
								</td>
								<td className="py-4 px-6 border-b border-grey-light">
									
									<button className="text-blue-500 hover:text-blue-600 mx-1" onClick={() => naigate(`/`)}>
											<i className="fas fa-eye"></i>View
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{openModel && <AddUser handleClose={handleClose} />}
		</div>
	);
};

export default UserManagement;


