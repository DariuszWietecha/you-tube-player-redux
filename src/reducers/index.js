import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import query from './query'
import searchResults from './searchResults'
import selectedVideo from './selectedVideo'
import url from './url'

export default (history) => combineReducers({
  router: connectRouter(history),
  query,
  searchResults,
  selectedVideo,
  url
})
