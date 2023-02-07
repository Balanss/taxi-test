
import 'firebase/compat/storage'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 import { getFirestore} from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { Timestamp } from '@firebase/firestore';



const firebaseConfig = {

  apiKey: import.meta.env.VITE_FB_API_KEY,

  authDomain: "maps-371417.firebaseapp.com",

  projectId: "maps-371417",

  storageBucket: "maps-371417.appspot.com",

  messagingSenderId: "262710273291",

  appId: "1:262710273291:web:c8ca1af103889e8612ee0e"


};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage(app)
const fs = firebase.firestore();
const db =getFirestore(app)
const timestamp = firebase.firestore()
const auth = firebase.auth();




export  { auth,fs,storage,db,timestamp}