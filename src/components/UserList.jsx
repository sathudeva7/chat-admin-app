import React from 'react';

const users = [
  { name: 'Melody Macy', email: 'melody@altbox.com', status: 'offline', unread: 0 },
  { name: 'Max Smith', email: 'max@kt.com', status: 'online', unread: 0 },
  // ... other users
];

const UserList = () => {
  return (
    <div className="bg-white w-80 p-6">
      <div className="flex flex-col">
        <input
          type="search"
          placeholder="Search by username or email..."
          className="mb-4 p-2 border rounded"
        />
        {users.map((user, index) => (
          <div key={index} className={`flex items-center ${user.unread ? 'bg-blue-100' : ''} p-2 rounded my-1`}>
            <div className={`h-2 w-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} mr-3`}></div>
            <div className="flex flex-col">
              <span>{user.name}</span>
              <span className="text-gray-600 text-xs">{user.email}</span>
            </div>
            {user.unread ? <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">{user.unread}</span> : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
