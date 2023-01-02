import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

const FixedButton = () => {

  const { cart, total } = useSelector(store => store.cart)
  const windowSize = useRef([window.innerWidth, window.innerHeight])

  return (
    <>
      {
        cart && cart.length > 0 && windowSize.current[0] < 768 ? (
          <div className='fixed z-10 bottom-0 w-full bg-white p-4'>
                <NavLink to={'/pedido'}>
                  <ul className='flex justify-between items-center px-5 rounded-full py-3 bg-green-500 text-white'>
                    <li className='min-w-[60px]'>
                      <img src='../images/shopping-bag.png' alt='Carrito'/>
                    </li>
                    <li className='font-medium'>VER PEDIDO</li>
                    <li className='min-w-[60px] font-medium text-sm text-right'>{`$ ${total.toLocaleString('es-AR')}`}</li>
                  </ul>
                </NavLink>
              </div>
        ) : null
      }
    </>
  )
}

export default FixedButton