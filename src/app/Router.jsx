import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom'
import Cart from '../pages/Cart'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Orders from '../pages/dashboard/Orders'
import Products from '../pages/dashboard/Products'
import Categories from '../pages/dashboard/Categories'
import Tables from '../pages/dashboard/Tables'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from '../store/auth'

const Router = () => {

  const dispatch = useDispatch()
  const { active } = useSelector(store => store.auth)

  
  useEffect(() => {
    dispatch(getUserAction())
  }, [dispatch])
  

  const RequireAuth = () => {
    let location = useLocation()
    if (!active) {
      return <Navigate to="/login" state={{ from: location }} />
    }
    return <Outlet />
  }

  return active !== false ? (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/pedido' element={ <Cart /> } />
        <Route path='/login' element={ <Login /> } />
        <Route element={<RequireAuth />}>
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/dashboard/orders' element={ <Orders />} />
          <Route path='/dashboard/tables' element={ <Tables /> } />
          <Route path='/dashboard/products' element={ <Products /> } />
          <Route path='/dashboard/categories' element={ <Categories /> } />
        </Route>
        <Route path='*' element={ <Navigate to='/' /> } />
      </Routes>
    </BrowserRouter>
  ) : (
    <p>Loading...</p>
  )
}

export default Router