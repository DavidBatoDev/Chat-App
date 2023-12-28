import React, {useEffect, useRef} from 'react'
import { useAuthContext } from '../context/AuthProvider'
import { useChatContext } from '../context/ChatProvider'

const Message = ({message}) => {
    const {currentUser} = useAuthContext()
    const {data} = useChatContext()

    const ref = useRef()

    useEffect(() => {
        ref.current?.scrollIntoView({behavior:"smooth"})
    }, [message])

    const fromMe = () => {
        if (message.senderId === currentUser.uid) {
            return true
        } else {
            return false
        }
    }

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp * 1000);
        const currentDate = new Date();
        
        const isToday = date.getDate() === currentDate.getDate() &&
                        date.getMonth() === currentDate.getMonth() &&
                        date.getFullYear() === currentDate.getFullYear();
      
        let formattedTime;
      
        if (isToday) {
          let hours = date.getHours();
          const amPm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12; // Convert to 12-hour format
          const minutes = ('0' + date.getMinutes()).slice(-2);
          formattedTime = `${hours}:${minutes} ${amPm}`;
        } else {
          const year = date.getFullYear();
          const month = ('0' + (date.getMonth() + 1)).slice(-2);
          const day = ('0' + date.getDate()).slice(-2);
          formattedTime = `${year}-${month}-${day}`;
        }
      
        return formattedTime;
      }
      
      
    return (
        <div ref={ref} className={`flex gap-5 ${fromMe() && 'flex-row-reverse'}`}>
            <div className='flex flex-col items-center'>
                <img src={fromMe() ? currentUser.photoURL : data.user.photoURL} className='w-10 h-10 rounded-full object-cover' alt="" />
                <span className='text-xs text-slate-600'>
                    {formatTimestamp(message.data.seconds)} 
                </span>
            </div>
            <div className={`flex flex-col text-white max-w-AT gap-3 ${fromMe() && 'items-end'}`}>
                <p 
                className={`bg-white text-black pt-2 pb-2 pl-3 pr-3
                rounded-tr-lg rounded-bl-lg rounded-br-lg w-max
                ${fromMe() && ' bg-gray-800 text-white rounded-tr-none rounded-tl-lg rounded-bl-lg rounded-br-lg'}
                `}>
                    {message.text}
                </p>
                {message.img && <img className='w-1/2 object-cover' src={message.img} alt='image' />}
            </div>
        </div>
    )
}

export default Message
