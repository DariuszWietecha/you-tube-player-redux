const url = (state = '/', action) => {
  switch (action.type) {
    case 'REQUEST_QUERY':
    case 'UNSELECT_VIDEO':
      return "/" + action.query
    case 'RESET_SEARCH_RESULTS':
      return '/'
    case 'SELECT_VIDEO':
      return '/' + action.selectedVideo.id.videoId
    default:
      return state
  }
}

export default url
