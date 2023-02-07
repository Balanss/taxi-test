import React from 'react'
import {auth}  from '../Firebase'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export default function LoginAnon() {
    const signin = () => {

        auth.signInAnonymously().catch(alert)
      
      };
      
      
      return (
      
          <div className="anonlogdiv">  <button className="anonlog"
                        onClick={signin} >Continue as guest  </button>
                 </div>
      
        )
      }
