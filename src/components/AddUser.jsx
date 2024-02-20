import React, { useEffect, useState } from 'react';
import departmentService from '../service/department.service';
import userService from '../service/user.service';

const AddUser = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        departmentId: []
    });
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // Fetch departments from the backend and set it to the state
        departmentService.getAllDepartments().then((res) => {
            console.log(res);
            setDepartments(res.department);
        })

    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleMultiSelectChange = (e) => {
        const values = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({
            ...formData,
            departmentId: values
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        const user = {
            ...formData,
            status: "active",
            role: "user"
        }
        userService.createUser(user).then((res) => {
            console.log(res);
        });
    };

    return (
        <div className="flex justify-center mt-10" id="add-member-modal">
            <div className="w-full max-w-xs">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name:
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Name"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email:
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password:
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="department">
                            Department:
                        </label>
                        <div className="relative">
                            <select
                                id="department"
                                name="departments" // Change to 'departments' to reflect that multiple can be selected
                                multiple // This enables multi-select functionality
                                value={formData.departmentId}
                                onChange={handleMultiSelectChange}
                                className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                            >
                                {departments?.map((department) => (
                                    <option key={department.id} value={department.id}>{department.name}</option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M5.516 7.548c.436-.446 1.04-.436 1.487 0L10 10.504l2.997-2.956c.447-.446 1.05-.446 1.487 0 .436.446.436 1.197 0 1.644L10.7 13.6c-.446.446-1.17.446-1.615 0L5.516 9.192c-.436-.447-.436-1.198 0-1.644z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;
