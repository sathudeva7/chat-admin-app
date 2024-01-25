import { useContext } from 'react';
import { UserContext } from '../context/userContext';

// Custom hook for easy access to AuthContext
const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useuser must be used within an AuthProvider');
  }

  return userContext;
};

export default useUser;
