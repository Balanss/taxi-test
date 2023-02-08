import React from 'react'
import {Link}   from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { auth} from "../Firebase"
import {useAuthState} from 'react-firebase-hooks/auth';
import LoginAnon from './LoginAnon'



const Navbar =({user,admin,riders,manager}) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() =>{
      navigate('/')
    })
  }

  
  const [userAnon] = useAuthState(auth);






  return (
    <div className="nav">

{user&& <> 
  <Link className='nav-link' to='/'>map</Link>  
<div className='logged-in'>
<p> logged in as {user}</p>
<button className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</button>
</div>

</>}

{admin&& <> 
  <Link className='nav-link' to='/'>map</Link>  
<Link className='nav-link' to='/admin'>admin</Link>
<div className='logged-in'>
<p> logged in as {admin}</p>
<button className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</button>
</div>

</>}

{manager&& <> 
  <Link className='nav-link' to='/'>map</Link>  
<Link className='nav-link' to='/admin'>admin</Link>
<Link className='nav-link' to='/d1'>d1</Link>
<Link className='nav-link' to='/driver'>driver</Link>
<div className='logged-in'>
<p> logged in as {manager}</p>
<button className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</button>
</div>

</>}

{riders&& <> 
 
<Link className='nav-link' to='/driver'>driver</Link>
<div className='logged-in'>
<p> logged in as {riders}</p>
<button className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</button>
</div>

</>}



{!user && !admin && !riders && !manager &&<> 
<Link className='nav-link' to='/login'>login</Link>
<Link className='nav-link' to='/signup'>signup</Link>
</>}
 

    </div>

    
  )
}


export default Navbar;