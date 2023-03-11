import { 
  onAuthStateChanged,
  // createUserWithEmailAndPassword,
  // sendEmailVerification,
  signInWithEmailAndPassword
} from 'firebase/auth'
// import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { auth } from '../app/firebaseConfig'

// Data Initial
const initData = {
  loading: false,
  active: false,
  alert: {
    type: null,
    message: null
  }
}

// Types
const LOADING = 'LOADING'
const ERROR_USER = 'ERROR_USER'
const SUCCESSFULL_USER = 'SUCCESSFULL_USER'
const LOGOUT_USER = 'LOGOUT_USER'

// Reducer
export default function userReducer (state = initData, action ) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case ERROR_USER:
      return {...initData, alert: action.payload.alert}
    case SUCCESSFULL_USER:
      return {...state, loading: false, active: true, user: action.payload.user, alert: action.payload.alert}
    case LOGOUT_USER:
      return {...initData, alert: action.payload.alert}
    default:
      return {...state}
  }
}

// Actions
export const loginUserAction = ( email, pass ) => async (dispatch) => {
  dispatch({
    type: LOADING
  })

  try {
    const result = await signInWithEmailAndPassword(auth, email, pass)

    // console.log(email, pass)

    // if (result.user.uid && result.user.emailVerified) {
    if (result.user.uid) {
      const user = {
        uid: result.user.uid,
        email: result.user.email,
        // verified: result.user.emailVerified,
        name: result.user.displayName,
        // photo: result.user.photoURL
      }
      
      dispatch({
        type: SUCCESSFULL_USER,
        payload: {
          user: user,
          alert: {
            type: null,
            message: null
          }
        }
      })

    }
  } catch (error) {
    console.error(error)
    dispatch({
      type: ERROR_USER,
      payload: {
        alert: {
          type: 'warning',
          message: error.code
        }
      }
    })
  }
}

export const getUserAction = () => (dispatch) => {
  const unsusbribe = onAuthStateChanged( auth, (user) => {
    if(user) {
      dispatch({
        type: SUCCESSFULL_USER,
        payload: {
          alert: {
            type: 'success',
            message: null
          },
          user: {
            uid: user.uid,
            email: user.email,
            // verified: user.emailVerified,
            name: user.name,
            // photo: user.photoURL
          }
        }
      })
    } 
  })

  return unsusbribe()
}

export const logoutUserAction = () => (dispatch) => {
  auth.signOut()
  dispatch({
    type: LOGOUT_USER,
    payload: {
      alert: {
        type: 'success',
        message: 'Sesión cerrada con éxito'
      }
    }
  })
}