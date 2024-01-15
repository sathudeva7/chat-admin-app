import React, { useState } from "react";

const ChatWindow = ({ currentUser }) => {
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

	const handleSendMessage = () => {
		if (newMessage.trim()) {
			const newMessageObj = {
				sender: "",
				text: newMessage,
				timestamp: "just now",
				senderInitial: "Y"
			};
			setMessages([...messages, newMessageObj]);
			setNewMessage("");
		}
	};

	return (
		<div className="flex-1 p-6">
			<div className="flex flex-col h-full">
				<div className="flex items-center justify-between p-3 border-b-2">
					<div className="flex items-center space-x-3">
						<div className="flex-shrink-0">
							<div className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-500 text-white uppercase">
								{currentUser.profilePic ? (
									<img
										src={currentUser.profilePic}
										alt={currentUser.name}
										className="rounded-full h-10 w-10 object-cover"
									/>
								) : (
									"M"
								)}
							</div>
						</div>
						<div className="flex flex-col">
							<h2 className="text-xl font-semibold">{currentUser.name}</h2>
							<span
								className={`text-sm ${currentUser.status === "Active"
										? "text-green-500"
										: "text-gray-400"
									}`}
							>
								{currentUser.status}
							</span>
						</div>
					</div>
				</div>

				<div className="overflow-y-auto mb-4">
					{messages.map((message, index) => (
						<div key={index} className={`flex items-start space-x-2 ${message.sender === 'You' ? 'justify-end' : ''}`}>
							{message.sender !== 'You' && (
								<div className="rounded-full h-8 w-8 flex items-center justify-center bg-gray-300 text-white text-sm uppercase">
									{message.senderInitial}
								</div>
							)}
							<div className={`flex flex-col ${message.sender === 'You' ? 'items-end' : 'items-start'}`}>
								{message.sender !== 'You' && <p className="text-xs font-semibold">{message.sender}</p>}
								<div className={`p-3 rounded-lg ${message.sender === 'You' ? 'bg-blue-100' : 'bg-gray-200'}`}>
									<p>{message.text}</p>
								</div>
								<p className="text-xs text-gray-600">{message.timestamp}</p>
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
		</div>
	);
};

export default ChatWindow;
