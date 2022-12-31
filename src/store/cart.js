// Data Initial
const initData = {
  loadingCart: false,
  cart: [],
  shipping: 0,
  total: 0
}

// Types
const LOADING_CART = 'LOADING_CART'
const ADD_ITEM_CART = 'ADD_ITEM_CART'
const UPDATE_ITEM_CART = 'UPDATE_ITEM_CART'

// Reducer
export default function cartReducer (state = initData, action ) {
  switch (action.type) {
    case LOADING_CART:
      return {...state, loadingCart: true}
    case ADD_ITEM_CART:
      return {...state, loadingCart: false, cart: [...state.cart, action.payload.item], total: action.payload.total}
    case UPDATE_ITEM_CART:
      return {...state, loadingCart: false, cart: action.payload.cart, total: action.payload.total}
    default:
      return {...state}
  }
}

// Actions
export const addToCart = ( item, quantity ) => async ( dispatch, getState ) => {
  dispatch({
    type: LOADING_CART
  })

  const product = {
    id: item.id,
    name: item.name,
    price: item.price,
    photo: item.images[0].src,
    sale_price: item.sale_price,
    quantity: quantity,
    subtotal: item.price * quantity
  }

  const total = getState().cart.total + product.subtotal

  dispatch({
    type: ADD_ITEM_CART,
    payload: {
      item: product,
      total: total
    }
  })
}

export const deleteItem = ( id, subtotal ) => async ( dispatch, getState ) => {
  dispatch({
    type: LOADING_CART
  })

  const products = getState().cart.cart.filter(item => item.id !== id)
  const total = getState().cart.total - subtotal

  dispatch({
    type: UPDATE_ITEM_CART,
    payload: {
      cart: products,
      total: total
    }
  })
}

export const updateItem = ( item, subtotal, quantity ) => async ( dispatch, getState ) => {
  dispatch({
    type: LOADING_CART
  })

  const products = getState().cart.cart.filter(product => product.id !== item.id)
  let product = {}
  let carrito = []
  let total = getState().cart.total - subtotal

  if (quantity) {
    product = {
      id: item.id,
      name: item.name,
      price: item.price,
      photo: item.photo,
      sale_price: item.sale_price,
      quantity: quantity,
      subtotal: item.price * quantity
    }
    carrito = [...products, product]
    total = total + product.subtotal
  } else {
    carrito = products
  }


  dispatch({
    type: UPDATE_ITEM_CART,
    payload: {
      cart: carrito,
      total: total
    }
  })
}
