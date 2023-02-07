import React from 'react'
import PendingProduct from './PendingProduct'
import { useState , useEffect} from 'react'
import { db} from '../Firebase'
import {
  collection,
onSnapshot,query
} from "firebase/firestore";






export default function Pending() {

  const [ driver,setDriver] = useState([])

  useEffect(() => {
    const driver = async () => {
      const colRef = (collection(db,'pending'))
      onSnapshot(colRef, (snapshot) => {
        setDriver(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }
  driver();
  }, [])



  
    return (
      <div className=''>
    
           <PendingProduct driver={driver} /> 
    

          </div>
    )
  }

  

