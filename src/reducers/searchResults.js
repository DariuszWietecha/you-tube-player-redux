const searchResults = (state = [], action) => {
  switch (action.type) {
    case 'QUERY':
      return [
        ...state,
        ...action.searchResults
      ]
    default:
      return state
  }
}

export default searchResults
