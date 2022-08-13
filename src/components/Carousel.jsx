import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Button from './Button';

const Carousel = ( { type } ) => {

  const toScroll = element => {
    console.log(element)
  }

  if(type === 'main') {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000
    }
    return (
      <Slider {...settings}>
        <div className='relative mt-3 w-full h-[200px] md:h-[250px] lg:h-[450px] 2xl:h-[550px]'>
          <img src='../images/banner-2-1.jpeg' className='w-full object-cover object-center block h-full' alt='Hamburguesas de la casa' />
          <div className='absolute top-0 h-full flex flex-col justify-center w-full px-4'>
            <h1 className='text-xl font-bold mb-2 max-w-[30%] leading-5'>Hamburguesas de la casa</h1>
            <p className='font-light text-sm mb-2 max-w-[50%]'>Una versión con nuestras salsas especiales</p>
            <Button
              text={'Ver hamburguesas'}
              clase={'max-w-[150px] bg-indigo-600 rounded text-white text-xs py-1 uppercase'}
              action={() => toScroll('hamburguesas')}
              type={'button'}
            />
          </div>
        </div>
        <div className='relative mt-4 w-full h-[200px] md:h-[250px] lg:h-[450px] 2xl:h-[550px]'>
          <img src='../images/banner-1.jpeg' className='w-full object-cover object-center block h-full' alt='Nuestras pastas' />
          <div className='absolute top-0 h-full flex flex-col justify-center w-full px-4'>
            <h1 className='text-xl font-bold mb-2 max-w-[30%] leading-5'>Nuestras pastas</h1>
            <p className='font-light text-sm mb-2 max-w-[50%]'>Probá las mejores pastas caseras</p>
            <Button
              text={'Ver pastas'}
              clase={'max-w-[150px] bg-indigo-600 rounded text-white text-xs py-1 uppercase'}
              action={() => toScroll('hamburguesas')}
              type={'button'}
            />
          </div>
        </div>
      </Slider>
    )
  } else {
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: true,
      autoplaySpeed: 4000
    }

    return (
      <Slider {...settings}>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/burgers-03.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Hamburguesas</h3>
        </div>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/snaks-09.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Snacks</h3>
        </div>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/pizza-04.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Pizzas</h3>
        </div>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/hotdog-06.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Panchos</h3>
        </div>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/empanadas-07.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Empanadas</h3>
        </div>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/pasta-11.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Pastas</h3>
        </div>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/drinks-08.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Bebidas</h3>
        </div>
        <div className='mt-3 text-center'>
          <img src='https://demo.tinyshop.com.ar/wp-content/uploads/2022/06/postres-10.png' className='w-[75px] md:w-[90px] mx-auto mb-2' alt='Hamburguesas' />
          <h3 className='text-md font-bold mb-2'>Postres</h3>
        </div>
      </Slider>
    )
  }

}

export default Carousel