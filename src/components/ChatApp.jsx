import React, { useEffect } from 'react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';
import useDepartment from '../hooks/useDepartment';
import useUser from '../hooks/useUser';

const ChatApp = () => {
	const { selectedDepartment, selectDepartment } = useDepartment();
	const { selectedUser, selectUser } = useUser();

	useEffect(() => {
		return () => {
			selectUser(null);
			selectDepartment(null);
		}

	}, [])


	return (

		<div className="flex flex-1">
			<UserList dept_id={selectedDepartment} />
			<ChatWindow userSelected={selectedUser} />
		</div>

	);
};

export default ChatApp;