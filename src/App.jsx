import React , { useState,lazy,Suspense } from 'react';
import {HashRouter,Routes,Route} from 'react-router-dom';
import "./components/App.css"
import Signup from './components/Signup';



const Driver = lazy(() => import('./fordrivers/Driver'));

const Admin = lazy(() => import('./components/Admin'));
const Login = lazy(() => import('./components/Login'));

function App(){


  return (
   <>
  <HashRouter>
    <Suspense fallback={<h1> Loading ...</h1>}> 
    <Routes>
      <Route path ="admin" element={<Admin />}></Route>
      <Route path ="driver" element={<Driver />}></Route>
      <Route path ="/" element={<Login />}></Route>
      <Route path ="signup" element={<Signup />}></Route>
    </Routes>
    </Suspense>

   </HashRouter>

   </>
  )
}

export default App
