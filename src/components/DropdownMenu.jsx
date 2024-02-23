import React, { useState } from 'react';

const DropdownMenu = ({ buttons }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => setIsOpen(!isOpen);

	return (
		<div className="relative inline-block text-left">
			<div>
				<button onClick={toggleDropdown} className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300">
					<span className="text-lg">⋮</span> {/* Triple dot icon */}
				</button>
			</div>

			{isOpen && (
				<div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
					<div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
						{buttons.map(button => (
							<button className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-100" onClick={button.fn}>
								{button.name}
							</button>
						))
						}
					</div>
				</div>
			)}
		</div>
	);
};

export default DropdownMenu;
