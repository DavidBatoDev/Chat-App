import React, {createContext, useContext, useEffect, useState} from 'react'
import {auth} from '../Firebase'
import { onAuthStateChanged } from 'firebase/auth'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null)
    
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user)
            } else {
                setCurrentUser(null)
            }
        })

        return () => {
            unsub()
        }

    }, [])
    
    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
