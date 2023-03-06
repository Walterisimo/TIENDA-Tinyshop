import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/cart'
import { Link } from 'react-router-dom'

const QuickView = ( { product, closeModals } ) => {

  const [ quantity, setQuantity ] = useState(1)
  const [ load, setLoad ] = useState(false)
  const [ added, setAdded ] = useState(false)
  const dispatch = useDispatch()


  const lessQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const plusQuantity = () => {
    setQuantity(quantity + 1)
  }

  const addItemToCart = () => {
    setLoad(true)
    setTimeout(() => {
      setLoad(false)
      setAdded(true)
    }, 1000)
    dispatch(addToCart(product, quantity))
  }

  return (
    <>
      <div className='overlay fixed top-0 left-0 z-20 bg-gray-800/95 w-full h-full flex items-center justify-center '>
        <div className='bg-white rounded m-5 w-full overflow-hidden relative'>
          <img src={product.photo} className='w-full h-[280px] object-cover object-center block mb-5' alt={product.name}/>
          <div className='px-4 pb-7'>
            <h2 className='text-2xl font-bold mb-3'>{product.name}</h2>
            <div className='font-light text-md leading-6 mb-5 text-slate-500' dangerouslySetInnerHTML={{ __html: product.description }}></div>
            <span className='font-bold text-indigo-600 text-lg'>$ {product.price.toLocaleString('es-AR')}</span>
            <ul className='pt-4 flex justify-between items-center'>
              <li className='quantity'>
                <span className='cursor-pointer border border-slate-300 px-2 py-2' onClick={lessQuantity}>-</span>
                <span className='px-4 py-2 border border-slate-300'>{quantity}</span>
                <span className='cursor-pointer border border-slate-300 px-2 py-2' onClick={plusQuantity}>+</span>
              </li>
              {
                load ? (
                  <li className='rounded bg-indigo-600 text-white font-medium text-lg px-4 py-2 cursor-pointer hover:bg-indigo-800 content-button flex justify-center'>
                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className='opacity-25' cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="4"></circle>
                      <path className='opacity-75' fill="#FFFFFF" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </li>
                ) : (
                  added ? (
                    <li className='content-button flex justify-end'>
                      <Link to={'/pedido'}>
                        <button
                          className='rounded bg-indigo-600 text-white font-medium text-lg px-4 py-1 cursor-pointer hover:bg-indigo-800'
                        >
                          VER EL PEDIDO
                        </button>
                      </Link>
                    </li>
                  ) : ( 
                    <li className='content-button'>
                      <button
                        className='rounded bg-indigo-600 text-white font-medium text-lg px-4 py-1 cursor-pointer hover:bg-indigo-800'
                        onClick={() => addItemToCart()}
                      >
                        AGREGAR AL PEDIDO
                      </button>
                    </li>
                  )
                )
              }
            </ul>
          </div>
          <span className='absolute top-1 right-1 bg-sky-200 rounded px-2 py-1 text-md z-30 font-thin' onClick={closeModals}> 
            <i className="far fa-times-circle fa-2x"></i>
          </span>
        </div>
      </div>
    </>
  )
}

export default QuickView