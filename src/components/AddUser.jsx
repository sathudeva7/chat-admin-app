import React, { useState } from 'react';

// Reusable input field component
const InputField = ({ label, value, onChange, id, type }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
            {label}:
        </label>
        <input
            type={type ? type : "text"}
            id={id}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={onChange}
        />
    </div>
);

// Form component for adding a user
const AddUserForm = ({ handleNameChange, handleDepartmentChange, handleSubmit, name,email,password, department }) => (
    <form onSubmit={handleSubmit} className="bg-white px-8 pt-6 pb-8 mb-4">
        <InputField label="Name" value={name} onChange={handleNameChange} id="name" />
        <InputField label="Email" value={email} onChange={handleNameChange} id="email" />
        <InputField label="Password" value={password} onChange={handleNameChange} id="password" type="password"/>
	   <label className="block text-gray-700 text-sm font-bold mb-2">Department:</label>
        <select className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
			<option>Sales</option>
			<option>Technical</option>
			<option>Integration</option>
			</select>
        <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Add
        </button>
    </form>
);

// Main component to add a user
const AddUser = ({ handleClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [department, setDepartment] = useState('');

    const handleNameChange = (e) => setName(e.target.value);
    const handleDepartmentChange = (e) => setDepartment(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Name:', name);
        console.log('Department:', department);
        handleClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="add-member-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <h2 className="text-center text-2xl text-gray-900 font-bold">Add User</h2>
                <AddUserForm 
                    handleNameChange={handleNameChange}
                    handleDepartmentChange={handleDepartmentChange}
                    handleSubmit={handleSubmit}
                    name={name}
                    email={email}
                    password={password}
                    department={department}
                />
            </div>
        </div>
    );
};

export default AddUser;
