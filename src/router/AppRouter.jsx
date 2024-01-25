import { useRoutes } from "react-router-dom";
import UserManagement from "../components/UserManagement";
import ChatApp from "../components/ChatApp";
import UserProfile from "../components/UserProfile";

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
			element: <UserManagement />,
		},
	]);
	return element;
}