import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserAction } from '../store/auth'

const Login = () => {

  const dispatch = useDispatch()
  const store = useSelector(store => store.auth)
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ pass, setPass ] = useState('')
  const [ errors, setErrors ] = useState({ email: false, pass: false })
  const [ alert, setAlert ] = useState({ type: null, message: null })

  const handleForm = e => {
    e.preventDefault()

    if (!email.trim()) {
      setErrors({...errors, email: true})
    }
    if (!pass.trim()) {
      setErrors({...errors, pass: true})
    }
    if (errors.email || errors.pass) {
      return
    }

    setErrors({email: false, pass: false})
    dispatch(loginUserAction(email, pass)) 
  }

  useEffect(() => {
    const controlAlert = () => {
      if ( store.user ) {
        navigate('/dashboard')
      } else {
        if(store.alert){
          switch (store.alert.message) {
            case 'auth/invalid-email':
              setAlert({ type: store.alert.type, message: 'El correo no es válido.'})
              break;
            case 'auth/user-not-found':
              setAlert({ type: store.alert.type, message: 'El correo no está registrado.'})
              break;
            case 'auth/wrong-password':
              setAlert({ type: store.alert.type, message: 'La contraseña es incorrecta.'})
              break;
            default:
              setAlert({ type: store.alert.type, message: 'Revisá los campos y intentá de nuevo.'})
              break;
          }
        }
      }
    }

    controlAlert()
  }, [dispatch, store])

  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900 min-h-screen'>
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen lg:py-0'>
          <a href='#' className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
            <img className='h-8 mr-2' src='../images/Tiny-Shop-color.svg' alt='logo' />
          </a>
          <div className='w-full bg-white rounded shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                Iniciá sesión con tu cuenta
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleForm}>
                {
                  alert.type === 'warning' && 
                  <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 mb-3" role="alert">
                    <p className="font-bold">Atención.</p>
                    <p>{ alert.message }</p>
                  </div>
                }
                <div>
                  <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>E-mail</label>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='correo@email.com'
                    required=''
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                  <span className={`input-error ${errors.email ? 'flex' : 'hidden'}`}>
                    Tenes que ingresar tu E-mail
                  </span>
                </div>
                <div>
                  <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Contraseña</label>
                  <input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    required=''
                    onChange={e => setPass(e.target.value)}
                    value={pass}
                  />
                  <span className={`input-error ${errors.pass ? 'flex' : 'hidden'}`}>
                    Tenes que ingresar tu contraseña
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'> </div>
                  <a href='#' className='text-sm font-medium text-primary-600 hover:underline dark:text-primary-500'>¿Olvidaste tu contraseña?</a>
                </div>
                <button type='submit' className='bg-indigo-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>Ingresar</button>
                <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                  No tenés cuenta? <a href='#' className='font-medium text-primary-600 hover:underline dark:text-primary-500'>Solicitá tu cuenta</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login