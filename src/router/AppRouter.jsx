import { useRoutes } from "react-router-dom";
import UserManagement from "../components/UserManagement";
import ChatApp from "../components/ChatApp";

export default function AppRouter() {
	let element = useRoutes([
		{
			path: "/",
			element: <ChatApp />,
		},
		{
			path: "/user",
			element: <UserManagement />,
		},
	]);
	return element;
}