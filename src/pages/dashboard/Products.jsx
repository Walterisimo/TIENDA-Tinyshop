import React from 'react'
import Navbar from '../../components/dahsboard/Navbar'

const Products = () => {

  const editCategories = () => {
    console.log('editar categorias')
  }
  const addProduct = () => {
    console.log('Agregar producto')
    console.log(Date.now())
  }

  return (
    <>
      <Navbar />
      <section className='mx-4 mt-4 px-4 lg:px-8 py-6 bg-white rounded max-w-7xl lg:mx-auto'>
        <article className='flex justify-between items-center'>
          <div className='font-bold uppercase'>Productos</div>
          <div className='ml-auto mr-6'>
            <button
              onClick={() => editCategories()}
              className='rounded bg-sky-400 text-white py-1 px-6'>
                <i className='far fa-edit mr-2'></i>
                Categorías
            </button>
          </div>
          <div>
            <button
              onClick={() => addProduct()}
              className='rounded bg-indigo-600 text-white py-1 px-6'>
                <i className='fas fa-plus mr-2'></i>
                Agregar
            </button>
          </div>
        </article>
        <article className='rounded border mt-8'>
          <ul className=''>
            <li className='flex bg-gray-200 px-4 py-3 border-b-0'>
              <span className='w-[55%] lg:w-[55%] font-bold'>Nombre</span>
              <span className='w-[35%] lg:w-[15%] font-bold'>Categoría</span>
              <span className='hidden lg:flex lg:w-[10%] font-bold'>Precio</span>
              <span className='hidden lg:flex lg:w-[10%] font-bold'>Estado</span>
              <span className='w-[10] lg:w-[10%] font-bold'>Acción</span>
            </li>
            <li className='flex px-4 py-3 border-b'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
            <li className='flex px-4 py-3 border-b bg-gray-100'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
            <li className='flex px-4 py-3 border-b'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
            <li className='flex px-4 py-3 border-b bg-gray-100'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
            <li className='flex px-4 py-3 border-b'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
            <li className='flex px-4 py-3 border-b bg-gray-100'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
            <li className='flex px-4 py-3 border-b'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
            <li className='flex px-4 py-3 border-b bg-gray-100'>
              <span className='w-[55%] lg:w-[55%]'>Hamburguesa completa</span>
              <span className='w-[35%] lg:w-[15%]'>Hamburguesas</span>
              <span className='hidden lg:flex lg:w-[10%]'>$ 1.050</span>
              <span className='hidden lg:flex lg:w-[10%]'>Activo</span>
              <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
            </li>
          </ul>
        </article>
      </section>
    </>
  )
}

export default Products