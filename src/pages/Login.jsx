import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../Firebase';

const Login = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage)
            });
    }

  return (
        <div className="w-screen form-container bg-primary-color h-screen bg-slate-500 flex items-center justify-center font-sans">
            <div className="form-wrapper bg-white p-8 rounded-lg flex flex-col gap-4 items-center w-96 border border-slate-300 shadow-2xl">
                <span className="logo text-secondary-color font-bold text-2xl">
                Hey Chat!
                </span>
                <span className="title text-secondary-color font-bold text-base">Login</span>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-60">
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
                    <button type='submit' className="pt-2 bg-accent-color text-black border border-slate-400 px-4 py-2 font-bold cursor-pointer rounded-3xl">
                        Sign In
                    </button>
                    {error && <p className="text-secondary-color text-xs">Something went wrong</p>}
                </form>
                <p className="text-secondary-color text-xs mt-2">
                You don't have an account? <Link to='/register'>Register</Link>
                </p>
            </div>
        </div>

  )
}

export default Login
