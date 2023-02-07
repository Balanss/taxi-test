import React from 'react'
import { GoogleMap, useLoadScript,Marker, DirectionsRenderer, Autocomplete,} from "@react-google-maps/api";
import { useRef, useState,useEffect } from 'react'
import{db} from "../Firebase.jsx"
import Navbar from './Navbar';
import { collection, addDoc,} from 'firebase/firestore'
import UserCall from './UserCall.jsx';
import test from './UserCall.jsx';

export default function Map () {

 



    const {isLoaded} = useLoadScript({googleMapsApiKey:import.meta.env.VITE_SOME_GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
       });
       const center = {lat:5.839398,lng:-55.199089}

       
       if(!isLoaded){
        return <div> loading .... </div>
      
      } if (isLoaded) 
     
  return (
    <div className=''>
<GoogleMap zoom={12}
 center={center}
 mapContainerClassName="admin-map ">


</GoogleMap>
    </div>
  )
}
