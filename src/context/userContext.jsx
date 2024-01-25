import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [selectedUser, setSelectedUser] = useState(null);

    const selectUser = (dept) => {
    	setSelectedUser(dept);
    }

    return (
        <UserContext.Provider value={{ selectUser, selectedUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
 