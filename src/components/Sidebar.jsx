import React from 'react'
import UserImg from '/lexi.jpg'
import {auth} from '../Firebase'
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuthContext } from '../context/AuthProvider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
    const {currentUser} = useAuthContext()
    console.log(currentUser)
    const navigate = useNavigate()

    // For the search functionality

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
        <div className=' flex w-full h-14 p-2 bg-slate-700'>
            <input 
                className='border-b-2 border-slate-800 w-full h-10 text-sm p-2 outline-none text-white placeholder:text-white bg-transparent' type="text" placeholder='Search User' 
            />
        </div>

        {/* Chats */}
        <div className='flex flex-col h-full w-full bg-slate-700'>

            <div className='p-2 flex w-full justify-between text-white'>
                <img className='h-10 w-10 object-cover rounded-full' src={UserImg} alt="" />
                <div className='w-full flex flex-col ml-2'>
                    <div className='font-bold'>Lexi</div>
                    <span className='text-xs'>Hello Babe!</span>
                </div>
            </div>
    
        </div>
    </div>
  )
}

export default Sidebar
