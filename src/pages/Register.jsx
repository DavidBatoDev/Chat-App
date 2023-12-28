import React, { useState } from 'react'
import CollectionsIcon from '@mui/icons-material/Collections';
import {auth, storage, db} from '../Firebase'
import {doc, setDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom"

const Register = () => {
    const [error, setError] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
  
    const handleSubmit = async e => {
        e.preventDefault()
        setError(false)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(res.user, {
                        displayName: displayName,
                        photoURL: downloadURL
                    })
                    await setDoc(doc(db, 'users', res.user.uid), {
                        uid: res.user.uid,
                        displayName: displayName,
                        email: email,
                        photoURL: downloadURL
                    })
                    await setDoc(doc(db, 'usersChats', res.user.uid), {})
                });
            }
        );
        navigate('/')
        } catch (error) {
            setError(true)
        }
    }

  return (
        <div className="w-screen form-container bg-primary-color h-screen bg-slate-500 flex items-center justify-center font-sans">
        <div className="form-wrapper bg-white p-8 rounded-lg flex flex-col gap-4 items-center w-96 border border-slate-300 shadow-2xl">
            <span className="logo text-secondary-color font-bold text-2xl">
            Hey {displayName ? displayName : 'Chat'}!
            </span>
            <span className="title text-secondary-color font-bold text-base">Register</span>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-60">
            <label htmlFor="displayName" className="hidden">
                Display Name
            </label>
            <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
                type="text"
                id="displayName"
                placeholder="Display Name"
                className="input-style p-3 border border-slate-400 rounded-lg"
            />
            <label htmlFor="email" className="hidden">
                Email
            </label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="Email"
                className="input-style p-3 border border-slate-400 rounded-lg"
            />
            <label htmlFor="password" className="hidden">
                Password
            </label>
            <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
                placeholder="Password"
                className="input-style p-3 border border-slate-400 rounded-lg"
            />
            <input
                required
                onChange={(e) => setFile(e.target.files[0])}
                name="file"
                style={{ display: 'none' }}
                type="file"
                id="file"
            />
            <label htmlFor="file" className="flex items-center gap-4 text-accent-color cursor-pointer">
                {file ? (
                <img src={URL.createObjectURL(file)} alt="Preview" className="h-10 w-10 object-cover rounded-full" />
                ) : (
                <CollectionsIcon className="file-icon text-secondary-color text-2xl" />
                )}
                <span>Add an avatar</span>
            </label>
            <button type='submit' className="pt-2 bg-accent-color text-black border border-slate-400 px-4 py-2 font-bold cursor-pointer rounded-3xl">
                Sign Up
            </button>
            {error && <p className="text-secondary-color text-xs">Something went wrong</p>}
            </form>
            <p className="text-secondary-color text-xs mt-2">
            You do have an account? <Link to='/login'>Login</Link>
            </p>
        </div>
        </div>

  )
}

export default Register
