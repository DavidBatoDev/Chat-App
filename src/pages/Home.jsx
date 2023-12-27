import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Conversation from '../components/Conversation';

const Home = () => {
    const [isMe, setIsMe] = useState(false)

  return (
    <div className='flex justify-center items-center bg-slate-400 w-screen h-screen'>
        <div 
        className='flex h-screen w-screen border bg-slate-500 
        border-slate-700 shadow-2xl rounded-none overflow-hidden
        sm:h-5/6 sm:w-4/5 sm:rounded
        '>
            <Sidebar />
            <Conversation />
        </div>
    </div>
  )
}

export default Home
