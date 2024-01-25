import React, { createContext, useState, useEffect } from 'react';
import authService from '../service/auth.service';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle login
    const login = async (email, password) => {
        setIsLoading(true);
        try {
             const response = await authService.login(email, password);
		   
             setCurrentUser(response.user);
          return response;
        } catch (error) {
            console.error('Login failed:', error);
            // Optionally handle the error, like showing a notification
        }
        setIsLoading(false);
    };

    // Function to handle logout
    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    // Check the current user's authentication status on initial render
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
 