import React, { useState, useEffect } from 'react'
import {auth} from '../Firebase'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../context/AuthProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../Firebase';
import Search from './Search';
import { useChatContext } from '../context/ChatProvider';

const Sidebar = () => {
    const {currentUser} = useAuthContext()
    const navigate = useNavigate()


    // Chats functionality
    const [chats, setChats] = useState([])
    const {dispatch} = useChatContext()

    useEffect(() => {
        const getChats = () => {
            if (currentUser && currentUser.uid) {
                const unsub = onSnapshot(doc(db, 'usersChats', currentUser.uid), (doc) => {
                    setChats(doc.data());
                });
    
                return () => {
                    unsub();
                };
            }
        };
    
        getChats();
    }, [currentUser]);

    const handleSelect = (user) => {
        dispatch({
            type: 'CHANGE_USER',
            payload: user
        })
    }

    // Navigation functionality
    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('login')
          }).catch((error) => {
            alert(error.message)
          });
    }

  return (
    <div className='relative flex-1 flex flex-col'>
        {/* Nav */}
        <div className='flex items-center h-16 bg-slate-200'>
            <div className='flex w-full justify-between items-center p-1'>
                <div className={`text-slate-700 hidden sm:flex font-bold`}>Hey Chat!</div>
                <div className='flex items-center gap-1'>
                    <img className='h-8 w-8 object-cover rounded-full' src={currentUser.photoURL ? currentUser.photoURL : <AccountCircleIcon />} alt="" />
                    <p className='pr-2 font-semibold text-md'>{currentUser.displayName}</p>
                    <LogoutIcon onClick={handleSignOut} className='cursor-pointer text-slate-500'/>
                </div>
            </div>
        </div>

        {/* Search */}
        <Search />

        {/* Chats */}

        <div className='flex flex-col h-full w-full bg-slate-700'>
            {chats && Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map(chat => (
            <div onClick={() => handleSelect(chat[1].userInfo)} key={chat[0]} className='p-2 flex w-full justify-between text-white cursor-pointer hover:bg-slate-800'>
                <img src={chat[1].userInfo.photoURL} className='h-10 w-10 object-cover rounded-full' alt="" />
                <div className='w-full flex flex-col ml-2'>
                    <div className='font-bold'>{chat[1].userInfo.displayName}</div>
                    <span className='text-xs'>{chat[1].lastMessage?.text}</span>
                </div>
            </div>
            ))
            }
        </div>
    </div>
  )
}

export default Sidebar
