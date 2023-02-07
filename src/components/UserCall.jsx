import React from 'react'
import { useState , useEffect , useRef} from 'react'
import correct from "../Image/untitled.mp3"
import Draggable from 'react-draggable';
import { collection, addDoc,deleteDoc,doc,updateDoc,setDoc} from 'firebase/firestore'
import{db} from "../Firebase.jsx"
import Pending from '../fordrivers/Pending'








export default function UserCall({userCall}) {

const [number, setNumber ] = useState('')
 const soundEl = useRef(null)

 const [ name, setName ] = useState('')







const attemptPlay = () => {
  soundEl &&
    soundEl.current &&
    soundEl.current.play().catch(error => {
      console.error("Error attempting to play", error);
    });
   
};

useEffect(() => {
  attemptPlay();
}, []);
  
  return (
      <div className='admin-see'>

        <input type='number' className='driver-number' placeholder='driver-number' defaultValue={number} onBlur={(e) => setNumber(e.target.value)} />

      
    </div>



  )
}


