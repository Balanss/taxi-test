import React from 'react'
import {Link}   from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
import { auth} from "../Firebase"




const Navbar =({user,admin,riders,manager}) => {

  const navigate = useNavigate()

  const handleLogout = () => {
    auth.signOut().then(() =>{
      navigate('/login')
    })
  }

  




if ( admin || manager ) {
  
  return (
    <div className="nav">

{admin&& <> 

<Link className='nav-link' to='/admin'>admin</Link>
<div className='logged-in'>
<p> logged in as {admin}</p>
<button className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</button>
</div>

</>}

{manager&& <> 
<Link className='nav-link' to='/admin'>admin</Link>
<Link className='nav-link' to='/driver'>driver</Link>
<div className='logged-in'>
<p> logged in as {manager}</p>
<button className='navlink navlinklogout'
                     onClick={handleLogout}>LOGOUT</button>
</div>

</>}





{!admin && !riders && !manager &&<> 
<Link className='nav-link' to='/login'>login</Link>
<Link className='nav-link' to='/signup'>signup</Link>
</>}
 

    </div>

    
  )

} else if (riders){
  {riders&& <> 
 
    <Link className='nav-link' to='/driver'>driver</Link>
    <div className='logged-in'>
    <p> logged in as {riders}</p>
    <button className='navlink navlinklogout'
                         onClick={handleLogout}>LOGOUT</button>
    </div>
    
    </>}
}


}


export default Navbar;

