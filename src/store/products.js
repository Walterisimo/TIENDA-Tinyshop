import axios from 'axios'

// Data Initial
const initData = {
  loading: false,
  all: [],
  single: {},
  categories: [],
  alert: {
    type: null,
    message: null
  }
}

// Types
const LOADING = 'LOADING'
const ERROR_PRODUCTS = 'ERROR_PRODUCTS'
const SUCCESS_PRODUCTS = 'SUCCESS_PRODUCTS'

// Reducer
export default function productsReducer (state = initData, action ) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case ERROR_PRODUCTS:
      return {...initData, alert: action.payload.alert}
    case SUCCESS_PRODUCTS:
      return {...state, loading: false, all: action.payload.all}
    default:
      return {...state}
  }
}

// Actions
export const getProductsAction = ( ) => async ( dispatch ) => {
  dispatch({
    type: LOADING
  })

  try {
    const response = await axios.get('https://demo.tinyshop.com.ar/wp-json/wc/v3/products?per_page=100', { 
      auth: {
        username: 'ck_d53e87e3529e6bf1c4fc479bfd839e10bb609579',
        password: 'cs_b553c25f982fddffcf6c139b9eab112bfdb8ae4e'
      },
     })
    console.log(response.data)
    if (response) {
      dispatch({
        type: SUCCESS_PRODUCTS,
        payload: {
          all: response.data
        }
      })
    } else {
      dispatch({
        type: ERROR_PRODUCTS,
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
      type: ERROR_PRODUCTS,
      payload: {
        alert: {
          type: 'error',
          message: error
        }
      }
    })
  }
}
