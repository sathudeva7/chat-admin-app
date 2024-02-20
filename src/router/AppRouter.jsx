import { useRoutes } from "react-router-dom";
import UserManagement from "../components/UserManagement";
import ChatApp from "../components/ChatApp";
import UserProfile from "../components/UserProfile";
import useAuth from "../hooks/useAuth";

function RequireAdmin({ children }) {
	const { currentUser } = useAuth();

	if (currentUser.role !== 'admin') {
	  return <Navigate to="/" replace />;
	}
   
	return children;
   }

export default function AppRouter() {

	let element = useRoutes([
		{
			path: "/",
			element: <UserProfile />,
		},
		{
			path: "/chat/:id",
			element: <ChatApp />,
		},
		{
			path: "/user",
			element: (
				<RequireAdmin>
				  <UserManagement />
				</RequireAdmin>
			   ),
		},
	]);
	return element;
}