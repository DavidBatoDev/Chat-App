import React, {createContext, useEffect, useContext, useReducer} from 'react'
import { useAuthContext } from './AuthProvider'

const ChatContext = createContext()

export const useChatContext = () =>  useContext(ChatContext)

const initialState = {
    user: {},
    chatId: null
}

export function ChatProvider({children}) {
    const {currentUser} = useAuthContext()
    
    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER': {
                return {
                    user: action.payload,
                    chatId: currentUser.uid > action.payload.uid
                        ? currentUser.uid + action.payload.uid
                        : action.payload.uid + currentUser.uid
                }
            }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, initialState)

    useEffect(() => {
        if (currentUser) {
            dispatch({
                type: 'CHANGE_USER',
                payload: currentUser
            });
        }
    }, [currentUser]);


    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}

