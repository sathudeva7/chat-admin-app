import React, { Fragment, useEffect, useState } from "react";
import departmentService from "../service/department.service";

const DepartmentModal = ({ isOpen, onClose }) => {
  const [nameOptions, setNameOptions] = useState([]);
  if (!isOpen) return null;

  useEffect(() => {
    departmentService.getAllDepartments().then((res) => {
      console.log(res);
      if (res.message == "Departments fetched successfully") {
        setNameOptions(res.data);
      }
    })
  },[])

  return (
    <Fragment>
      <div
        className="fixed inset-0  bg-gray-600 bg-opacity-90 overflow-y-auto h-full w-full font-poppins"
        id="add-member-modal"
      >
        <div className="relative  top-1/3 w-[20%] mx-auto p-4 shadow-lg  rounded-lg bg-white overflow-y-auto">
          <div className=" flex items-center my-2 justify-between ">
            <h3 className="text-xl text-center leading-6 font-semibold text-gray-900">
              Select Department
            </h3>
            {/* <IoCloseSharp className="w-5 h-5" onClick={onClose} /> */}
          </div>
          <form >
            <div>

              {/* <CustomDropDown options={nameOptions} name={'Select Member'} /> */}
		    <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
			<option>Sales</option>
			<option>Technical</option>
			<option>Integration</option>
			</select>
            </div>
            <div className="mt-10">
              <button
                className=" py-2 w-full rounded-md text-white font-semibold text-sm bg-[#3D68E6]"
              > Select Department</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default DepartmentModal;
