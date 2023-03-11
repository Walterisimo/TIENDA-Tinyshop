import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteCategory } from '../../../store/products'
import { useReadLocalStorage } from 'usehooks-ts'

const DeleteCategory = () => {

  const category = useReadLocalStorage('category')
  const dispatch = useDispatch()

  const deleteItem = () => {
    dispatch(deleteCategory(category.uid))
  }
  
  return (
    <>
      <div className='mx-4 bg-white rounded-md max-w-full flex px-3 py-5 lg:max-w-lg lg:mx-auto'>
        <div className='text-red-500'>
          <i className='fas fa-exclamation-circle fa-2x lg:fa-3x'></i>
        </div>
        <div className='ml-4 text-left'>
          <p className='text-slate-500 font-light leading-5'>
            Vas a eliminar la categoría: "<span className='font-medium'>{ category.name }</span>".<br />
            Los prouctos asociados a esta categoría, también se van a eliminar.<br /><br />
            Por favor confirmá para eliminar.
          </p>
          <ul className='flex justify-end mt-4'>
            <li className='border border-solid border-red-600 rounded px-3 py-1 bg-red-600 text-white cursor-pointer' onClick={() => deleteItem()}>
              Eliminar
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default DeleteCategory