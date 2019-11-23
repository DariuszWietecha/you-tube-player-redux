import { combineReducers } from 'redux'
import query from './query'
import searchResults from './searchResults'

export default combineReducers({
  query,
  searchResults
})