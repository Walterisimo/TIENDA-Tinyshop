import React from 'react'

const Alert = () => {
  return (
    <div className='alert--qr justify-center items-center absolute top-0 left-0 w-full h-screen z-50'>
      <div className='text-center max-w-[300px]'>
        <h3 className='font-bold text-lg mb-10'>Por el momento esta demo está disponible para dispositivos móviles.</h3>
        <p className='mb-2'>Escaneá el código QR para ver la demo:</p>
        <img src='../images/qrcode-generado.png' alt='Tinyshop QR' />
      </div>
    </div>
  )
}

export default Alert