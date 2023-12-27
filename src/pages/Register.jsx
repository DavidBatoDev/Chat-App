import React, { useState } from 'react'
import CollectionsIcon from '@mui/icons-material/Collections';

const Register = () => {
    const [error, setError] = useState(false)
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
  
  return (
        <div className="w-screen form-container bg-primary-color h-screen bg-slate-500 flex items-center justify-center font-sans">
        <div className="form-wrapper bg-white p-8 rounded-lg flex flex-col gap-4 items-center w-96 border border-slate-300 shadow-2xl">
            <span className="logo text-secondary-color font-bold text-2xl">
            Hey Chat!
            </span>
            <span className="title text-secondary-color font-bold text-base">Register</span>
            <form className="flex flex-col gap-4 w-60">
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
                <img src={URL.createObjectURL(file)} alt="Preview" className="h-9 w-9 rounded-full" />
                ) : (
                <CollectionsIcon className="file-icon text-secondary-color text-2xl" />
                )}
                <span>Add an avatar</span>
            </label>
            <button className="pt-2 bg-accent-color text-black border border-slate-400 px-4 py-2 font-bold cursor-pointer rounded-3xl">
                Sign Up
            </button>
            {error && <p className="text-secondary-color text-xs">Something went wrong</p>}
            </form>
            <p className="text-secondary-color text-xs mt-2">
            You do have an account?
            </p>
        </div>
        </div>

  )
}

export default Register
