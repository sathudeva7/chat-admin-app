import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import useAuth from "../hooks/useAuth";
import chatService from "../service/chat.service";
import LetterAvatar from "./LetterAvatar";
import DropdownMenu from "./DropdownMenu";


const ChatWindow = ({ userSelected }) => {
	const { currentUser } = useAuth();
	const [messages, setMessages] = useState([
		// Add more messages as needed
	]);
	const [newMessage, setNewMessage] = useState("");
	const [isOnline, setIsOnline] = useState(false);

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
				console.log(messages)
				setMessages(prevGroupedMessages => {
					// Create a new date string for the incoming message
					const messageDate = new Date(message.created_at).toLocaleDateString();
			  
					// Clone the previous state to avoid direct mutation
					const updatedGroupedMessages = { ...prevGroupedMessages };
			  
					// Check if the date group already exists, if not, initialize it
					if (!updatedGroupedMessages[messageDate]) {
					    updatedGroupedMessages[messageDate] = [];
					}
			  
					// Add the new message to the correct date group
					updatedGroupedMessages[messageDate].push(message);
			  
					return updatedGroupedMessages;
				 });
			});

			newSocket.on('receiveOnline', (data) => {
				setIsOnline(data.isOnline);
			});

			setSocket(newSocket);

			// Cleanup on component unmount
			return () => {
				newSocket.disconnect();
			};
		}
	}, [userSelected]);

	useEffect(() => {
		const handleVisibilityChange = () => {
			const currentPageIsActive = !document.hidden;;
			console.log('Page is now', currentPageIsActive ? 'focused' : 'unfocused');

			// Since currentPageIsActive reflects the new state, the condition was updated accordingly
			if (currentPageIsActive) {
				console.log('Page is focused');
				socket?.emit('isAgentOnline', { "isAgentOnline": true }); // Assuming you want to emit true when page is focused
			} else {
				console.log('Page is unfocused');
				socket?.emit('isAgentOnline', { "isAgentOnline": false });
			}
		};

		// Add event listener
		document.addEventListener('visibilitychange', handleVisibilityChange);

		// Remove event listener on cleanup
		return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
	}, [socket]);

	const groupMessagesByDate = (messages) => {
		const grouped = {};
		messages.forEach(message => {
		    const date = new Date(message.created_at).toLocaleDateString();
		    if (!grouped[date]) {
			   grouped[date] = [];
		    }
		    grouped[date].push(message);
		});
		console.log(grouped)
		return grouped;
	 };

	useEffect(() => {
		if (userSelected) {
			chatService.getMessagesByChat(userSelected?.id).then((res) => {
				const groupedMessages = groupMessagesByDate(res.messages);
				setMessages(groupedMessages);

			})
		}
	}, [userSelected])

	const handleKeyDown = (event) => {
		console.log(event.key);
		if (event.key === 'Enter') {
			handleSendMessage();
		}
	   };

	const handleSendMessage = () => {
		if (newMessage.trim()) {

			const messageObj = { from_customer: false, message_text: newMessage, chat_id: userSelected.id, created_at: new Date() };
			// setMessages([...messages, messageObj]);
			socket.emit('sendMessage', messageObj);

			setNewMessage("");
		}
	};

	const exportChat = () => {
		const email = {
			"email": currentUser.email
		}
		chatService.exportChat(userSelected.id, email).then((res) => {
			console.log(res);
		});
	}

	function convertTimestamp(timestamp) {
		const date = new Date(timestamp);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
		const day = String(date.getDate()).padStart(2, '0');
		const hour = String(date.getHours()).padStart(2, '0');
		const minute = String(date.getMinutes()).padStart(2, '0');

		return `${hour}:${minute}`;
	}

	const menuOptions = [
		{ name: 'Export', fn: exportChat },
		{ name: 'Transfer', fn: () => { console.log('Transfer') } },
	]

	return (
		<div className="flex-1 p-6">
			{userSelected &&
				<div className="flex flex-col h-full">
					<div className="flex items-center justify-between p-3 border-b-2">
						<div className="flex items-center space-x-3">
							<div className="flex-shrink-0">
								<div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white uppercase">

									<LetterAvatar name={userSelected?.customer?.name} />

								</div>
							</div>
							<div className="flex flex-col">
								<h2 className="text-xl font-semibold">{userSelected?.customer.name}</h2>
								<span
									className={`text-sm ${isOnline
										? "text-green-500"
										: "text-gray-400"
										}`}
								>
									{isOnline ? "Online" : "Offline"}
								</span>
							</div>
							<div className="flex flex-col space-y-2 items-center">
								<DropdownMenu buttons={menuOptions} />
							</div>

						</div>
					</div>

					<div className="overflow-y-auto mb-4">
            {Object.entries(messages).map(([date, messagesForDate]) => (
                <div key={date}>
                    <div className="text-center my-2 py-1 rounded bg-gray-200">
                        {date} {/* Date label */}
                    </div>
				{console.log(messagesForDate)}
                    {messagesForDate?.map((message, index) => (
                        <div key={index} className={`flex items-start space-x-2 ${message.from_customer ? 'justify-end' : ''}`}>
                            {!message.from_customer && (
                                <div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-300 text-white text-sm uppercase">
                                    {message.senderInitial}
                                </div>
                            )}
                            <div className={`flex flex-col mb-2 ${message.from_customer ? 'items-end' : 'items-start'}`}>
                                {!message.from_customer && <p className="text-xs font-semibold">{message.sender}</p>}
                                <div className={`p-3 rounded-lg ${message.from_customer ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                    <p>{message.message_text}</p>
                                    <p className="text-xs text-gray-600">{convertTimestamp(message.created_at)}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>


					<div className="mt-auto">
						<div className="flex items-center">
							<input
								type="text"
								value={newMessage}
								onKeyDown={handleKeyDown}
								onChange={(e) => setNewMessage(e.target.value)}
								placeholder="Type a message"
								className="flex-1 border p-2 rounded mr-2"
							/>
							<button
								onClick={handleSendMessage}
								tabIndex="0"
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
