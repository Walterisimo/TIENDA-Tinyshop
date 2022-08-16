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
export const getProductsAction = ( ) => async ( dispatch, getState ) => {
  dispatch({
    type: LOADING_CATEGORIES
  })
  const headers = {
    auth: {
      username: 'ck_d53e87e3529e6bf1c4fc479bfd839e10bb609579',
      password: 'cs_b553c25f982fddffcf6c139b9eab112bfdb8ae4e'
    }
  }
  try {
    const categories = await axios.get('https://demo.tinyshop.com.ar/wp-json/wc/v3/products/categories?per_page=100', headers )
    if (categories) {

      const shortCategories = [...categories.data].sort((a, b) => a.menu_order - b.menu_order)

      dispatch({
        type: SUCCESS_CATEGORIES,
        payload: {
          categories: shortCategories
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
