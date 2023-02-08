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

const admin = GetCurrentUser();

function GetCurrentManager(){
  const [user, setUser]=useState(null);
  useEffect(()=>{
      auth.onAuthStateChanged(user=>{
          if(user){
               fs.collection('manager').doc(user.uid).get().then(snapshot=>{
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

const manager = GetCurrentManager();
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
  


const [markers, setMarkers] = useState([])
const [ deleteMarkers, setDeleteMarkers ] = useState("")


const LngResult = () => local.map((local,i) => 
  (<div key={i}>

<h2  onClick={() => { setDeleteMarkers(local.id) }}>{local.number} </h2> 
  <button onClick={(e) =>{  deleteDoc(doc(db, "place",local.id))}}> remove    </button>  
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
  
  
     }}  >  <a href='https://balanss.github.io/taxi-test/#/d1'   target="_blank" rel="noreferrer"  > Accept Route</a></button>
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


console.log(admin)
//add settimeout back to homepage
   
   if(!isLoaded){
    return <div> loading .... </div>
  
  } if (isLoaded && (manager) || (admin)) {

    return (<>
      <div className='admin-side'>
        <Navbar admin={admin} manager={manager} />
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
     {local.map((local,i) => (
    <Marker 
    key={i}
    position = {{lat:local.lat,lng:local.lng}}
    label="yello"/>
  
   ))}
   
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
  
    
  
         </GoogleMap>
        <div className='driverLocal'> 
        <LngResult />
         </div>
        </div>
         
       
         <audio 
          src={correct}
          ref={soundEl}
          muted
         
          > sound</audio>
  
        </div>
       
       
     
        </div>
      
    </>)
  } else if (!admin){ return null}



  
  

}


