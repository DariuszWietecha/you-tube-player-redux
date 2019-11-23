const query = (state = [], action) => {
  switch (action.type) {
    case 'QUERY':
      return {query: action.query}
    default:
      return state
  }
}

export default query
