import { legacy_createStore as createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

// import userReducer, { getUserAction } from './auth'
import productsReducer from './products'

const rootReducer = combineReducers({
  products: productsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore(){
  const store = createStore(rootReducer, composeEnhancers ( applyMiddleware(thunk) ) )
  return store
}