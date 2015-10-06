import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { SEARCHSTART, SEARCHSUCCESS, SEARCHFAILED, SETQUERY, SAVEQUERY, PAGEFORWARD, PAGEBACKWARD, SETFILTER } from './actionCreators'
import thunkMiddleware from 'redux-thunk'
import createEngine from 'redux-storage/engines/localStorage'
import storage from 'redux-storage'

const engine = createEngine('searchState')
const storageMiddleware = storage.createMiddleware(engine)
// Define store shape
const initialState = {
  isFetching: false,
  fetchFailed: false,
  message: '',
  hits: [],
  total: 0,
  page: 0,
  query: {
    Text: '',
    Take: 10,
    Skip: 0,
    Order: '',
    MinDate: '1970-01-01',
    Type: '',
    Extensions: []
  }
}

const createStoreWithMiddleware = compose(
  applyMiddleware(storageMiddleware, thunkMiddleware)
)(createStore)

function findReducer (state = initialState, action) {
  switch (action.type) {
    case SEARCHSTART:
      return Object.assign({}, state, {
        isFetching: true,
        fetchFailed: false
      })
    case SEARCHSUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        fetchFailed: false,
        message: action.message,
        hits: action.response.Hits,
        total: action.response.Total,
        query: action.query
      })
    case SEARCHFAILED:
      return Object.assign({}, state, {
        isFetching: false,
        fetchFailed: true,
        message: action.message,
      })
    case SAVEQUERY:
      return Object.assign({}, state, {
        prevQuery: state.query
      })
    default:
      return state
  }
}

const reducer = storage.reducer(findReducer)

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
var store = createStoreWithMiddleware(reducer)
const load = storage.createLoader(engine)
load(store)

export default store
