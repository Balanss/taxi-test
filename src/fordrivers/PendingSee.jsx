import React, {useRef,useEffect,useState} from 'react'
import { collection, addDoc,deleteDoc,doc,setDoc ,updateDoc} from 'firebase/firestore'
import correct from "../Image/untitled.mp3"
import{db} from "../Firebase.jsx"




export default function DriversSee({driver}) {

  

  

  function handleClick () {
  
    deleteDoc(doc(db, "pending",driver.id));

    // const docRef = doc(db,"test",userCall.id);
    // const payload = { info:'send check' }
    // updateDoc(docRef,payload)
  }
  
  
  
    return (
        <div className='admin-client-see'>
        <br />
          <p> {driver.name} </p>
          {/* <p> {driver.To} </p>
          <p> {driver.pickup} </p>
          <p>{driver.distance}</p>
          <p> {driver.duration}</p> */}
          <p>{driver.status}</p>
          <button onClick={handleClick}> delete </button>
      </div>
    )
  }
  

