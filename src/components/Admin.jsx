import React from 'react'
import { useState , useEffect , useRef} from 'react'
import { db , auth ,fs} from '../Firebase'
import Navbar from './Navbar'
import {collection,getDocs,onSnapshot,query,orderBy,serverTimestamp,deleteDoc,doc,addDoc,updateDoc} from "firebase/firestore";
 import { GoogleMap, useLoadScript,Marker, DirectionsRenderer, Autocomplete,} from "@react-google-maps/api";




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


// /** @type React.ImmutableRefObject<HTMLInputElement> */
// const originRef = useRef()
// /** @type React.MutableRefObject<HTMLInputElement> */
// const destiantionRef = useRef()

let destRef = useRef()
let inputRef= useRef()

async function calculateRoute() {
if (inputRef.current.value === '' || destRef.current.value === '') {
  return 
}

 

// eslint-disable-next-line no-undef
const directionsService = new google.maps.DirectionsService()
const results = await directionsService.route({
  origin: inputRef.current.value,
  destination: destRef.current.value,
  // eslint-disable-next-line no-undef
  travelMode: google.maps.TravelMode.DRIVING,
})
setDirectionsResponse(results)
setDistance(results.routes[0].legs[0].distance.text)
setDuration(results.routes[0].legs[0].duration.text)
setClientAddress(inputRef.current.value)
setClientDest(destRef.current.value)

}

// google maps ^ above







 const [ drivers, setDrivers] = useState([])
// queries
const q = query()
useEffect(() => {
    const getDrivers = async () => {
      const colRef =(collection(db, 'drivers'));
       const q = query(colRef,orderBy("timestamp",'desc'));
      onSnapshot(q, (snapshot) => {
        setDrivers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      })
    }
    getDrivers()
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
const [clientName,setClientName] = useState('') 
const [ clientNumber, setClientNumber] = useState()
const [ clientAddress, setClientAddress ] = useState('')
const[clientDest, setClientDest] = useState('')




const AutoComplete = () => {
  const autoCompleteRef = useRef()
  inputRef = useRef()
  const options = {
    componentRestrictions: { country: "sr" },
  };
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
     );
  },[])
  return (
    <div className='displayflex'> 
      <input type="text" className='client-input' placeholder="Enter Name" onMouseLeave={(e) => setClientName(e.target.value)} defaultValue={clientName} />
      <input type='number' className='client-input' placeholder="Enter Number" onMouseLeave={(e) => setClientNumber(e.target.value)} defaultValue={clientNumber} /> 
      <input id='input' className='client-input' type="text" placeholder='from' defaultValue={clientAddress}  ref={inputRef}  onBlur={(e) =>setClientAddress (e.target.value) }/>
     
     </div>
   
   )
}



const AutoCompleted = () => {
  const autoCompleteRef = useRef();
  destRef = useRef();
  const options = {
   componentRestrictions: { country: "sr" },
  };
  useEffect(() => {
   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    destRef.current,
    options
   );
  }, []);
  return (
   <div>
    <input type="text" className='client-input' placeholder='to'  ref={destRef} defaultValue={clientDest} onBlur={(e) => setClientDest(e.target.value) }   />
    <input type='text'  className='client-input' placeholder='driver number' defaultValue={number} onMouseLeave={(e) => setNumber(e.target.value)} />
   </div>
  );
 };


 function clearRoute() {
  setDirectionsResponse(null)
  setDistance('')
  setDuration('')
  setClientName('')
  setClientNumber('')
  inputRef.current.value = ''
  destRef.current.value = ''
}

function confirmRoute() {
  const colRef=collection(db,"drivers")
  addDoc(colRef, {
    name:clientName,
    start:clientAddress,
    end:clientDest,
    distance:distance,
    duration:duration,
    number:clientNumber,
    client:uid,
    status:'Awaiting driver',
    ndriver:Number(number),
    timestamp:serverTimestamp()
  })
}


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
  
 

<form className='form-admin' onClick={(e) => e.preventDefault()}>
<AutoComplete />
<AutoCompleted />
<button onClick={calculateRoute} > Check distance </button>
 <button onClick={confirmRoute} > send to driver </button> 
<button onClick={clearRoute}> del route </button>
{drivers.map((driver,i) => ( <div className='divclientstatus'>
 <p> status : {driver.status}</p>
 <p> client name : {driver.name} </p>
 <button onClick={() => {deleteDoc(doc(db,'drivers',driver.id))}}> remove ride </button>
</div>))}
<div className='client-span'>
    <p>Distance: {distance}</p>
    <p> Duration:{duration}</p>
    </div>
</form>
  </div>
         </div> 
         
        <div className='map-and-markers'>
        <GoogleMap id="map"  zoom={12} center={center}  mapContainerClassName="map-container" >
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
        </div>
       
       
     
        </div>
      
    </>)
  } else if (!admin){ return null}



  
  

}


