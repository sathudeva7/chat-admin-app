import { useContext } from 'react';
import { DepartmentContext } from '../context/departmentContext';

// Custom hook for easy access to AuthContext
const useDepartment = () => {
  const departmentContext = useContext(DepartmentContext);

  if (!departmentContext) {
    throw new Error('useDepartment must be used within an AuthProvider');
  }

  return departmentContext;
};

export default useDepartment;
