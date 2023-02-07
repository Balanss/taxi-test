import React from 'react'
import PendingProduct from './PendingProduct'
import { useState , useEffect} from 'react'
import { db} from '../Firebase'
import {
  collection,
onSnapshot,query
} from "firebase/firestore";






export default function adminLocal() {

  const [ driver,setDriver] = useState([])

  useEffect(() => {
    const driver = async () => {
      const colRef = (collection(db,'place'))
      onSnapshot(colRef, (snapshot) => {
        setDriver(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }
  driver();
  }, [])



  
    return (
      <div>
    
           <PendingProduct driver={driver} /> 
    

          </div>
    )
  }

  

