import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useWindowSize } from 'usehooks-ts'
import { useDispatch } from 'react-redux'
import { logoutUserAction } from '../../store/auth'

const Navbar = () => {

  const [ open, setOpen ] = useState(false)
  const [ mobile, setMobile ] = useState(true)
  const { width } = useWindowSize()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (width > 992) {
      setMobile(false)
      setOpen(true)
    } else {
      setMobile(true)
    }
  }, [width])

  const logout = () => {
    dispatch(logoutUserAction())
    navigate('/login')
  }

  return (
    <nav className='nav flex justify-between items-center px-4 lg:px-8 border-b border-solid border-gray-100 max-w-7xl mx-auto py-4'>
      <div className='nav__logo'>
        <img className='h-8 mr-2' src='../images/Tiny-Shop-color.svg' alt='logo' />
      </div>
      <div className='nav__menu'>
        {
          open ? (
            <>
              <ul className='absolute w-full top-0 left-0 pt-5 mt-16 z-30 lg:relative lg:w-auto lg:pt-0 lg:mt-0 lg:flex bg-white lg:bg-transparent'>
                <NavLink to="/dashboard/orders" activeclassname="active">
                  <li className='cursor-pointer py-3 px-5 border-b border-solid border-slate-200 hover:bg-indigo-50 lg:py-5 lg:border-b-transparent'>Órdenes</li>
                </NavLink>
                <NavLink to="/dashboard/categories" activeclassname="active">
                  <li className='cursor-pointer py-3 px-5 border-b border-solid border-slate-200 hover:bg-indigo-50 lg:py-5 lg:border-b-transparent'>
                    Categorías
                  </li>
                </NavLink>
                <NavLink to="/dashboard/products" activeclassname="active">
                  <li className='cursor-pointer py-3 px-5 border-b border-solid border-slate-200 hover:bg-indigo-50 lg:py-5 lg:border-b-transparent'>
                    Productos
                  </li>
                </NavLink>
                <NavLink to="/dashboard/tables" activeclassname="active">
                  <li className='cursor-pointer py-3 px-5 border-b border-solid border-slate-200 hover:bg-indigo-50 lg:py-5 lg:border-b-transparent'>Mesas</li>
                </NavLink>
                <li className='cursor-pointer py-3 px-5 border-b border-solid border-slate-200 hover:bg-indigo-50 lg:py-5 lg:border-b-transparent text-center mb-10 text-gray-600' onClick={() => logout()}>
                  Cerrar sesión
                </li>
              </ul>
              { 
                mobile && <svg className="h-6 w-6 cursor-pointer" stroke="currentColor" fill="none" viewBox="0 0 24 24" onClick={() => setOpen(false)}>
                  <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              }
            </>
          ) : (
            mobile && <svg className="h-6 w-6 cursor-pointer" stroke="currentColor" fill="none" viewBox="0 0 24 24" onClick={() => setOpen(true)}>
            <path className="inline-flex" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar