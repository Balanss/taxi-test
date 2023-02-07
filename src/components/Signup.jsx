import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { auth, fs } from '../Firebase'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';



export default function Signup() {
    const [fullName,setFullName] = useState("")
const [email,setEmail] = useState("")
const [password,setPassword] = useState('')
const [ number,setNumber] = useState('')

const [ errorMsg,setErrorMsg ] = useState('')
const [successMsg,setSuccessMsg] = useState('')
const navigate = useNavigate()
 // WATCH OUT THIS LINE FOR RIDER DB ATM!
const handleSubmit = (e) => {
  e.preventDefault()

  auth.createUserWithEmailAndPassword(email, password).then((credentials) => {

fs.collection("rider").doc(credentials.user.uid).set({
  FullName:fullName,
  Email:email,
  Password:password,
  Number:Number(number),
}).then(() => {
  setSuccessMsg("signup successful ")
  setFullName("");
  setEmail("")
  setPassword("")
  setErrorMsg("")
  setTimeout(() => {
    setSuccessMsg("");
    navigate("/")
  },3000)
}).catch((error) =>setErrorMsg(error.message))
  }).catch((error) => {
    setErrorMsg(error.message)
  })
}


  return (
    <>
    
    <div className="form-navbar" >
    <Link className='homeIcon'  to='/'> home </Link>
</div>
  <form className='form-signup' onSubmit={handleSubmit}>
    <div className='divsignup' >
      <h3 className='signup-text'>Please sign up for a account </h3>
    <input type='email' placeholder='Email' className="input-signup" onChange={(e) => setEmail(e.target.value)} value={email} required />
  <div>  <input type='text' placeholder='Full Name' className="input-signup" onChange={(e) => setFullName(e.target.value)}  value={fullName} maxLength="12" required /> </div>
      <input type='text' placeholder='Password' className="input-signup" onChange={(e) => setPassword(e.target.value)} value={password} required />
      <input type='text' placeholder='Number' className="input-signup" onChange={(e) => setNumber(e.target.value)} value={number} required />
  <div className="btnsetsignup">  <button className="btn-signup" variant="contained" color="success"> signup</button>
<div  className='signup-logIn'>  <Link className='notextdec'  to='/login'> log in </Link> </div>
   </div>


      </div>
      <div className='signupmsg'>
      {errorMsg&& <>
      <div className='errorsignmsg'> Email already exists
      </div> </>}

      {successMsg&& <>
      <div className='successsignmsg'> {successMsg} 
      </div> </>}

      </div>
    

      </form>



  
    
    
    </>
  )
}
