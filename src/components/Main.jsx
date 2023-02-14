import React , {useState,useEffect} from 'react'
import { GoogleMap, useLoadScript,Marker, DirectionsRenderer, Autocomplete,} from "@react-google-maps/api";
import { useRef} from 'react'
import Navbar from './Navbar';
import { db,fs,auth} from '../Firebase'
import {
  collection,
onSnapshot,query,addDoc,deleteDoc,serverTimestamp
} from "firebase/firestore";

import Geocode from "react-geocode";
import { getAuth, onAuthStateChanged } from "firebase/auth";







export default function Main() {
 

  Geocode.setApiKey(import.meta.env.VITE_SOME_GOOGLE_MAPS_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setLocationType("ROOFTOP")




const {isLoaded} = useLoadScript({googleMapsApiKey:import.meta.env.VITE_SOME_GOOGLE_MAPS_API_KEY,
 libraries: ['places'],
});

  // getting current user uid
  function GetUserUid(){
    const [uid, setUid]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                setUid(user.uid);
            } else if (admin){
              setUid(admin.uid);
            }
        })
    },[])
    return uid;
}

const uid = GetUserUid(); // ignore errror


// getting current user function
const [ userNumber, setUserNumber ] = useState(null)
function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                 fs.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().FullName);
                    setUserNumber(snapshot.data().Number);
                    

                    


                 })


            } 
            else{
                setUser(null);
            }
        })
    },[])
    return user;
}



