import React, { useState } from 'react'
import UserImg from '/lexi.jpg'
import SendIcon from '@mui/icons-material/Send';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Home = () => {
    const [isMe, setIsMe] = useState(false)

  return (
    <div className='flex justify-center items-center bg-slate-400 w-screen h-screen'>
        <div 
        className='flex h-screen w-screen border bg-slate-500 
        border-slate-700 shadow-2xl rounded-none overflow-hidden
        sm:h-5/6 sm:w-4/5 sm:rounded
        '>
            {/* Sidebar */}
            <div className='flex-1 flex flex-col'>
                <div className='flex items-center h-16 bg-slate-200'>
                    <div className='flex w-full justify-between items-center p-1'>
                        <div className='font-bold'>Hey Chat</div>
                        <div className='flex items-center gap-1'>
                            <img className='h-8 w-8 rounded-full' src={UserImg} alt="" />
                            <p className='pr-2 text-sm'>Lexi</p>
                        </div>
                    </div>
                </div>
                <div className=' flex w-full h-14 p-2 bg-slate-700'>
                    <input 
                        className='border-b-2 border-slate-800 w-full h-10 text-sm p-2 outline-none text-white placeholder:text-white bg-transparent' type="text" placeholder='Search User' 
                    />
                </div>

                <div className='flex flex-col h-full w-full bg-slate-700'>

                    <div className='p-2 flex w-full justify-between text-white'>
                        <img className='h-10 w-10 object-cover rounded-full' src={UserImg} alt="" />
                        <div className='w-full flex flex-col ml-2'>
                            <div className='font-bold'>Lexi</div>
                            <span className='text-xs'>Hello Babe!</span>
                        </div>
                    </div>

                    <div className='p-2 flex w-full justify-between text-white'>
                        <img className='h-10 w-10 object-cover rounded-full' src={UserImg} alt="" />
                        <div className='w-full flex flex-col ml-2'>
                            <div className='font-bold'>Lexi</div>
                            <span className='text-xs'>Hello Babe!</span>
                        </div>
                    </div>

                    <div className='p-2 flex w-full justify-between text-white'>
                        <img className='h-10 w-10 object-cover rounded-full' src={UserImg} alt="" />
                        <div className='w-full flex flex-col ml-2'>
                            <div className='font-bold'>Lexi</div>
                            <span className='text-xs'>Hello Babe!</span>
                        </div>
                    </div>

                    <div className='p-2 flex w-full justify-between text-white'>
                        <img className='h-10 w-10 object-cover rounded-full' src={UserImg} alt="" />
                        <div className='w-full flex flex-col ml-2'>
                            <div className='font-bold'>Lexi</div>
                            <span className='text-xs'>Hello Babe!</span>
                        </div>
                    </div>

                    
                </div>
            </div>

            {/* Messages */}
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
        </div>
    </div>
  )
}

export default Home
