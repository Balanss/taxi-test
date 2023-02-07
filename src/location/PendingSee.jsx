import React, {useRef,useEffect,useState} from 'react'
import { collection, addDoc,deleteDoc,doc,setDoc ,updateDoc} from 'firebase/firestore'
import correct from "../Image/untitled.mp3"
import{db} from "../Firebase.jsx"




export default function DriversSee({driver}) {

  

  

  
  
  
    return (
        <div>
        <br />
          <p> lat : {driver.lat} , lng : {driver.lng}  </p>     
         
          
      </div>
    )
  }
  

