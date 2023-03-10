import React, { useState } from 'react'
import Navbar from '../../components/dahsboard/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from '../../store/products'
import Modal from '../../components/dahsboard/Modal'

const Products = () => {

  const dispatch = useDispatch()
  const categories = useSelector(store => store.products.categories)
  const loading = useSelector(store => store.products.loading)

  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleModalOpen = (type) => {
    setModalType(type)
    setShowModal(true)
  }

  function handleModalClose() {
    setShowModal(false)
  }
  
  const getProducuts = () => {
    dispatch(getProductsAction())
  }

  let modalContent

  // if (modalType === 'category') {
  //   modalContent = <Categories />
  // } else if (modalType === 'newProduct') {
  //   modalContent = <NewProductForm />
  // } else if (modalType === 'alert') {
  //   modalContent = <Alert />
  // }


  return (
    <>
      <Navbar />
      <section className='mx-4 mt-4 px-4 lg:px-8 py-6 bg-white rounded max-w-7xl lg:mx-auto'>
        <article className='flex justify-between items-center mt-4'>
          <div className='font-bold uppercase'>Productos</div>
          <div className='ml-auto'>
            <button
              onClick={() => handleModalOpen('newProduct')}
              className='rounded bg-indigo-600 text-white py-1 px-6'
            >
              <i className='fas fa-plus mr-2'></i>
              Agregar
            </button>
          </div>
        </article>
        <article className='rounded border mt-4'>
          <ul className=''>
            <li className='flex bg-gray-200 px-4 py-3 border-b-0'>
              <span className='w-[55%] lg:w-[55%] font-bold'>Nombre</span>
              <span className='w-[35%] lg:w-[15%] font-bold'>Categoría</span>
              <span className='hidden lg:flex lg:w-[10%] font-bold'>Precio</span>
              <span className='hidden lg:flex lg:w-[10%] font-bold'>Estado</span>
              <span className='w-[10] lg:w-[10%] font-bold'>Acción</span>
            </li>
            {
              categories.length < 1 && (
                <button
                  className='flex rounded text-black bg-amber-300 mx-auto my-4 px-3'
                  onClick={() => getProducuts()}
                >
                  <span className>Cargar productos</span>
                </button>
              )
            }
            {
              loading ? (
                <div className='flex items-center justify-center min-h-[120px]'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className='opacity-25' cx="12" cy="12" r="10" stroke="#783DFF" strokeWidth="4"></circle>
                    <path className='opacity-75' fill="#783DFF" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                categories.map(cat => (
                  cat.products.map(product => (
                    <li className='flex px-4 py-3 border-b' key={product.id}>
                      <span className='w-[55%] lg:w-[55%]'>{product.name}</span>
                      <span className='w-[35%] lg:w-[15%]'>{cat.name}</span>
                      <span className='hidden lg:flex lg:w-[10%]'>$ {product.price}</span>
                      <span className='hidden lg:flex lg:w-[10%]'>{(product.visibility) ? 'Activo' : 'Pausado' }</span>
                      <span className='w-[10] lg:w-[10%] text-indigo-600'><i className='far fa-edit mr-2'></i></span>
                    </li>
                  ))
                ))
              )
            }
            
          </ul>
        </article>
      </section>


      {showModal && (
        <Modal onClose={handleModalClose}>
          {modalContent}
        </Modal>
      )}
    </>
  )
}

export default Products