
import 'firebase/compat/storage'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
 import { getFirestore} from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { Timestamp } from '@firebase/firestore';



const firebaseConfig = {

  apiKey: import.meta.env.VITE_FB_API_KEY,

  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,

  projectId: import.meta.env.VITE_FB_PROJECT_ID,

  storageBucket: import.meta.env.VITE_FB_STORAGE_B,

  messagingSenderId: import.meta.env.VITE_FB_,

  appId: import.meta.env.VITE_FB_APP_ID,


};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage(app)
const fs = firebase.firestore();
const db =getFirestore(app)
const timestamp = firebase.firestore()
const auth = firebase.auth();




export  { auth,fs,storage,db,timestamp}