import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [selectedUser, setSelectedUser] = useState(() => {
        const savedUser = localStorage.getItem('selectedUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const selectUser = (dept) => {
    	setSelectedUser(dept);
    }

    useEffect(() => {
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    }, [selectedUser]);

    return (
        <UserContext.Provider value={{ selectUser, selectedUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
 