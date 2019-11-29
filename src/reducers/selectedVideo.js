const selectVideo = (state = {}, action) => {
  switch (action.type) {
    case 'SELECT_VIDEO':
      return {
        video: action.selectedVideo,
        index: action.index
      }
    case 'UNSELECT_VIDEO':
      return {}
    default:
      return state
  }
}

export default selectVideo
