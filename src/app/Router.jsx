import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Cart from '../pages/Cart'
import Home from '../pages/Home'

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/pedido' element={ <Cart /> } />
        <Route path='*' element={ <Navigate to='/' /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default Router