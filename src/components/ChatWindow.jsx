import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";
import chatService from "../service/chat.service";
import LetterAvatar from "./LetterAvatar";


const ChatWindow = ({ userSelected }) => {
	const { currentUser } = useAuth();
	const [messages, setMessages] = useState([
		{
			sender: "You",
			text: "How likely are you to recommend",
			timestamp: "5 mins",
			senderInitial: "Y"
		},
		// Add more messages as needed
	]);
	const [newMessage, setNewMessage] = useState("");

	const [socket, setSocket] = useState(null);

	useEffect(() => {
		if (userSelected) {
			// Initialize socket connection when a user is selected
			const newSocket = io.connect("http://localhost:3001", {
				transports: ["websocket"],
				query: { chat_id: userSelected.id }
			});

			newSocket.on('connect', () => {
				console.log(`Connected to server with socket ID: ${newSocket.id}`);
			});

			newSocket.on('disconnect', () => {
				console.log('Disconnected from server');
			});

			newSocket.on('receiveMessage', (message) => {
				setMessages(prevMessages => [...prevMessages, message]);
			});

			setSocket(newSocket);

			// Cleanup on component unmount
			return () => {
				newSocket.disconnect();
			};
		}
	}, [userSelected]);

	useEffect(() => {
		if (userSelected) {
			chatService.getMessagesByChat(userSelected?.id).then((res) => {
				console.log(res);
				setMessages(res.messages);

			})
		}
	}, [userSelected])

	const handleSendMessage = () => {
		if (newMessage.trim()) {

			const messageObj = { from_customer: false, message_text: newMessage, chat_id: userSelected.id, created_at: new Date()};
			// setMessages([...messages, messageObj]);
			socket.emit('sendMessage', messageObj);

               setNewMessage("");
		}
	};

	function convertTimestamp(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
		const day = String(date.getDate()).padStart(2, '0');
		const hour = String(date.getHours()).padStart(2, '0');
		const minute = String(date.getMinutes()).padStart(2, '0');

		return `${year}:${month}:${day} ${hour}:${minute}`;
	}

	return (
		<div className="flex-1 p-6">
			{userSelected &&
			<div className="flex flex-col h-full">
				<div className="flex items-center justify-between p-3 border-b-2">
					<div className="flex items-center space-x-3">
						<div className="flex-shrink-0">
							{console.log("asdasd", userSelected)}
							<div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white uppercase">

									<LetterAvatar name={userSelected?.customer?.name} />

							</div>
						</div>
						<div className="flex flex-col">
							<h2 className="text-xl font-semibold">{userSelected?.customer.name}</h2>
							<span
								className={`text-sm ${userSelected?.status === "Active"
									? "text-green-500"
									: "text-gray-400"
									}`}
							>
								{userSelected?.status}
							</span>
						</div>
						<div>
								<button className="border border-red">Tranfer Chat</button>
							</div>	
					</div>
				</div>

				<div className="overflow-y-auto mb-4">
					{messages.map((message, index) => (
						<div key={index} className={`flex items-start space-x-2 ${message.from_customer === true ? 'justify-end' : ''}`}>
							{message.from_customer !== true && (
								<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-300 text-white text-sm uppercase">
									{message.senderInitial}
								</div>
							)}
							<div className={`flex flex-col ${message.from_customer === true ? 'items-end' : 'items-start'}`}>
								{message.from_customer !== true && <p className="text-xs font-semibold">{message.sender}</p>}
								<div className={`p-3 rounded-lg ${message.from_customer === true ? 'bg-blue-100' : 'bg-gray-200'}`}>
									<p>{message.message_text}</p>
								</div>
								<p className="text-xs text-gray-600">{convertTimestamp(message.created_at)}</p>
							</div>
						</div>
					))}
				</div>


				<div className="mt-auto">
					<div className="flex items-center">
						<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
							placeholder="Type a message"
							className="flex-1 border p-2 rounded mr-2"
						/>
						<button
							onClick={handleSendMessage}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Send
						</button>
					</div>
				</div>
			</div>
               }
		</div>
	);
};

export default ChatWindow;
