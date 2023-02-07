import React from 'react'
import {auth} from '../Firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import App from '../App';

export default function Anon() {



 
function Anon() {
    const [userAnon] = useAuthState(auth);

    
  
  
  
  if(userAnon) {
    return  ( <>  <App />   </> )
  } else if (!userAnon){
    return (<>  <App /> </>)
  }
  
    return (<>
  
    </>);
  }
}
