import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../../store/products'

const NewCategory = () => {

  const dispatch = useDispatch()
  const alert = useSelector(store => store.products.alert)

  const [name, setName] = useState('')
  const [order, setOrder] = useState(0)
  const [active, setActive] = useState(true)
  const [errors, setErrors] = useState({ name: false, order: false })

  const slugify = (str) => {
    str = str.replace(/^\s+|\s+$/g, '') // trim
    str = str.toLowerCase()

    // remove accents, swap ñ for n, etc
    var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
    var to = 'aaaaaeeeeeiiiiooooouuuunc------';
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

  const handleForm = e => {
    e.preventDefault()

    if (!name.trim()) {
      setErrors({ ...errors, name: true })
    }
    if (errors.name) {
      return
    }

    setErrors({ name: false, order: false })

    const category = {
      active: active,
      date: Date.now(),
      name: name,
      position: order,
      slug: slugify(name)
    }

    dispatch(addCategory(category))
  }

  return (
    <>
      <form className='space-y-4 md:space-y-6' onSubmit={handleForm}>
        <div className='p-6 space-y-6'>
          {alert && alert.type === 'succes' && (
            <div className='flex p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400' role='alert'>
              <svg className='flex-shrink-0 inline w-5 h-5 mr-3' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd'></path></svg>
              <span className='sr-only'>Info</span>
              <div>
                <span className='font-medium'>Hecho!</span> Creaste la categoría.
              </div>
            </div>
          )}
          {alert && alert.type === 'error' && (
            <div className='flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400' role='alert'>
              <svg className='flex-shrink-0 inline w-5 h-5 mr-3' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd'></path></svg>
              <span className='sr-only'>Info</span>
              <div>
                <span className='font-medium'>Error!</span> Algo salió mal, intentá de nuevo más tarde.
              </div>
            </div>
          )}
          <div>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Nombre</label>
            <input
              type='text'
              name='name'
              id='name'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Hamburguesas'
              required=''
              onChange={e => setName(e.target.value)}
              value={name}
            />
            <span className={`input-error ${errors.name ? 'flex' : 'hidden'}`}>
              Tenes que ingresar un nombre
            </span>
          </div>
          <div>
            <label htmlFor='order' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Orden</label>
            <input
              type='number'
              name='order'
              id='order'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='correo@email.com'
              required=''
              onChange={e => setOrder(Number(e.target.value))}
              value={order}
            />
            <span className={`input-error ${errors.order ? 'flex' : 'hidden'}`}>
              Tenes que ingresar un orden
            </span>
          </div>
          <div className='pt-2'>
            <label htmlFor='active' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Estado</label>
            <div className='flex items-center mb-4'>
              <input
                id='active-1'
                type='radio'
                name='active'
                value='true'
                className='w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => setActive(true)}
                defaultChecked
              />
              <label htmlFor='active-1' className='block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Mostrar
              </label>
            </div>
            <div className='flex items-center mb-4'>
              <input
                id='active-2'
                type='radio'
                name='active'
                value='false'
                className='w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600'
                onChange={() => setActive(false)}
              />
              <label htmlFor='active-2' className='block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Ocultar
              </label>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600'>
          {/* <button type='button' className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'>Cancelar</button> */}
          <button type='submit' className='text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800'>Crear categoría</button>
        </div>
      </form>
    </>
  )
}

export default NewCategory