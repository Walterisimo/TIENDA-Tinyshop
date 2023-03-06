import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import cartReducer from './cart';

import userReducer, { getUserAction } from './auth'
import productsReducer from './products'

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  auth: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore(){
  const store = createStore(rootReducer, composeEnhancers ( applyMiddleware(thunk) ) )
  getUserAction()(store.dispatch)
  return store
}