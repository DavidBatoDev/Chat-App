import React, {useEffect, useState} from 'react'
import { useAuthContext } from '../context/AuthProvider';
import { db } from '../Firebase';
import {collection, setDoc, getDocs, getDoc, updateDoc, doc, query, where, serverTimestamp } from 'firebase/firestore'
import handleKey from '../utils/handleKey';
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const {currentUser} = useAuthContext()
    const [username, setUserName] = useState('')
    const [users, setUsers] = useState([])
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (username === '') {
            setUsers([])
        }
    }, [username])

    const searchUser = async () => {
        const usersRef = collection(db, 'users')
        const q = query(usersRef, where("displayName", "==", username));
        
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach(doc => {
                setUsers(prevUsers => [...prevUsers, doc.data()])
            })

            if (!querySnapshot.docs[0]) {
                setError(true)
                setErrorMessage("No user named " + username)
                setTimeout(() => {
                    setError(false)
                    setErrorMessage('')
                }, 3000)
            }
        } catch(error) {
            console.log(error.message)
        }
    }

    const handleSelect = async (user) => {
        const mergedIds = currentUser.uid > user.uid 
                        ? currentUser.uid + user.uid
                        : user.uid + currentUser.uid;
        try {
            const res = await getDoc(doc(db, 'chats', mergedIds))
            // exists, a firebase method to chech if it exist
            if (!res.exists()) {
                // create chat in chats collection
                await setDoc(doc(db, 'chats', mergedIds), {messages: []})

                // create userChats in userChats collection using this structure:
                // userChats: {
                //     DavidId: {
                //         mergedIds: {
                //             userInfo:{
                //                 displayName,
                //                 photoURL,
                //                 uid
                //             }
                //             lastMeesage: ""
                //             date: firebaseServerStamp()
                //         }
                //     }
                // }

                await updateDoc(doc(db, 'usersChats', currentUser.uid), {
                    [mergedIds+'.userInfo']: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [mergedIds+'.date']: serverTimestamp(),
                    [mergedIds+'.lastMessage']: '',
                })

                await updateDoc(doc(db, 'usersChats', user.uid), {
                    [mergedIds+'.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [mergedIds+'.date']: serverTimestamp(),
                    [mergedIds+'.lastMessage']: '',
                })
                setUsers([])
                setUserName('')
            } 
        } catch (error) {
            alert(error.message)
        }
    }

  return (
    <div className=' flex flex-col w-full h-max bg-slate-700 pt-2'>
        <div className='flex items-center'>
            <input 
                onKeyDown={e => handleKey(e, searchUser)}
                value={username}
                onChange={e => setUserName(e.target.value)}
                className='w-full h-10 text-sm p-2 outline-none text-white placeholder:text-white bg-transparent' type="text" placeholder='Search User' 
            />
            <SearchIcon className='cursor-pointer text-slate-300' onClick={searchUser}/>
        </div>
        <p className='text-xs flex text-slate-300 justify-center w-full'>{error ? errorMessage : ""}</p>
        {users ?
            <div className='border-b-2 w-full border-slate-600'>
                {users.map(user => (
                    <div key={user.uid} onClick={() => handleSelect(user)} className='cursor-pointer hover:bg-slate-800 p-2 flex w-full items-center gap-2 text-white'>
                        <img src={user.photoURL} className='h-10 w-10 object-cover rounded-full' alt="" />
                        <div className='font-bold'>{user.displayName}</div>
                    </div>
                ))}
            </div>
        : ""} 

    </div>
  )
}

export default Search
