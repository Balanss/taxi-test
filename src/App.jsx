import { useState } from 'react';
import Main from './components/Main'
import Admin from './components/Admin'
import Driver from './fordrivers/Driver'
import {HashRouter,Routes,Route} from 'react-router-dom';
import "./components/App.css"
import D1 from './components/D1';
import Login from './components/Login'

import Signup from './components/Signup';



function App(){


  return (
   <>
  <HashRouter>
    <Routes>
      <Route path ="/" element={<Main />} ></Route>
      <Route path ="admin" element={<Admin />}></Route>
      <Route path ="driver" element={<Driver />}></Route>
      <Route path ="d1" element={<D1 />}></Route>

      <Route path ="login" element={<Login />}></Route>
      <Route path ="signup" element={<Signup />}></Route>
    </Routes>

   </HashRouter>

   </>
  )
}

export default App
