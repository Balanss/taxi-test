import React from 'react'
import { useState , useEffect , useRef} from 'react'
import { db ,auth,fs} from '../Firebase'
import {
    collection,
    getDocs,
onSnapshot,query,orderBy,serverTimestamp,deleteDoc,doc,addDoc,updateDoc
  } from "firebase/firestore";

 import { GoogleMap, useLoadScript,Marker, DirectionsRenderer, Autocomplete,} from "@react-google-maps/api";




//newer version of using cloud db
export default function D1() {

  
  const {isLoaded} = useLoadScript({googleMapsApiKey:import.meta.env.VITE_SOME_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
   });
   const center = {lat:5.839398,lng:-55.199089}
 

  const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [directionsResponse, setDirectionsResponse] = useState(null)


/** @type React.ImmutableRefObject<HTMLInputElement> */
const originRef = useRef()
/** @type React.MutableRefObject<HTMLInputElement> */
const destiantionRef = useRef()

async function calculateRoute() {
if (originRef.current.value === '' || destiantionRef.current.value === '') {
  return 
}



// eslint-disable-next-line no-undef
const directionsService = new google.maps.DirectionsService()
const results = await directionsService.route({
  origin: originRef.current.value,
  destination: destiantionRef.current.value,
  // eslint-disable-next-line no-undef
  travelMode: google.maps.TravelMode.DRIVING,
})
setDirectionsResponse(results)
setDistance(results.routes[0].legs[0].distance.text)
setDuration(results.routes[0].legs[0].duration.text)

}

// google maps ^ above






  const [ local,setLocal] = useState([])
  useEffect(() => {
    const local = async () => {
      const colRef = (collection(db,'place'))
      onSnapshot(colRef, (snapshot) => {
        setLocal(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }
  local();
  }, [])


  
  function handleDel({}){
    deleteDoc(doc(db, "place",deleteMarkers))
  }
  

  

const [markers, setMarkers] = useState([])
const [ deleteMarkers, setDeleteMarkers ] = useState("")


const A = () => {
  local.map(local => {
    setMarkers((current) => [...current, {
      lat:local.lat,
      lng:local.lng,
      id:local.id,
      time:new Date(),
    }])
  })

  
}



 const LngResult = () => local.map(local => 
  (<div>

<h2  onClick={() => { 
  setMarkers((current) => [...current, {
    lat:local.lat,
    lng:local.lng,
    id:local.id,
    time:new Date(),
  }])

setDeleteMarkers(local.id)
 
}}>{local.lat} </h2> 

  <button onClick={(e) => setDeleteMarkers(local.id)}> remove    </button>  
 </div> ))


   if(!isLoaded){
    return <div> loading .... </div>
  
  } if (isLoaded) 



  return (<>
    <div className='admin-side'>
    
      <div className='split'>
        


<div className='rides'> 
<div className='admin-see'>



</div>

  


 
       </div> 
       
      <div className='map-and-markers'>
      <GoogleMap id="map"
       zoom={12}
 center={center}
 mapContainerClassName="map-container" >
 {local.map((local,i) => (
  <Marker 
  key={i}
  position = {{lat:local.lat,lng:local.lng}}
  label="yello"/>
 ))}
 <Marker />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}


       </GoogleMap>
      <div className='driverLocal'> 
      
    </div>
   <LngResult />
       
  

      </div>
       
    
      </div>
     
     
   
      </div>
    
  </>)
  

}


