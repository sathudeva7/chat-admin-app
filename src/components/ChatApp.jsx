import React from 'react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import useDepartment from '../hooks/useDepartment';
import useUser from '../hooks/useUser';

const ChatApp = () => {
	const { selectedDepartment } = useDepartment();
	const { selectedUser } = useUser();


  return (

	<div className="flex flex-1">
	  <UserList dept_id={selectedDepartment}/>
	  <ChatWindow currentUser={selectedUser}/>
	</div>

  );
};

export default ChatApp;