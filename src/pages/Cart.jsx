import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { updateItem } from '../store/cart'
import Item from '../components/Item'

const Cart = () => {

  const dispatch = useDispatch()
  const {cart, total} = useSelector(store => store.cart)
  
  const updateCart = ( item, subtotal, quantity ) => {
    dispatch(updateItem(item, subtotal, quantity))
  }

  const sendMessage = () => {
    let pedido = ``
    const recorrerPedidos = cart.map(item => (
      pedido += `*${item.name}*%0ACantidad%3A%20*${item.quantity}*%0APrecio%3A%20%24%20*${item.price.toLocaleString('es-AR')}*%0ASubtotal%3A%20%24%20*${item.subtotal.toLocaleString('es-AR')}*%0A%0A`
    ))
    console.log(recorrerPedidos)
    const message = `https://api.whatsapp.com/send?phone=541171129392&text=Hola%2C%20quiero%20hacer%20un%20pedido%3A%20%0A%0A${pedido}%0A%0A*Total%3A%20%24${total.toLocaleString('es-AR')}*%0AGracias`
    window.open(message, '_blank')
  }

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
          <article>
            <div className='border p-3 rounded mt-10'>
              <h2 className='text-lg font-bold mb-5 text-center'>Total del pedido</h2>
              <ul className='flex justify-between py-3 border-b'>
                <li>Delivery:</li>
                <li>$ 0</li>
              </ul>
              <ul className='flex justify-between py-3 mb-5'>
                <li>Total:</li>
                <li>$ {total && total.toLocaleString('es-AR')}</li>
              </ul>
              <button className='flex justify-center w-full bg-green-500 text-white py-3' onClick={() => sendMessage()}>
                PEDIR POR WHATSAPP
              </button>
            </div>
          </article>
        </>
        ) : (
          <article>
            <div className='border p-3 rounded mt-10'>
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