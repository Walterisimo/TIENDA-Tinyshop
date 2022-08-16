import React, { useState } from 'react'

const QuickView = ( { product, closeModals } ) => {

  const [ quantity, setQuantity ] = useState(1)

  const lessQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const plusQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <>
      <div className='overlay fixed top-0 left-0 z-20 bg-gray-800/95 w-full h-full flex items-center justify-center '>
        <div className='bg-white rounded m-5 w-full overflow-hidden relative'>
          <img src={product.images[0].src} className='w-full h-[280px] object-cover object-center block mb-5' alt={product.name}/>
          <div className='px-4 pb-7'>
            <h2 className='text-2xl font-bold mb-3'>{product.name}</h2>
            <div className='font-light text-md leading-6 mb-5 text-slate-500' dangerouslySetInnerHTML={{ __html: product.description }}></div>
            <span className='font-bold text-indigo-600 text-lg'>$ {product.price}</span>
            <ul className='pt-4 flex justify-between items-center'>
              <li className='quantity'>
                <span className='cursor-pointer border border-slate-300 px-2 py-2' onClick={lessQuantity}>-</span>
                <span className='px-4 py-2 border border-slate-300'>{quantity}</span>
                <span className='cursor-pointer border border-slate-300 px-2 py-2' onClick={plusQuantity}>+</span>
              </li>
              <li className='rounded bg-indigo-600 text-white font-medium text-lg px-4 py-1'>
                AGREGAR AL PEDIDO
              </li>
            </ul>
          </div>
          <span className='absolute top-1 left-1 bg-sky-200 rounded px-2 py-1 text-md z-30 font-thin' onClick={closeModals}> Cerrar </span>
        </div>
      </div>
    </>
  )
}

export default QuickView