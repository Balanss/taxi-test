import React from 'react'
import { useState , useEffect , useRef} from 'react'
import { db , auth ,fs} from '../Firebase'
import Product from './Product'
import Navbar from './Navbar'
import {
    collection,
    getDocs,
onSnapshot,query,orderBy,serverTimestamp,deleteDoc,doc,addDoc
  } from "firebase/firestore";

 import { GoogleMap, useLoadScript,Marker, DirectionsRenderer, Autocomplete,} from "@react-google-maps/api";
 import Pending from '../fordrivers/Pending'
 import correct from "../Image/untitled.mp3"
 import {Link} from 'react-router-dom'




//newer version of using cloud db
export default function Admin() {




  // getting current user uid
  function GetUserUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            }
        })
    },[])
    return uid;
}

const uid = GetUserUid(); // ignore errror
// getting current user function
function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                 fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().FullName);
                 })
            } 
            if(user){
              fs.collection('admin').doc(user.uid).get().then(snapshot => {
                setUser(snapshot.data().FullName);
              })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
}

const user = GetCurrentUser();
 //console.log(user);

  
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




/////////


 const [ test, setTest] = useState([])
// queries
const q = query()
useEffect(() => {
    const getTest = async () => {
      const colRef =(collection(db, 'test'));
       const q = query(colRef,orderBy("timestamp",'desc'));
      onSnapshot(q, (snapshot) => {
        setTest(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }
    getTest()
  }, [])

  

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


  function handleDel({}){
    deleteDoc(doc(db, "place",deleteMarkers))
  }
  

  


const [markers, setMarkers] = useState([])
const [ deleteMarkers, setDeleteMarkers ] = useState("")

 const LngResult = () => driver.map(driver => (<div>
<input value='click here' onClick={(e) => {setMarkers((current) => [...current, {
  lat:driver.lat,
  lng:driver.lng,
  
  time:new Date(),
}])}} /> 
  <button onClick={(e) => setDeleteMarkers(driver.id)}> remove    </button>  
 </div> ))
 

 const [number, setNumber ] = useState('')
 const soundEl = useRef(null)
 const [ name, setName ] = useState('')
 const [startLocation,setStartLocation] = useState ([])
 const [endLocation,setEndLocation] = useState ([])
 const [state, setState] = useState(-1);
// 



const Dest = () => test.map((test, index)  =>  ( <div key={index}    >
  
  <form  onClick={() => setState(index)}
    style={{
      background: state === index ? 'salmon' : 'ghostwhite'
    }}>
  
  <p> Name: {test.name}</p>
  <p> Number: {test.number}</p>
  <p> From : {test.start}</p>
  <p> To : {test.end}</p>
  <p> Avg duration : {test.duration}</p>
  <p> Distance : {test.distance}</p>
  <p> status : {test.status} </p>
  <button  onClick={(e,id) => {setStartLocation(test.start);  setEndLocation; (test.end); 
   const col=collection(db,"driver") // cant be driver
   addDoc(col, {
     nameDispatch:test.name,
     numberDispatch:test.number,
     pickupDispatch: test.start,
     ToDispatch:test.end,
     distanceDispatch:test.distance,
     durationDispatch:test.duration,
     statusDispatch:'client waiting',
   })
  
  
     }}  >  <a href='http://localhost:3000/?#/d1'   target="_blank" rel="noreferrer"  > Accept Route</a></button>
        <button  onClick={(e) => {deleteDoc(doc(db, "test",test.id))}}> delete </button>
  </form>
  
</div>))





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




   
   if(!isLoaded){
    return <div> loading .... </div>
  
  } if (isLoaded) 



  return (<>
    <div className='admin-side'>
      <Navbar user={user} />
      <div className='split'>
        


<div className='rides'> 
<div className='admin-see'>
<Dest />

<Pending />   
</div>
 <input className='hide' id='input' type="text" placeholder='from'  ref={originRef} defaultValue={startLocation}  /> 
       <input className='hide' type="text" placeholder='to'  ref={destiantionRef}  defaultValue={endLocation} /> 
  


 
       </div> 
       
      <div className='map-and-markers'>
      <GoogleMap id="map"
       zoom={12}
 center={center}
 mapContainerClassName="map-container" >
 {markers.map((marker) => (
  <Marker 
  key={marker.time.toISOString()} 
  position = {{lat:marker.lat,lng:marker.lng}}/>
 ))}
 <Marker />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}

  

       </GoogleMap>
      <div className='driverLocal'> 
       <LngResult />
       <button onClick={handleDel}> del marker on map</button> </div>
      </div>
       
     
       <audio 
        src={correct}
        ref={soundEl}
        muted
       
        > sound</audio>

      </div>
     
     
   
      </div>
    
  </>)
  

}


