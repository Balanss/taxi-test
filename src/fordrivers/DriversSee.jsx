import React, {useRef,useEffect,useState} from 'react'
import { collection, addDoc,deleteDoc,doc,setDoc , updateDoc} from 'firebase/firestore'
import correct from "../Image/untitled.mp3"
import{db} from "../Firebase.jsx"




export default function DriversSee({driver}) {

  

 
  const handleDel =() =>{
       // deleteDoc(docRef)
       deleteDoc(doc(db, "driver",driver.Id));
      console.log(driver.id)
    
     }
  
  
 
  
  
  
    return (
        <div>
        <br />
          <button onClick={handleDel}> delete </button>
      </div>
    )
  }
  

