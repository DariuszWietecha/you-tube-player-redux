const searchResults = (state = {
  isFetching: false,
  items: []
}, action) => {
  switch (action.type) {
    case 'REQUEST_QUERY':
      return {
        ...state,
        ...{ isFetching: true }
      }
    case 'RECEIVE_QUERY':
      return {
        ...state,
        ...{
          isFetching: false,
          items: [...state.items, ...action.videos],
          nextPageToken: action.nextPageToken
        }
      }
    case 'RESET_SEARCH_RESULTS':
      return {
        ...state,
        ...{
          items: [],
          nextPageToken: null
        }
      }
    default:
      return state
  }
}

export default searchResults
