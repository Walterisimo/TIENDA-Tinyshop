import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FixedButton = () => {

  const {cart, total} = useSelector(store => store.cart)

  return (
    <div className='fixed z-10 bottom-0 w-full bg-white p-4'>
      {
        cart && cart.length > 0 ? (
          <NavLink to={'/pedido'}>
            <ul className='flex justify-between items-center px-5 rounded-full py-3 bg-green-500 text-white'>
              <li className='min-w-[60px]'>
                <img src='../images/shopping-bag.png' alt='Carrito'/>
              </li>
              <li className='font-medium'>VER PEDIDO</li>
              <li className='min-w-[60px] font-medium text-sm text-right'>{`$ ${total}`}</li>
            </ul>
          </NavLink>
        ) : null
      }
    </div>
  )
}

export default FixedButton