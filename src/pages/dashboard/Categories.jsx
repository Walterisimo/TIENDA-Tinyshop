import React, { useState, useEffect } from 'react'
import Navbar from '../../components/dahsboard/Navbar'
import NewCategory from '../../components/dahsboard/categories/NewCategory'
import EditCategory from '../../components/dahsboard/categories/EditCategory'
import DeleteCategory from '../../components/dahsboard/categories/DeleteCategory'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction, changeActiveCategory } from '../../store/products'
import Modal from '../../components/dahsboard/Modal'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useLocalStorage } from 'usehooks-ts'

const Categories = () => {

  const dispatch = useDispatch()
  const categories = useSelector(store => store.products.categories)
  const loading = useSelector(store => store.products.loading)
  const alert = useSelector(store => store.products.alert)
  
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalTitle, setModalTitle] = useState('')

  const [singleCategory, setSingleCategory] = useLocalStorage('category', {})
  
  const handleModalOpen = (type, title, cat) => {
    setModalType(type)
    setModalTitle(title)
    setShowModal(true)
    if(cat) {
      setSingleCategory(cat)
    }
  }

  function handleModalClose() {
    setShowModal(false)
  }

  const getProducuts = () => {
    dispatch(getProductsAction())
  }

  const changeActive = (cat, isActive) => {
    dispatch(changeActiveCategory(cat, isActive))
  }

  let modalContent

  if (modalType === 'newCategory') {
    modalContent = <NewCategory />
  } else if (modalType === 'editCategory') {
    modalContent = <EditCategory />
  } else if (modalType === 'deleteCategory') {
    modalContent = <DeleteCategory />
  }

  useEffect(() => {
    console.log('Alert: ', alert)
    if( !loading && alert.type === 'success') {
      toast.success(alert.message)
    } else {
      toast.error(alert.message)
    }
  },[loading, alert])

  return (
    <>
      <Navbar />
      <section className='mx-4 mt-4 px-4 lg:px-8 py-6 bg-white rounded max-w-7xl lg:mx-auto'>
        <article className='flex justify-between items-center mt-4'>
          <div className='font-bold uppercase'>Categorías</div>
          <div>
            <button
              onClick={() => handleModalOpen('newCategory', 'Nueva categoría')}
              className='rounded bg-indigo-600 text-white py-1 px-6'
            >
              <i className='fas fa-plus mr-2'></i>
              Agregar
            </button>
          </div>
        </article>
        <article className='rounded border mt-4'>
          <ul>
            <li className='flex bg-gray-200 px-4 py-3 border-b-0'>
              <span className='w-[50%] lg:w-[60%] font-bold'>Nombre</span>
              <span className='w-[25%] lg:w-[10%] font-bold'>¿Mostrar?</span>
              <span className='hidden lg:flex lg:w-[10%] font-bold'>Orden</span>
              <span className='w-[25%] lg:w-[20%] font-bold'>Acciones</span>
            </li>
            {
              categories.length < 1 && (
                <button
                  className='flex rounded text-black bg-amber-300 mx-auto my-4 px-3'
                  onClick={() => getProducuts()}
                >
                  <span>Cargar categorías</span>
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
                  <li className='flex px-4 py-3 border-b' key={cat.slug}>
                    <span className='w-[50%] lg:w-[60%]'>{cat.name}</span>
                    <span className='w-[25%] lg:w-[10%]'>{(cat.active) ? 'SI' : 'NO'}</span>
                    <span className='hidden lg:flex lg:w-[10%]'>{cat.position}</span>
                    <span className='w-[25%] lg:w-[20%]'>
                      {
                        cat.active ? (
                          <span
                            onClick={() => changeActive(cat, false)}
                            className='cursor-pointer text-blue-500 hover:opacity-70'
                            title='Ocultar'>
                            <i className='far fa-eye mr-3'></i>
                          </span>
                        ) : (
                          <span
                            onClick={() => changeActive(cat, true)}
                            className='cursor-pointer text-gray-500 hover:opacity-70'
                            title='Mostrar'>
                            <i className='far fa-eye-slash mr-3'></i>
                          </span>
                        )
                      }
                      <span
                        onClick={() => handleModalOpen('editCategory', 'Editar categoría', cat)}
                        className='cursor-pointer text-indigo-500 hover:opacity-70'>
                          <i className='far fa-edit mr-2'></i>
                      </span>
                      <span
                        onClick={() => handleModalOpen('deleteCategory', 'Eliminar categoría', cat)}
                        className='cursor-pointer text-red-500 hover:opacity-70'>
                          <i className='far fa-trash-alt mr-2'></i>
                      </span>
                    </span>
                  </li>
                ))
              )
            }

          </ul>
        </article>
      </section>

      {showModal && (
        <Modal onClose={handleModalClose} title={modalTitle}>
          {modalContent}
        </Modal>
      )}

    <ToastContainer />
    </>
  )
}

export default Categories