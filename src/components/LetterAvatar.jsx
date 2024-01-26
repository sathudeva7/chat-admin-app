import React from 'react';

const LetterAvatar = ({ name, size = '8' }) => {
    const getInitials = (name) => {
        return name.split(' ').map(part => part[0]).join('').toUpperCase();
    };

    const initials = getInitials(name);

    // Hash function to get a number based on the initials
    const getColorIndex = (initials) => {
        return initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colorPalette.length;
    };

    // Define a color palette
    const colorPalette = [
        'bg-red-500',
        'bg-green-500',
        'bg-blue-500',
        'bg-yellow-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-indigo-500',
	   'bg-gray-500',
    ];

    // Get a color from the palette based on initials
    const colorClass = colorPalette[getColorIndex(initials)];

    const sizeClasses = {
        '6': 'h-6 w-6 text-xs',
        '8': 'h-8 w-8 text-sm',
        '10': 'h-10 w-10 text-base',
        // Add more sizes as needed
    };

    return (
        <div className={`text-white flex items-center justify-center rounded-full ${colorClass} ${sizeClasses[size]}`}>
            {initials}
        </div>
    );
};

export default LetterAvatar;
