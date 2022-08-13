import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex flex-row items-center justify-center p-3 bg-white mb-4 fixed w-full top-0 z-10'>
      <div className=''>
        <img src='../images/Tiny-Shop-color.svg' className='w-[140px]' alt='Tienda Tinyshop' />
      </div>
    </nav>
  )
}

export default Navbar