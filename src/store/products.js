// import axios from 'axios'
import { collection, query, where, getDocs, addDoc, updateDoc, doc, deleteDoc, writeBatch } from 'firebase/firestore'
import { db } from '../app/firebaseConfig'

// Data Initial
const initData = {
  loading: false,
  categories: [],
  loadingChange: false,
  alert: {
    type: null,
    message: null
  }
}

// Types
const LOADING_CATEGORIES = 'LOADING_CATEGORIES'
const LOADING_UPDATE = 'LOADING_UPDATE'
const LOADING_CHANGE_CATEGORIES = 'LOADING_CHANGE_CATEGORIES'
const ERROR_CATEGORIES = 'ERROR_CATEGORIES'
const SUCCESS_CATEGORIES = 'SUCCESS_CATEGORIES'
const ADD_CATEGORY = 'ADD_CATEGORY'
const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const SUCCESS_CHANGE_ACTIVE_CATEGORY = 'SUCCESS_CHANGE_ACTIVE_CATEGORY'
const ERROR_CHANGE_ACTIVE_CATEGORY = 'ERROR_CHANGE_ACTIVE_CATEGORY'
const DELETE_CATEGORY = 'DELETE_CATEGORY'

// Reducer
export default function productsReducer(state = initData, action) {
  switch (action.type) {
    case LOADING_CATEGORIES:
      return { ...state, loading: true, alert: { type: null, message: null } }
    case LOADING_UPDATE:
      return { ...state, isLoadingUpdate: true, alert: { type: null, message: null } }
    case LOADING_CHANGE_CATEGORIES:
      return { ...state, loadingChange: true, alert: { type: null, message: null } }
    case ERROR_CATEGORIES:
      return { ...initData, alert: action.payload.alert }
    case SUCCESS_CATEGORIES:
      return { ...state, loading: false, categories: action.payload.categories }
    case ADD_CATEGORY:
      return { ...state, loadingChange: false, categories: [...state.categories, action.payload.category] }
    case SUCCESS_CHANGE_ACTIVE_CATEGORY:
      return { ...state, loadingChange: false, categories: action.payload.categories }
    case ERROR_CHANGE_ACTIVE_CATEGORY:
      return { ...state, loadingChange: false, alert: action.payload.alert }
    case UPDATE_CATEGORY:
      return { ...state, isLoadingUpdate: false, alert: action.payload.alert }
    case DELETE_CATEGORY:
      return { ...state, alert: action.payload.alert }
    default:
      return { ...state }
  }
}

// Actions
export const getProductsAction = () => async (dispatch) => {
  dispatch({
    type: LOADING_CATEGORIES
  })
  try {

    const categoriesRef = collection(db, 'categories')
    const q = query(categoriesRef, where('company_uid', '==', 'o6xpgccuz77tTKwwXSEm'))
    const docSnap = await getDocs(q)

    const categories = await Promise.all(docSnap.docs.map(async (doc) => {
      const productsRef = collection(db, 'products')
      const qq = query(productsRef, where('category_uid', '==', doc.id))
      const docSnapshot = await getDocs(qq)

      const products = docSnapshot.docs.map((document) => ({
        ...document.data(),
        uid: document.id
      }))

      return {
        ...doc.data(),
        uid: doc.id,
        products
      }
    }))

    if (categories.length > 0) {
      const orderedCategories = [...categories].sort((a, b) => a.position - b.position)

      dispatch({
        type: SUCCESS_CATEGORIES,
        payload: {
          categories: orderedCategories
        }
      })
    } else {
      dispatch({
        type: ERROR_CATEGORIES,
        payload: {
          alert: {
            type: 'error',
            message: 'No such data!'
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

export const addCategory = (category) => async (dispatch) => {
  dispatch({
    type: LOADING_CHANGE_CATEGORIES
  })
  try {

    await addDoc(collection(db, 'categories'), {
      ...category,
      company_uid: 'o6xpgccuz77tTKwwXSEm'
    })

    dispatch({
      type: ADD_CATEGORY,
      payload: {
        category: category
      }
    })

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

export const changeActiveCategory = (cat, isActive) => async (dispatch, getState) => {
  dispatch({
    type: LOADING_CHANGE_CATEGORIES
  })

  try {

    const categoryRef = doc(db, 'categories', cat.uid)
    await updateDoc(categoryRef, {
      active: isActive
    })

    const category = {
      active: isActive,
      company_uid: cat.uid,
      position: cat.position,
      slug: cat.slug,
      date: cat.date,
      name: cat.name,
      uid: cat.uid,
      products: cat.products ? cat.products : []
    }

    let allCategories = getState().products.categories.filter(category => category.uid !== cat.uid)
    allCategories = [...allCategories, category]

    // ordenar categorias
    const orderedCategories = [...allCategories].sort((a, b) => a.position - b.position)

    dispatch({
      type: SUCCESS_CHANGE_ACTIVE_CATEGORY,
      payload: {
        categories: orderedCategories
      }
    })

  } catch (error) {
    dispatch({
      type: ERROR_CHANGE_ACTIVE_CATEGORY,
      payload: {
        alert: {
          type: 'error',
          message: error
        }
      }
    })
  }
}

export const updateCategory = (category) => async (dispatch, getState) => {
  dispatch({
    type: LOADING_UPDATE
  })

  try {

    const categoryRef = doc(db, 'categories', category.uid)
    await updateDoc(categoryRef, {
      active: category.active,
      name: category.name,
      position: category.position,
      slug: category.slug
    })

    dispatch({
      type: UPDATE_CATEGORY,
      payload: {
        alert: {
          type: 'success',
          message: 'Categoría actualizada'
        }
      }
    })

    const updatedCategory = {
      active: category.active,
      company_uid: category.uid,
      position: category.position,
      slug: category.slug,
      date: category.date,
      name: category.name,
      uid: category.uid,
      products: category.products
    }

    let allCategories = getState().products.categories.filter(cat => cat.uid !== category.uid)
    allCategories = [...allCategories, updatedCategory]

    // Ordenar categorias
    const orderedCategories = [...allCategories].sort((a, b) => a.position - b.position)

    dispatch({
      type: SUCCESS_CATEGORIES,
      payload: {
        categories: orderedCategories
      }
    })


  } catch (error) {
    console.error(error)
  }
}

export const deleteCategory = (uid) => async (dispatch, getState) => {

  try {

    console.log(uid)
    await deleteDoc(doc(db, 'categories', uid)) // Eliminar Categoría

    const productsRef = collection(db, 'products')
    const q = query(productsRef, where('category_uid', '==', uid))
    const docSnap = await getDocs(q)

    const batch = writeBatch(db)
    docSnap.docs.forEach((doc) => {
      batch.delete(doc.ref)
    });

    await batch.commit()

    dispatch({
      type: DELETE_CATEGORY,
      payload: {
        alert: {
          type: 'success',
          message: 'Eliminaste la categoría'
        }
      }
    })

    // Eliminar la categoría del store
    const allCategories = getState().products.categories.filter(cat => cat.uid !== uid)

    // Ordenar categorias
    const orderedCategories = [...allCategories].sort((a, b) => a.position - b.position)

    dispatch({
      type: SUCCESS_CATEGORIES,
      payload: {
        categories: orderedCategories
      }
    })

  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY,
      payload: {
        alert: {
          type: 'error',
          message: 'Error! Intentar más tarde'
        }
      }
    })
  }

}