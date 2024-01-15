import React from 'react';

const users = [
	{
		id: '#876364',
		name: 'Maxi Smith',
		department: 'Sales',
		email: 'maxismith@gmail.com',
		joinedDate: '12 Dec, 2020',
		proposals: 10,
		avatar: 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg', // Replace with actual image path
	},
	{
		id: '#876364',
		name: 'Robert William',
		department: 'Technical',
		email: 'robert112@gmail.com',
		joinedDate: '12 Dec, 2020',
		proposals: 5,
		avatar: 'https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg', // Replace with actual image path
	},
];

const UserManagement = () => {
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
				<button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
									<img className="h-8 w-8 rounded-full mr-2" src={user.avatar} alt={user.name} />
									{user.name}
								</td>
								<td className="py-4px-6 border-b border-grey-light">{user.department}</td>
								<td className="py-4 px-6 border-b border-grey-light">
									View
									<div className="flex justify-end items-center">
										<button className="text-blue-500 hover:text-blue-600 mx-1">
											<i className="fas fa-edit"></i>
										</button>
										<button className="text-blue-500 hover:text-blue-600 mx-1">
											<i className="fas fa-eye"></i>
										</button>
										<button className="text-red-500 hover:text-red-600 mx-1">
											<i className="fas fa-trash"></i>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default UserManagement;


