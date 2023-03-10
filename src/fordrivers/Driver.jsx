import React from "react";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { db, auth, fs } from "../Firebase";
import {collection,onSnapshot,query,addDoc,deleteDoc,doc,updateDoc,} from "firebase/firestore";
import {GoogleMap,useLoadScript,Marker,DirectionsRenderer,Autocomplete,} from "@react-google-maps/api";

export function State({ lat, lon }) {
  return (
    <p>
      {" "}
      {lat} {lon}{" "}
    </p>
  );
}

export default function Driver() {
  const [driver, setDriver] = useState([]);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [status, setStatus] = useState([]);
  const [dispatch, setDispatch] = useState([]);
  const [number, setNumber] = useState("");
  const [ndriver, setNdriver] = useState(null);
  const [rider, setRider] = useState([]);
  const [id, setId] = useState("");
  const [show, setShow] = useState('none')
  const [clientId, setClientId] = useState()

  const [local, setLocal] = useState([]);
  useEffect(() => {
    const local = async () => {
      const colRef = collection(db, "place");
      onSnapshot(colRef, (snapshot) => {
        setLocal(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    local();
    
  }, []);

 

  useEffect(() => {
    const driver = async () => {
      const colRef = collection(db, "drivers");
      onSnapshot(colRef, (snapshot) => {
        setDriver(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    driver();
    
  }, []);


  useEffect(() => {
    const rider = async () => {
      const colRef = collection(db, "rider");
      onSnapshot(colRef, (snapshot) => {
        setRider(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    rider();
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_SOME_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const center = { lat: 5.839398, lng: -55.199089 };

  function initMap() {
    var map, infoWindow;
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 5.839398, lng: -55.199089 },
      zoom: 18,
    });
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          infoWindow.setContent(number);
          infoWindow.open(map);
          map.setCenter(pos);
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
          // const colRef = collection(db, "place");
          //   addDoc(colRef, {
          //     lat: position.coords.latitude,
          //     lng:position.coords.longitude,
          //     number: number,
            
          //   });

          local.map((local, index) => {
            const docRef1 = doc(db, "place","wNY5vHqvIZAsDKAGvYie");
           const payload1 = { lat: position.coords.latitude,lng: position.coords.longitude};
           updateDoc(docRef1, payload1);
           console.log(local.id)   
         });
        
         
        },
        function () {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(Map);
  }
  window.initMap = initMap;

  const [client, setClient] = useState([]);

  useEffect(() => {
    const client = async () => {
      const colRef = collection(db, "client");
      onSnapshot(colRef, (snapshot) => {
        setClient(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    };
    client();
  }, []);



  //shows status of current ride
  const Ride = () =>
    driver.map((driver, index) =>  { console.log(driver.ndriver , ndriver)
      if (driver.ndriver === ndriver) {
        return (
          <div key={index}>
            <h4> Client Name: {driver.name} </h4>
            <h4> number: {driver.number}</h4>
            <h4> From : {driver.start} </h4>
            <h4> To : {driver.end} </h4>
            <h4> Distance : {driver.distance}</h4>
            <h4> Avg Duration : {driver.duration}</h4>
            <h4> Ride Status : {driver.status}</h4>
            <h4> Driver : {driver.ndriver} </h4>
            <h4
              onClick={() => {
                setId(driver.id);
              }}
            >
              {" "}
              id : {driver.id}{" "}
            </h4>
          </div>
        );
      } else {
        return null;
      }
    });


// shows status of client order and button to show client and admin that is pickedup. once client is pickedup go ahead and remove ride
  const Client = () =>
    driver.map((driver, index) => {
      if (ndriver === matchNumb) {
        return (
          <div className="button-css" key={index}>
            {/* <h4> Client Status : {client.client}</h4> */}
            <button
              className="button"
              onClick={() => {
                const docRef = doc(db, "drivers", driver.id);
                const payload = { status: "client pickedup" };
                updateDoc(docRef, payload);

              }}
            >
              {" "}
              client pickup
            </button>
          </div>
        );
      }
    });


    //button that shows to admin that ride is accepted
  function Button() {
    const Dispatch = () =>
      dispatch.map((dispatch, index) => {
        const docRef = doc(db, "driver", dispatch.id);
        const payload = { status: "accepted" };
        updateDoc(docRef, payload);
      });

    return Dispatch();
  }

  

  function handleClick() {
    const colRef = collection(db, "place");
    addDoc(colRef, {
      lat: lat,
      lng:lon,
      number: ndriver,
    });
  }

  function ButtonLocal () {
    const Test = () =>{
        local.map((local, index) => {
           const docRef1 = doc(db, "place", local.id);
          const payload1 = { lat: lat, lng: lon };
          updateDoc(docRef1, payload1);
          console.log(local.id)   
        });
    }
    
    return Test();
  }




console.log(lat , lon)

const [matchNumb,setMatchNumb] = useState()
const [matchCid,setMatchCid] = useState()
  //accepts ride 
  function ButtonDriver() {
    const Test = () =>
      driver.map((driver, index) => {
        setMatchNumb(ndriver)
        setMatchCid(driver.client)
        const docRef1 = doc(db, "drivers", driver.id);
        const payload1 = { status: "accepted" };
        updateDoc(docRef1, payload1);
      });
    return Test();
  }


  // get data id to match

  function DeleteRide() {
    const Delete = () =>
      driver.map((driver, index) => {
        deleteDoc(doc(db, "drivers", id));
        setNdriver(0);
      });
    return Delete();
  }

  function DeleteRideFromClient() {
    const Delete = () =>
      client.map((client, index) => {
        deleteDoc(doc(db, "client", client.id));
        setNdriver(0);
      });
    return Delete();
  }

  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const uid = GetUserUid(); // ignore errror
  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("rider")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
              setNdriver(snapshot.data().Number);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const riders = GetCurrentUser();
  function GetCurrentManager() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("manager")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const manager = GetCurrentManager();


 
  if (!isLoaded) {
    return <div> loading .... </div>;
  }
  if ((isLoaded && manager || ndriver) || (riders)) {
    return (
      <div className="">
        <Navbar riders={riders} manager={manager} />

     

        <div className="whole-driver-div">
          <div className="driver-view">
            <button
              id="button"
              className="map-btn button"
              onClick={() => {
                setInterval(() => {
                  initMap();
                  setShow('block')
                }, 30000); 

                setTimeout(() => {
                 
                },9000)
              }}
            >
              {" "}
              Open For Ride{" "}
            </button>

            <button 
              className="button"
              onClick={ () =>{
               setInterval(() => {
                  ButtonLocal();
                }, 9000)
              }
              }
              
            >
              {" "}
              Send to Dispatch{" "}
            </button>
            <p> {lat} , {lon}  </p>
            <Ride />{" "}
            <button
              className="button"
              onClick={() => {
                ButtonDriver();
                Button();
              }}
            >
              {" "}
              Accept Ride{" "}
            </button>
            <button
              className="button"
              onClick={() => {
                DeleteRide();
                DeleteRideFromClient();
              }}
            >
              {" "}
              Remove Ride{" "}
            </button>
            <Client />
          </div>

          <div className="map-view-driver">
            <GoogleMap
              id="map"
              className=""
              zoom={12}
              center={center}
              mapContainerClassName="admin-map driver-map"
            ></GoogleMap>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
