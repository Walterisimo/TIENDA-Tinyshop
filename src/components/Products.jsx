import React from 'react'

const Products = ({ product, handleClick }) => {

  return (
    <>
      {
        product ? (
          <div className='products__items m-2 mx-3 flex rounded bg-white overflow-hidden w-full'>
            <div className='products__items--image m-auto'>
              <img
                src={`http://localhost:1337${product.photo.data.attributes.url}`}
                className='object-cover object-center block h-full w-full'
                alt='Papas fritas'
              />
            </div>
            <div className='products__items--content px-2 py-3 relative flex flex-col'>
              <h3 className='products__items--title font-bold text-md mb-1 leading-5'>{product.name}</h3>
              <div className='products__items--description font-light text-sm leading-4 mb-2 text-slate-500' dangerouslySetInnerHTML={{ __html: product.description }}></div>
              <span className='products__items--price font-semibold text-indigo-600 mt-auto'>$ {product.price}</span>
              <span
                className='rounded-full bg-indigo-600 w-[35px] h-[35px] absolute right-3 bottom-2 items-center justify-center flex text-white font-normal text-2xl cursor-pointer hover:bg-indigo-800'
                onClick={() => handleClick(product)}
              >
                +
              </span>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center min-h-[120px] w-full'>
            <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className='opacity-25' cx="12" cy="12" r="10" stroke="#783DFF" strokeWidth="4"></circle>
              <path className='opacity-75' fill="#783DFF" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )
      }
    </>
  )
}

export default Products