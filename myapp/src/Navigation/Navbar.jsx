import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Client from '../Components/Client'
import Receiver from '../Components/Receiver'
const Navbar = () => {
  return (
    <div>
    <Routes>
    <Route path='/' element={<Client/>}/>
    <Route path='/receiver' element={<Receiver/>}/>
    </Routes>
    </div>
  )
}

export default Navbar