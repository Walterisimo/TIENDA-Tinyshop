import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from '../store/products'
import Products from '../components/Products'
import QuickView from '../components/QuickView'

const Home = () => {

  const dispatch = useDispatch()
  const categories = useSelector(store => store.products.categories)
  const loading = useSelector(store => store.products.loading)
  const [ openModals, setOpenModals ] = useState(null)

  useEffect(() => {
    dispatch(getProductsAction())
  }, [dispatch])

  const handleScroll = (element) => {
    let topElem = document.getElementById(element);
    let top = topElem.offsetTop;
    window.scrollTo({ top: top - 75, behavior: 'smooth' });
  }

  const quickView = product => {
    document.body.style.overflow = 'hidden';
    setOpenModals(product)
  }

  const closeModals = () => {
    document.body.style.overflow = 'auto';
    setOpenModals(null)
  }

  return (
    <>
      <div className='mt-[46px]'></div>
      <Carousel type={'main'} />
      <section className='slider-category rounded-md bg-white m-5 pb-11'>
        {
          loading ? (
            <div className='flex items-center justify-center min-h-[120px]'>
              <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className='opacity-25' cx="12" cy="12" r="10" stroke="#783DFF" strokeWidth="4"></circle>
                <path className='opacity-75' fill="#783DFF" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : (
            <Carousel type={'categories'} array={categories} action={handleScroll} />
          )
        }
      </section>
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
            <section className='categories mt-20' id={cat.slug} key={cat.id}>
              <h1 className='font-bold text-2xl pl-3'>{cat.name}</h1>
              <div className='products flex flex-wrap'>
                <Products id={cat.id} handleClick={quickView} />
              </div>
            </section>
          ))
        )
      }
      {
        openModals && ( <QuickView product={openModals} closeModals={closeModals} /> )
      }
    </>
  )
}

export default Home