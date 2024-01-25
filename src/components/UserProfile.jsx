import { useEffect, useState } from "react";
import userService from "../service/user.service";
import useAuth from "../hooks/useAuth";
import DepartmentTable from "./DepartmentTable";

// ProfileCard Component
const ProfileCard = ({ username, email, role, avatar }) => {
	console.log(username);
	return (
	  <div className="flex items-center space-x-4 p-4">
	    <img className="w-24 h-24 rounded-full" src='https://www.w3schools.com/howto/img_avatar.png' alt="Profile" />
	    <div>
		 <h2 className="text-lg font-semibold">{username}</h2>
		 <p className="text-gray-600">{email}</p>
		 <p className="text-gray-500">{role}</p>
	    </div>
	    {/* Action Buttons Here */}
	  </div>
	);
   };
   
   
// ContactInfo Component
const ContactInfo = ({ fullName, email, phone, mobile, address }) => {
	return (
	  <div className="bg-white p-4 rounded-lg shadow-md">
	    <div className="pb-2 border-b">
		 <h3 className="text-lg font-semibold text-gray-900">Full Name</h3>
		 <p className="text-gray-700">{fullName}</p>
	    </div>
	    <div className="py-2 border-b">
		 <h3 className="text-lg font-semibold text-gray-900">Email</h3>
		 <p className="text-gray-700">{email}</p>
	    </div>
	    <div className="py-2 border-b">
		 <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
		 <p className="text-gray-700">{phone}</p>
	    </div>
	    <div className="py-2 border-b">
		 <h3 className="text-lg font-semibold text-gray-900">Mobile</h3>
		 <p className="text-gray-700">{mobile}</p>
	    </div>
	    <div className="pt-2">
		 <h3 className="text-lg font-semibold text-gray-900">Address</h3>
		 <p className="text-gray-700">{address}</p>
	    </div>
	    <div className="flex justify-end mt-4">
		 <button className="text-blue-600 hover:text-blue-800 font-semibold">
		   Edit
		 </button>
	    </div>
	  </div>
	);
   };
   
   // UserProfile Component
   const UserProfile = () => {
	const { currentUser, login, logout, isLoading } = useAuth();
	const [userInfo, setUserInfo] = useState([]);

	useEffect(() => {
		userService.getUserById(currentUser?.id).then((res) => {

			if (res.success) {
			    setUserInfo(res.user[0]);		    
			}
		 })
	},[])

   
	return (
		
	  <div className="bg-gray-100 p-6 rounded-lg shadow-md">
	    <ProfileCard {...userInfo} />
	    <DepartmentTable departmentData={userInfo.departments}/>
	  </div>
	);
   };
   
   export default UserProfile;
   