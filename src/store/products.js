import axios from 'axios'

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
    const response = await axios.get('https://tinyshop.com.ar/wp-json/wp/v2/categories' )

    if (response.status === 200) {

      const orderedCategories = [...response.data].sort((a, b) => a.acf.menu_order - b.acf.menu_order)
      const categories = orderedCategories.filter(cat => cat.acf.active === true)

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
            message: 'Error'
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
