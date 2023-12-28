import React, { useEffect, useState } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendIcon from '@mui/icons-material/Send';
import { useChatContext } from '../context/ChatProvider';
import {Timestamp, arrayUnion, doc, onSnapshot, serverTimestamp, updateDoc} from 'firebase/firestore'
import {db, storage} from '../Firebase'
import Message from './Message';
import { nanoid } from 'nanoid';
import { useAuthContext } from '../context/AuthProvider';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import CollectionsIcon from '@mui/icons-material/Collections';

const Conversation = () => {
    const {currentUser} = useAuthContext()
    const {data} = useChatContext()

    const [messages, setMessages] = useState([])


    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub()
        }
    }, [data.chatId])


    // Input functionality
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const handleSend = async() => {
        if (img) {
            const storageRef = ref(storage, nanoid())
            const uploadTask = uploadBytesResumable(storageRef, img)
            uploadTask.on('state_changed', 
                (snapshot) => {
                    console.log('img, uploaded')
                }, 
                (error) => {
                    console.log(error.message)
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                         await updateDoc(doc(db, 'chats', data.chatId), {
                             messages: arrayUnion({
                                 id: nanoid(),
                                 text,
                                 senderId: currentUser.uid,
                                 data: Timestamp.now(),
                                 img: downloadURL
                             })
                         })
                    });
                }
            )
            setText('')
            setImg('')
        } else {
            await updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                    id: nanoid(),
                    text,
                    senderId: currentUser.uid,
                    data: Timestamp.now()
                })
            })
            setText('')
            setImg('')
        }

        await updateDoc(doc(db, 'usersChats', currentUser.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp()
        })

        await updateDoc(doc(db, 'usersChats', data.user.uid), {
            [data.chatId + '.lastMessage']: {
                text,
            },
            [data.chatId + '.date']: serverTimestamp()
        })

        setText('')
        setImg(null)
    }

    return (
        // UserInfo
        <div style={{flex: '2'}} 
            className='bg-slate-300 flex flex-col w-full'>
            <div className='flex justify-between items-center h-20 text-white bg-slate-800 p-2'>
                <div>{data.user?.displayName}</div>
                <MoreHorizIcon />
            </div>

            {/* Messages */}
            <div style={{height: 'calc(100% - 128px)'}} 
                className='flex flex-col gap-3 bg-slate-400 p-3 overflow-y-scroll'>
                {messages ?
                messages.map(message => (
                    <Message key={message.id} message={message}/>
                ))
                : 
                <div className='flex text-3xl font-bold'>
                    Getting lonely right here... Send a chat!
                </div>
                }
            </div>

            {/* Input */}
            <div className='flex items-center h-16 w-full bg-white p-2'>
                <div className='h-full w-full p-2'>
                    <textarea value={text} onChange={e => setText(e.target.value)} className='outline-none flex items-center h-full w-full resize-none' placeholder='Type Message'></textarea>
                </div>
                <div className='flex gap-3'>
                    <label className='cursor-pointer' htmlFor="img">
                        <CollectionsIcon className='text-slate-800' />
                    </label>
                    <input style={{display: 'none'}} onChange={e => setImg(e.target.files[0])} type="file" name='img' id='img' />
                    <SendIcon onClick={handleSend} className='text-slate-800 cursor-pointer'/>
                </div>
            </div>
        </div>

    )
}

export default Conversation
