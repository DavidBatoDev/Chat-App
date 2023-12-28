import React, { useState, useEffect } from 'react'
import UserImg from '/lexi.jpg'
import {auth} from '../Firebase'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../context/AuthProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../Firebase';
import Search from './Search';

const Sidebar = () => {
    const {currentUser} = useAuthContext()
    const navigate = useNavigate()

    const [chats, setChats] = useState([])

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, 'usersChats', currentUser.uid), (doc) => {
                setChats(doc.data())
            });

            return () => {
                unsub()
            }
        }

        currentUser.uid && getChats()
    }, [currentUser.uid])

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
            {chats && Object.entries(chats)?.map(chat => (
            <div key={chat[0]} className='p-2 flex w-full justify-between text-white cursor-pointer hover:bg-slate-800'>
                <img src={chat[1].userInfo.photoURL} className='h-10 w-10 object-cover rounded-full' alt="" />
                <div className='w-full flex flex-col ml-2'>
                    <div className='font-bold'>{chat[1].userInfo.displayName}</div>
                    <span className='text-xs'>Hello!</span>
                </div>
            </div>
            ))
            }
        </div>
    </div>
  )
}

export default Sidebar
