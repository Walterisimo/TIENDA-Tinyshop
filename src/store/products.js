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
  const token = 'a298cb46143a50a5285911b61ac5dc1f613081f40eee7dbf6f5a001ee736556a5790c1eb0437290c627daad11eb6386cdbeb3926c2a473bcf2bd06c5e718004e9d5db08bac625c2b392f30e59a9e0cb2de3209df1c9de61d352f17d48584185baf83c304b6a829b7b20b8fe76918a7158288692b4ed18fc53fc097ddc9c50c48'
  const headers = {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  try {
    const categories = await axios.get('http://localhost:1337/api/categories?populate=deep,10', { headers } )

    
    if (categories.status === 200) {

      const shortCategories = [...categories.data.data].sort((a, b) => a.menu_order - b.menu_order)

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
