import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateItem } from '../store/cart'

const Item = ( { product, action } ) => {

  const [ quantity, setQuantity ] = useState(product.quantity)
  const [ openModals, setOpenModals ] = useState(false)
  const dispatch = useDispatch()
  
  const lessQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      action(product, product.subtotal, quantity - 1)
    }
  }
  const plusQuantity = () => {
    setQuantity(quantity + 1)
    action(product, product.subtotal, quantity + 1)
  }
  
  const deleteItem = ( ) => {
    dispatch(updateItem(product, product.subtotal))
    setOpenModals(false)
  }

  return (
    <>
      <div className='cart__items my-3 flex flex-col rounded bg-white overflow-hidden'>
        <div className='flex'>
          <div className='cart__items--image m-auto'>
            <img
              src={product.photo}
              className='object-cover object-center block h-full w-full'
              alt={product.name}
            />
          </div>
          <div className='cart__items--content px-2 py-3 relative flex flex-col justify-between'>
            <span className='absolute top-2 right-3 text-red-600 cursor-pointer' onClick={() => setOpenModals(true)}>
              <i className='far fa-trash-alt'></i>
            </span>
            <h3 className='cart__items--title font-medium text-md mb-1 leading-5 text-left'>{product.name}</h3>
            <div>
              <ul className='pt-2 flex justify-between items-center'>
                <li>
                  <span className='cart__items--price font-black mt-auto'>$ { product.subtotal.toLocaleString('es-AR') }</span>
                </li>
                <li className='quantity ml-auto mr-2'>
                  <span className='cursor-pointer border border-solid border-slate-300 px-2' onClick={lessQuantity}>-</span>
                  <span className='px-3 border border-solid border-slate-300'>{quantity}</span>
                  <span className='cursor-pointer border border-solid border-slate-300 px-2' onClick={plusQuantity}>+</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {
        openModals ? (
          <>
            <div className='overlay fixed top-0 left-0 bg-black bg-opacity-75 w-full h-full z-50 flex items-center'>
              <div className='modals mx-4 bg-white rounded-md w-full flex px-3 py-5'>
                <div className='text-red-500'>
                  <i className='fas fa-exclamation-circle fa-2x lg:fa-3x'></i>
                </div>
                <div className='ml-4 text-left'>
                  <h3 className='mt-1 mb-2 font-bold text-lg'>Eliminar producto</h3>
                  <p className='text-slate-500 font-light leading-5'>Vas a eliminar el producto: "<span className='font-medium'>{product.name}</span>" de tu pedido.<br />Por favor confirmá para continuar.</p>
                  <ul className='flex justify-end mt-4'>
                    <li className='border border-solid border-slate-300 rounded px-3 py-1 mr-4 cursor-pointer' onClick={() => setOpenModals(false)}>
                      Cancelar
                    </li>
                    <li className='border border-solid border-red-600 rounded px-3 py-1 bg-red-600 text-white cursor-pointer' onClick={() => deleteItem()}>
                      Eliminar
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : null
      }
    </>
  )
}

export default Item