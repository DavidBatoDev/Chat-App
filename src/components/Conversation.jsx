import React, { useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import UserImg from '/lexi.jpg'

const Conversation = () => {
    const [isMe, setFalse] = useState(false)
  return (
    <div style={{flex: '2'}} 
        className='bg-slate-300 flex flex-col w-full'>
        <div className='flex justify-between items-center h-20 text-white bg-slate-800 p-2'>
            <div>Lexi</div>
            <MoreHorizIcon />
        </div>

        {/* Chat */}
        <div style={{height: 'calc(100% - 128px)'}} 
            className='flex flex-col-reverse gap-3 bg-slate-400 p-3 overflow-y-scroll'>
            <div className={`flex gap-5 ${isMe && 'flex-row-reverse'}`}>
                <div className='flex flex-col items-center'>
                    <img className='w-10 h-10 rounded-full object-cover' src={UserImg} alt="" />
                    <span className='text-xs text-slate-600'>Now!</span>
                </div>
                <div className={`flex flex-col text-white max-w-AT gap-3 ${isMe && 'items-end'}`}>
                    <p 
                    className={`bg-white text-black pt-2 pb-2 pl-3 pr-3
                    rounded-tr-lg rounded-bl-lg rounded-br-lg w-max
                    ${isMe && 'bg-slate-700 text-white rounded-tr-none rounded-tl-lg rounded-bl-lg rounded-br-lg'}
                    `}>
                        Hello Babe!
                    </p>
                    <img className='w-1/2 object-cover' src={UserImg} /> 
                </div>
            </div>
        </div>

        <div className='flex items-center h-16 w-full bg-white p-2'>
            <div className='h-full w-full p-2'>
            <textarea className='outline-none flex items-center h-full w-full resize-none' placeholder='Search Idol'></textarea>
            </div>
            <div>
                <SendIcon className='text-slate-800 cursor-pointer'/>
            </div>
        </div>
    </div>

  )
}

export default Conversation
