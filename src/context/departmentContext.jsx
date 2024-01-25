import React, { createContext, useState } from 'react';

export const DepartmentContext = createContext();

const DepartmentProvider = ({ children }) => {
	const [selectedDepartment, setSelectedDepartment] = useState(null);

    const selectDepartment = (dept) => {
    	setSelectedDepartment(dept);
    }

    return (
        <DepartmentContext.Provider value={{ selectDepartment, selectedDepartment }}>
            {children}
        </DepartmentContext.Provider>
    );
};

export default DepartmentProvider;
 