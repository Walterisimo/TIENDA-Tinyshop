import React, { useEffect } from 'react'
import Carousel from '../components/Carousel'
import Search from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsAction } from '../store/products'

const Home = () => {

  const dispatch = useDispatch()
  const products = useSelector(store => store.products.all)

  useEffect(() => {
    dispatch(getProductsAction())
  }, [dispatch])

  console.log(`Products: ${products}`)

  return (
    <>
      <Search />
      <Carousel type={'main'} />
      <section className='slider-category rounded-md bg-white m-5 pb-11'>
        <Carousel type={'categories'} />
      </section>
      <section className='categories mt-16' id='snack'>
        <h1 className='font-bold text-2xl pl-3'>Snacks</h1>
        
        <div className='products flex flex-wrap'>
          {
              products.map(product => (
                <div className='products__items m-2 mx-3 flex rounded bg-white overflow-hidden w-full' key={product.id}>
                  <div className='w-[35%]'>
                    <img
                      src={product.images[0].src}
                      className='products__items--image object-cover object-center block h-full'
                      alt='Papas fritas'
                    />
                  </div>
                  <div className='px-2 py-3 relative'>
                    <h3 className='products__items--title font-bold text-md mb-1'>{product.name}</h3>
                    <div className='products__items--description font-light text-sm leading-5 mb-2 text-slate-500' dangerouslySetInnerHTML={{__html: product.description }}></div>
                    <span className='products__items--price font-semibold text-indigo-600'>$ {product.price}</span>
                    <span className='rounded-full bg-indigo-600 w-[35px] h-[35px] absolute right-3 bottom-2 items-center justify-center flex text-white font-normal text-2xl'>+</span>
                  </div>
                </div>
              ))
          }
        </div>
      </section>
    </>
  )
}

export default Home