const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_TO_SELECTION = '@@ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = '@@REMOVE_FROM_SELECTION'
const GET_RATES = '@@GET_RATES'
const SET_BASE = 'SET_BASE'
const SET_SORT = 'SET_SORT'
const SORT_BY_PRICE = 'SORT_BY_PRICE'
const SORT_BY_NAME = '@@SORT_BY_NAME'

const initialState = {
  list: [],
  selection: {},
  rates: {},
  base: 'EUR',
  sort: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_SELECTION:
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.id]: (state.selection[action.id] || 0) + 1
        }
      }
    case REMOVE_FROM_SELECTION: {
      const newSelection = {
        ...state.selection,
        [action.id]: state.selection[action.id] - 1
      }
      if (newSelection[action.id] <= 0) {
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
    }
    case SET_BASE:
      return { ...state, base: action.base }
    case SET_SORT:
      return { ...state, sort: action.sort }
    case GET_RATES:
      return { ...state, ...action.rates }
    case GET_PRODUCTS:
      return { ...state, list: action.list }
    case SORT_BY_PRICE: {
      const copyList = [...state.list]
      const newList = copyList.sort(function (a, b) {
        return a.price - b.price
      })
      return {
        ...state,
        list: newList
      }
    }
    case SORT_BY_NAME: {
      const copyList = [...state.list]
      const newList = copyList.sort(function (a, b) {
        if (a.title > b.title) {
          return 1
        }
        if (a.title < b.title) {
          return -1
        }
        return 0
      })
      return {
        ...state,
        list: newList
      }
    }
    default:
      return state
  }
}

export function addSelection(id) {
  return { type: ADD_TO_SELECTION, id }
}

export function removeSelection(id) {
  return { type: REMOVE_FROM_SELECTION, id }
}
export function setBase(base) {
  return { type: SET_BASE, base }
}
export function setSort(sort) {
  return { type: SET_SORT, sort }
}
export function getRates() {
  return (dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((rates) => {
        dispatch({ type: GET_RATES, rates })
      })
  }
}
export function getProducts() {
  return (dispatch) => {
    fetch('/api/v1/products')
      .then((res) => res.json())
      .then((list) => {
        dispatch({ type: GET_PRODUCTS, list })
      })
  }
}
export function sortByPrice() {
  return { type: SORT_BY_PRICE }
}
export function sortByName() {
  return { type: SORT_BY_NAME }
}
