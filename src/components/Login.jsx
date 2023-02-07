import React from 'react'
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'
import { auth, fs } from '../Firebase'
import { useNavigate } from 'react-router-dom'

export default function Login() {

const [ email,setEmail] = useState('')
const [ password,setPassword] = useState("")
const navigate = useNavigate()
const [ errorMsg,setErrorMsg ] = useState('')
const [successMsg,setSuccessMsg] = useState('')


const handleSubmit = (e) =>{
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password).then(() => {
      setSuccessMsg("Signup successful, you will be redirected to Home page!!")
      setEmail("")
      setPassword("")
      setErrorMsg("")
      setTimeout(() => {
        setSuccessMsg("");
        navigate("/")
      },3000)
    }).catch(error => setErrorMsg(error.message))
  
  }


  return (<>  <div>
    <Link   to='/'> return to home </Link>
</div>

<form className="form-login" onSubmit={handleSubmit}>
        <h3> Please log in to your existing account </h3>
      <div>

    <div>  <input type='email' placeholder='Email'  className="input-login" onChange={(e) => setEmail(e.target.value)} value={email} required /> </div>
    <div>  <input type='text' placeholder='Password' className="input-login" onChange={(e) => setPassword(e.target.value)} value={password} required /> </div>
    <div className="btnLogin">
      <button className='btn-login'> LOGIN</button>
<div className='login-signup'>  <Link className='logindec'to='/Signup'>SIGNUP</Link> </div>
</div>

        </div>


        <div className='loginmsg'>
                {successMsg&& <>
                <p > {successMsg}
                </p> </>}
                </div>

                <div className='loginmsg'>
                {errorMsg&& <>
                <div> Invalid email or password
                </div> </>}
                </div>

        </form>



  </>
   
  )
}
