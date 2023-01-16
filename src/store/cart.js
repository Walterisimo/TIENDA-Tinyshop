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
      return {...state, loadingCart: false, cart: action.payload.cart, total: action.payload.total}
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
    title: item.title,
    price: item.price,
    photo: item.photo.url,
    sale_price: item.sale_price,
    quantity: quantity,
    subtotal: item.price * quantity,
    order: getState().cart.cart.length + 1
  }

  const total = getState().cart.total + product.subtotal
  let products = getState().cart.cart
  products = [...products, product]
  const shorted = [...products].sort((a, b) => {
    return b.order - a.order;
  })

  dispatch({
    type: ADD_ITEM_CART,
    payload: {
      cart: shorted,
      total: total
    }
  })
}

export const updateItem = ( item, subtotal, quantity ) => async ( dispatch, getState ) => {
  dispatch({
    type: LOADING_CART
  })

  console.log(subtotal)
  const products = getState().cart.cart.filter(product => product.id !== item.id)
  let product = {}
  let carrito = []
  let total = getState().cart.total - subtotal
  // console.log(total)

  if (quantity) {
    product = {
      id: item.id,
      title: item.title,
      price: item.price,
      photo: item.photo,
      sale_price: item.sale_price,
      quantity: quantity,
      subtotal: item.price * quantity,
      order: item.order
    }
    carrito = [...products, product]
    total = total + product.subtotal
  } else {
    carrito = products
  }

  const shorted = [...carrito].sort((a, b) => {
    return b.order - a.order;
  })

  dispatch({
    type: UPDATE_ITEM_CART,
    payload: {
      cart: shorted,
      total: total
    }
  })
}
