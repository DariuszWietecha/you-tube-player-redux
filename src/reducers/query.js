const query = (state = '', action) => {
  switch (action.type) {
    case 'QUERY_CHANGE':
      return action.query
    case 'RESET_SEARCH_RESULTS':
      return ''
    default:
      return state
  }
}

export default query
