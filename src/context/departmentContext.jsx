import React, { createContext, useEffect, useState } from 'react';

export const DepartmentContext = createContext();

const DepartmentProvider = ({ children }) => {
	const [selectedDepartment, setSelectedDepartment] = useState(() => {
        const savedDept = localStorage.getItem('selectedDepartment');
        return savedDept ? JSON.parse(savedDept) : null;
    });

    const selectDepartment = (dept) => {
    	setSelectedDepartment(dept);
    }

    useEffect(() => {
        localStorage.setItem('selectedDepartment', JSON.stringify(selectedDepartment));
    }, [selectedDepartment]);

    return (
        <DepartmentContext.Provider value={{ selectDepartment, selectedDepartment }}>
            {children}
        </DepartmentContext.Provider>
    );
};

export default DepartmentProvider;
 