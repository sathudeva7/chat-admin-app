import React from 'react'
import Header from './Header'

function AppLayout({ children }) {
	return (
		<div className="flex flex-col h-screen">
			<Header />
			{children}
		</div>
	)
}

export default AppLayout