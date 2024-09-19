import React from 'react'
import SearchInput from './SearchInput.jsx'
import Conversations from './Conversations.jsx'
import Logout from './LogoutButton.jsx'
function Sidebar() {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
			<SearchInput />
			<div className='divider px-3'></div>
			<Conversations />
			<Logout />
		</div>
  )
}

export default Sidebar