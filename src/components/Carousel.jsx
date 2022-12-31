import React from 'react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import Button from './Button';

const Carousel = ( { type, array, action } ) => {

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
  } else if ( array ){
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay: false,
      autoplaySpeed: 4000
    }
    return (
      <Slider {...settings}>
        {
          array.map(category => (
            <div className='mt-3 text-center cursor-pointer' key={category.id} onClick={() => action(category.slug)}>
              { category.image &&
                (
                  <img src={category.image.src} className='w-[75px] md:w-[90px] mx-auto mb-2' alt={category.name} />
                )
              }
              <h3 className='text-md font-bold mb-2'>{category.name}</h3>
            </div>
          ))
        }
      </Slider>
    )
  }

}

export default Carousel