function GetCurrentAdmin(){
  const [user, setUser]=useState(null);
  useEffect(()=>{
      auth.onAuthStateChanged(user=>{
          if(user){
               fs.collection('admin').doc(user.uid).get().then(snapshot=>{
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


function GetCurrentRiders(){
  const [user, setUser]=useState(null);
  useEffect(()=>{
      auth.onAuthStateChanged(user=>{
          if(user){
               fs.collection('rider').doc(user.uid).get().then(snapshot=>{
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

const user = GetCurrentUser();
const admin = GetCurrentAdmin();
const riders = GetCurrentRiders()
const manager = GetCurrentManager();
 






const center = {lat:5.839398,lng:-55.199089}

const [map, setMap] = useState(/** @type google.maps.Map */ (null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [lat,setLat] = useState("")
  const [lon,setLon] = useState("")
  const [content,setContent] = useState("")
  const [ starts, setStarts] = useState("")
  const[end,setEnd] = useState("")
  const [name, setName] = useState("")
  const [ number,setNumber] = useState("")




     let destiantionRef = useRef()
     let inputRef= useRef()

  

 function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setLat('')
    setLon('')
    setContent('')
    setStarts('')
    setEnd('')
    inputRef.current.value = ''
    destiantionRef.current.value = ''
  }





// finding current location
const initMap =() => {
  var map, infoWindow;
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat:5.839398,lng:-55.199089 },
        zoom: 18,
    });
    infoWindow = new google.maps.InfoWindow();
    const infowindow = new google.maps.InfoWindow();
    const geocoder = new google.maps.Geocoder();
    // var locationButton = document.getElementById("button");
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                infoWindow.setPosition(pos);
                infoWindow.setContent("Location found.");
                infoWindow.open(map);
                map.setCenter(pos);
               
             setLat(position.coords.latitude + ",")
             setLon(position.coords.longitude)
            

             Geocode.fromLatLng(position.coords.latitude , position.coords.longitude).then(
              (response) => {
                const address = response.results[0].formatted_address;
               
              setStarts(address)
              },
              (error) => {
                console.error(error);
              }
            );
               
            }, function () {
                handleLocationError(true, infoWindow, map.getCenter());
            });
            
        }
        else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        };

        Geocode.fromLatLng(position.coords.latitude , position.coords.longitude).then(
          (response) => {
            const address = response.results[0].formatted_address;
           
          },
          (error) => {
            console.error(error);
          }
        );
      
     

}
function handleLocationError(browserHasGeolocation,  pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.");
        infoWindow.open(map);

}
window.initMap = initMap;


const [ driver,setDriver] = useState([])
useEffect(() => {
  const driver = async () => {
    const colRef = (collection(db,'client'))
    onSnapshot(colRef, (snapshot) => {
      setDriver(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })
  }
driver();
}, [])

const Client = () => 
  driver.map(driver => {
    if(driver.client === 'client pickedup'){
      return (
        null
      )
    } else if (driver.clientId === uid) {
     return (
        <div>
          <p> {driver.client} </p> 
        </div>
      )
    }
  })
  





const AutoComplete = () => {
  const autoCompleteRef = useRef();
  inputRef = useRef();
  const options = {
   componentRestrictions: { country: "sr" },
  };
  useEffect(() => {
   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    inputRef.current,
    options
   );
  }, []);
  return (
   <div className='displayflex'>

    <input id='input' className='client-input' type="text" placeholder='from' defaultValue={starts}  ref={inputRef}  onBlur={(e) =>setStarts (e.target.value) }   />
    <input  type="text" className='client-input' placeholder='name ' defaultValue={user} />
    <input  type="text" className='client-input' placeholder='number ' defaultValue={userNumber}/>
   </div>
  );
 };
 const AutoCompleted = () => {
  const autoCompleteRef = useRef();
  destiantionRef = useRef();
  const options = {
   componentRestrictions: { country: "sr" },
  };
  useEffect(() => {
   autoCompleteRef.current = new window.google.maps.places.Autocomplete(
    destiantionRef.current,
    options
   );
  }, []);
  return (
   <div>
   
    <input type="text" className='client-input' placeholder='to'  ref={destiantionRef} defaultValue={end} onBlur={(e) => setEnd(e.target.value) }   />
   </div>
  );
 };
 

 async function calculateRoute() {
  if (inputRef.current.value === '' || destiantionRef.current.value === '') {
    return 
  } 
  // eslint-disable-next-line no-undef
  const directionsService = new google.maps.DirectionsService()
  const results = await directionsService.route({
    origin: inputRef.current.value,
    destination: destiantionRef.current.value,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
  })
  setDirectionsResponse(results)
  setDistance(results.routes[0].legs[0].distance.text)
  setDuration(results.routes[0].legs[0].duration.text)
  setStarts( inputRef.current.value);
  setEnd(destiantionRef.current.value);

  const colRef=collection(db,"test")
  addDoc(colRef, {
    name:user,
    start:starts,
    end:end,
    distance:results.routes[0].legs[0].distance.text,
    duration:results.routes[0].legs[0].duration.text,
    number:userNumber,
    client:uid,
    status:'client waiting',
    taken:"not yet taken",
    timestamp:serverTimestamp()
  }).then(()=> {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    setLat('')
    setLon('')
    setContent('')
    setStarts('')
    setEnd('')
    inputRef.current.value = ''
    destiantionRef.current.value = ''
  })

  

}

function handleSubmit(e) {
  e.preventDefault()
}

function Map(){
if (manager || user || admin ||riders){
  return  (
    <div  className='client-whole-div'>
    <Navbar user={user} admin={admin} riders={riders} manager={manager} />
    <GoogleMap id="map"
     zoom={12}
     center={center}
     mapContainerClassName="map-container client-map">
      <Marker />
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            
    </GoogleMap>
    <div className='client-status'> <Client  /></div> 
    
    <form onSubmit={handleSubmit} className='form-things'> 
    <AutoComplete></AutoComplete>
        <AutoCompleted></AutoCompleted>
        <button onClick={calculateRoute} > confirm ride </button>
        <button onClick={clearRoute}> del route </button>
    </form>
    
    
    
     
    
    
    
    <div className='client-find-me'>
    
    <div className='client-span'>
    <p>Distance: {distance}</p>
    <p> Duration:{duration}</p>
    </div>
    
    <button id='button'  className='map-btn ' onClick={() => 
    initMap()}> find me </button>
    <div id='reverse'>
    
    
    
    
    </div>
    </div>
    
    
    
    
    </div> 
    
    )
}
}



if(!isLoaded){
  return <div> loading .... </div>

} if (isLoaded) return (<div>
<Map />


</div> )

}

