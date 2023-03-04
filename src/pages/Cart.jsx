import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { updateItem, getShippingMethods, addShippingCost } from '../store/cart'
import Item from '../components/Item'

const Cart = () => {

  const dispatch = useDispatch()
  const {cart, total, shipping, shippingMethod } = useSelector(store => store.cart)

  const [ selected, setSelected ] = useState(shippingMethod)
  const [ address, setAddress ] = useState(null)
  const [ note, setNote ] = useState(null)

  const updateCart = ( item, subtotal, quantity ) => {
    dispatch(updateItem(item, subtotal, quantity))
  }

  const sendMessage = () => {
    let pedido = ``
    const recorrerPedidos = cart.map(item => (
      pedido += `*${item.title}*%0ACantidad%3A%20*${item.quantity}*%0APrecio%3A%20%24%20*${item.price.toLocaleString('es-AR')}*%0ASubtotal%3A%20%24%20*${item.subtotal.toLocaleString('es-AR')}*%0A`
    ))
    console.log(recorrerPedidos)
    const message = `https://api.whatsapp.com/send?phone=541132805895&text=Hola%2C%20quiero%20hacer%20un%20pedido%3A%20%0A%0A${pedido}${selected ? `%0A%0A*Método%20de%20Envío*%3A%0A${selected.title}%20-%20*${selected.price}*` : ''}${address ? `%0A%0A*Dirección*%3A%0A${address}` : ''}${note ? `%0A%0A*Notas*%3A%0A${note}` : ''}%0A%0A*Total%3A%20%24${total.toLocaleString('es-AR')}*%0AGracias`
    window.open(message, '_blank')
  }

  const handleRadio = (shippingSelected) => {
    setSelected(shippingSelected)
    dispatch(addShippingCost(shippingSelected))
  }
  
  useEffect(() => {
    dispatch(getShippingMethods())
  }, [dispatch])

  return (
    <section className='mt-[60px] px-3'>
      <ul className='flex pt-6 text-indigo-900'>
        <li className='mr-2 font-light'><NavLink to={'/'}>Inicio</NavLink></li>
        <li className='mr-2 font-light'>|</li>
        <li className='mr-2 font-medium'>Pedido</li>
      </ul>
      { cart && cart.length > 0 ? (
        <>
          <article className='row'>
            {
              cart && cart.map(item => (
                <Item key={item.id} product={item} action={updateCart}/>
              ))
            }
          </article>
          <article className='row'>
            <p className='mt-10 mb-2 font-medium'>Envío</p>
            {
              shipping && shipping.map(item => (
                <li className='flex mb-1' key={item.id}>
                  <input
                    type="radio"
                    id={item.slug}
                    name='shipping'
                    className='mr-2'
                    value={item.slug}
                    checked={selected.slug === item.slug}
                    onChange={() => handleRadio(item)}
                  />
                  <label htmlFor={item.slug}>{item.title}</label>
                  {
                    parseInt(item.price) === 0 ? (
                      <p className='ml-auto text-right font-medium'>Gratis</p>
                    ) : (
                      <p className='ml-auto text-right font-medium'>$ {item.price}</p>
                    )
                  }
                </li>
              ))
            }
          </article>
          <article className='pt-6'>
            {
              selected.input_address && (
                <div className='mb-6'>
                  <label htmlFor='emaddressail' className='w-full font-medium'>Dirección</label>
                  <input 
                    className='w-full p-3 border border-slate-300 rounded'
                    style={{backgroundColor: '#f9f9f9'}}
                    type='text'
                    name='address'
                    id='address'
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              )
            }
            <div className='mb-6'>
              <label htmlFor='note' className='w-full font-medium'>Notas</label>
              <textarea 
                className='w-full p-3 border border-slate-300 rounded'
                style={{backgroundColor: '#f9f9f9'}}
                name='note'
                id='note'
                rows='3'
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
          </article>
          <article className='pb-16'>
            <div className='border border-slate-300 p-3 rounded mt-10'>
              <h2 className='text-lg font-bold mb-5 text-center'>Total del pedido</h2>
              <ul className='flex justify-between py-3 border-b border-slate-300'>
                <li>{shippingMethod.title}:</li>
                <li className='font-semibold'>
                  {
                    parseInt(shippingMethod.price) === 0 ? (
                      <>Gratis</>
                    ) : (
                      <>$ {shippingMethod.price}</>
                    )
                  }
                </li>
              </ul>
              <ul className='flex justify-between py-3 mb-5'>
                <li>Total:</li>
                <li className='font-semibold'>$ {total && total.toLocaleString('es-AR')}</li>
              </ul>
              <button className='flex justify-center w-full bg-green-500 text-white py-3' onClick={() => sendMessage()}>
                PEDIR POR WHATSAPP
              </button>
            </div>
          </article>
        </>
        ) : (
          <article>
            <div className='border border-slate-300 p-3 rounded mt-10'>
              <h2 className='text-lg font-bold text-center'>Carrito Vacio</h2>
              <p className='text-center py-3 mb-5'>
                Agregá productos a tu pedido
              </p>
              <button className='flex justify-center w-full bg-slate-800 text-white py-3'>
                <NavLink to={'/'}> VER PRODUCTOS </NavLink>
              </button>
            </div>
          </article>
        )
      }
    </section>
  )
}

export default Cart