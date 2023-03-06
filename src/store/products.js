// import axios from 'axios'
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../app/firebaseConfig'

// Data Initial
const initData = {
  loading: false,
  categories: [],
  single: {},
  alert: {
    type: null,
    message: null
  }
}

// Types
const LOADING_CATEGORIES = 'LOADING_CATEGORIES'
const ERROR_CATEGORIES = 'ERROR_CATEGORIES'
const SUCCESS_CATEGORIES = 'SUCCESS_CATEGORIES'

// Reducer
export default function productsReducer (state = initData, action ) {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return {...state, loading: true}
    case ERROR_CATEGORIES:
      return {...initData, alert: action.payload.alert}
    case SUCCESS_CATEGORIES:
      return {...state, loading: false, categories: action.payload.categories}
    default:
      return {...state}
  }
}

// Actions
export const getProductsAction = ( ) => async ( dispatch ) => {
  dispatch({
    type: LOADING_CATEGORIES
  })
  try {
    const docRef = doc(db, 'companies', 'o6xpgccuz77tTKwwXSEm');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data().categories)

        const orderedCategories = [...docSnap.data().categories].sort((a, b) => a.menu_order - b.menu_order)
        const categories = orderedCategories.filter(cat => cat.active === true)
  
        dispatch({
          type: SUCCESS_CATEGORIES,
          payload: {
            categories: categories
          }
        })
    } else {
      dispatch({
        type: ERROR_CATEGORIES,
        payload: {
          alert: {
            type: 'error',
            message: 'No such document!'
          }
        }
      })
    }

  } catch (error) {
    dispatch({
      type: ERROR_CATEGORIES,
      payload: {
        alert: {
          type: 'error',
          message: error
        }
      }
    })
  }
}
