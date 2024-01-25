import React, { useEffect, useState } from 'react';
import chatService from '../service/chat.service';
import useUser from '../hooks/useUser';
import useAuth from '../hooks/useAuth';

// const users = [
//   { name: 'Melody Macy', email: 'melody@altbox.com', status: 'offline', unread: 0 },
//   { name: 'Max Smith', email: 'max@kt.com', status: 'online', unread: 0 },
//   // ... other users
// ];

const UserList = ({dept_id}) => {
  const [users, setUsers] = useState([]);
  const { selectUser } = useUser();
  const { currentUser} = useAuth();

  useEffect(() => {
   //api
    chatService.getAllChatsByDepartment(dept_id).then((res) => {
      console.log(res);
      setUsers(res.chats);
    }) 
  },[])

  const assignUser = (chatId) => {
    console.log(chatId)
    chatService.assignReprentativeToChat(chatId,currentUser.id ).then((res) => {
      console.log(res);
      selectUser(res.data.chat);
    })
  }



  return (
    <div className="bg-white w-80 p-6">
      <div className="flex flex-col">
        <input
          type="search"
          placeholder="Search by username or email..."
          className="mb-4 p-2 border rounded"
        />
        {users.map((user, index) => (
          <div key={index} className={`flex items-center ${user.unread ? 'bg-blue-100' : ''} p-2 rounded my-1`} onClick={() => selectUser(user)}>
            <div className={`h-2 w-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'} mr-3`}></div>
            <div className="flex flex-col">
              <span>{user?.customer?.name}</span>
              <span className="text-gray-600 text-xs">{user?.customer?.email}</span>
            </div>
            {!user?.representative?.id &&
            <button className="ml-auto bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-2 rounded" onClick={() => assignUser(user.id)}>
              Assign
            </button>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
