import React, {createContext, useContext, useReducer} from 'react'
import { useAuthContext } from './AuthProvider'

const ChatContext = createContext()

export const useChatContext = () =>  useContext(ChatContext)

const initialState = {
    user: {},
    chatId: 'qxdYUpGn6DNwJNUHpCeOh83FgA92U5DM4mw3U8SQfFJOklyo1G8HIPk1'
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


    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}

