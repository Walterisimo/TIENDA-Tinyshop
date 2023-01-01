import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {

  const { cart } = useSelector( store => store.cart )
  const [ items, setItems ] = useState(0)

  useEffect(() => {
    if (cart && cart.length > 0) {
      let quentity = 0
      for (let index = 0; index < cart.length; index++) {
        quentity += cart[index].quantity
      }
      setItems(quentity)
    }
  }, [ cart ])

  return (
    <nav className='flex flex-row items-center justify-between p-3 bg-white mb-4 fixed w-full top-0 z-10'>
      <div className='min-w-[50px]'></div>
      <div className=''>
        <NavLink to={'/'}>
          <img src='../images/Tiny-Shop-color.svg' className='w-[140px]' alt='Tienda Tinyshop' />
        </NavLink>
      </div>
      <div className='min-w-[50px]'>
        { cart && cart.length > 0 ? (
          <NavLink to={'/pedido'} className='relative cursor-pointer'>
            <img
              src='../images/bag.png'
              className='ml-auto'
              alt='Cart Preview'
            />
            <span
              className='absolute rounded-full bg-green-500 -top-1 -right-1 text-white font-medium w-[16px] h-[16px] flex justify-center items-center'
              style={{fontSize: '10px'}}
              >{items}</span>
          </NavLink>
          ) : null
        }
      </div>
    </nav>
  )
}

export default Navbar