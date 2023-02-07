import React from 'react'
import {Link}   from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { auth} from "../Firebase"
import {useAuthState} from 'react-firebase-hooks/auth';
import LoginAnon from './LoginAnon'



const Navbar =({user}) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() =>{
      navigate('/')
    })
  }

  
  const [userAnon] = useAuthState(auth);






  return (
    <div className="nav">

{user && <> 
  <Link className='nav-link' to='/'>map</Link>  
<Link className='nav-link' to='/admin'>admin</Link>
<Link className='nav-link' to='/Driver'>driver</Link>
<div className='logged-in'>
<p> logged in as {user}</p>
<button className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</button>
</div>

</>}

{!user && <> 
  <Link className='nav-link' to='/'>map</Link>  
<Link className='nav-link' to='/login'>login</Link>
<Link className='nav-link' to='/signup'>signup</Link>
</>}
 

    </div>

    
  )
}


export default Navbar;