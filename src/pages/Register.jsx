import React from 'react'

const Register = () => {
  return (
    <div className='form-container'>
        <div className='form-wrapper'>
            <span className='logo'>Hey {displayName ? displayName + '!' : 'Chat!'}</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name"></label>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} required type="text" id='displayName' placeholder='display name'/>
                <input value={email} onChange={e => setEmail(e.target.value)} required type="email" placeholder='email'/>
                <input value={password} onChange={e => setPassword(e.target.value)} required type="password" placeholder='password'/>
                <input 
                  required 
                  onChange={e => setFile(e.target.files[0])}
                  name='file' 
                  style={{display:'none'}} 
                  type="file" id="file" />
                <label htmlFor="file">
                    {file ?
                    <img src={URL.createObjectURL(file)} alt="Preview" />
                    : <CollectionsIcon className='file-icon' />
                    }
               <span>Add an avatar</span>
                </label>
                <button>Sign Up</button>
                {error && <p>Something went wrong</p>}
            </form>
            <p>You do have an account? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register
