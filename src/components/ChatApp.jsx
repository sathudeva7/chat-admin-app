import React from 'react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';

const ChatApp = () => {
	let currentUser = {
		"name": "Max Smith",
		"status": "Active",
	};

  return (

	<div className="flex flex-1">
	  <UserList />
	  <ChatWindow currentUser={currentUser}/>
	</div>

  );
};

export default ChatApp;