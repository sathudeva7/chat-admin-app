import React from 'react';
import { useNavigate } from 'react-router-dom';
import useDepartment from '../hooks/useDepartment';

// Mock data for the table
const usersData = [
  { id: 1, name: 'John Doe', messageCount: 5, actions: 'View/Edit' },
  // Add more user data here
];

const DepartmentTable = ({departmentData}) => {
  const { selectDepartment } = useDepartment();
	const navigate = useNavigate();

  const chooseDept = (deptId) => {
    console.log(deptId)
    selectDepartment(deptId);
    navigate(`/chat/${deptId}`)
  }

  return (
    <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message Count
            </th>
            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {departmentData?.map((dept) => (
            <tr key={dept.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{dept.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">11</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-indigo-600 hover:text-indigo-900" onClick={() =>chooseDept(dept.id)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
