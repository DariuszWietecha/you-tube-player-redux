import fetch from 'cross-fetch'
import { push } from 'connected-react-router'

export const queryChange = (query) => {
  return {
    type: 'QUERY_CHANGE',
    query
  }
}

export const requestQuery = (query) => ({
  type: 'REQUEST_QUERY',
  query
})

export const receiveQuery = (json) => ({
  type: 'RECEIVE_QUERY',
  videos: json.items,
  nextPageToken: json.nextPageToken
})

export function fetchQuery(query, nextPageToken) {
  return (dispatch, getState) => {
    dispatch(requestQuery(query))
    // TODO: check if has issues like axios
    const url = new URL('https://www.googleapis.com/youtube/v3/search')
    const params = {
      key: 'AIzaSyC0MQX8fF-4QGAVSDCijzHfgibnGeBVlzs',
      maxResults: 12,
      part: 'snippet',
      q: query,
      type: 'video'
    }

    if (nextPageToken) {
      params.pageToken = nextPageToken
    }

    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

    return fetch(url)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json => {
        const state = getState()
        dispatch(push(state.url))
        dispatch(receiveQuery(json))
      })
  }
}

export function selectVideoSetUrl(video, index) {
  return (dispatch, getState) => {
    dispatch(selectVideo(video, index))
    const state = getState()    
    dispatch(push(state.url))
  }
}

export const selectVideo = (video, index) => ({
  type: 'SELECT_VIDEO',
  selectedVideo: video,
  index
})

export function selectPrevVideoSetUrl(searchResults, index) {
  return (dispatch) => {
    let newVideoIndex = index
      newVideoIndex--
    dispatch(selectVideoSetUrl(searchResults[newVideoIndex], newVideoIndex))
  }
}

export function selectNextVideoSetUrl(searchResults, index) {
  return (dispatch, getState) => {
    let newVideoIndex = index
    newVideoIndex++
    if (typeof searchResults[newVideoIndex] === 'undefined') {
      const state = getState()
      return dispatch(fetchQuery(state.query, state.searchResults.nextPageToken))
        .then(() => {
          const state = getState()
          return dispatch(selectVideoSetUrl(state.searchResults.items[newVideoIndex], newVideoIndex))
        })
    } else {
      return dispatch(selectVideoSetUrl(searchResults[newVideoIndex], newVideoIndex))
    }
  }
}

export function more() {
  return (dispatch, getState) => {
    const state = getState()
    return dispatch(fetchQuery(state.query, state.searchResults.nextPageToken))
  }
}

export function unselectVideoSetUrl(query) {
  return (dispatch, getState) => {
    dispatch(unselectVideo(query))
    const state = getState()    
    dispatch(push(state.url))
  }
}

export const unselectVideo = (query) => ({
  type: 'UNSELECT_VIDEO',
  query
})

export function resetSearchResultsSetUrl() {
  return (dispatch, getState) => {
    dispatch(resetSearchResults())
    const state = getState()    
    dispatch(push(state.url))
  }
}
export const resetSearchResults = () => ({
  type: 'RESET_SEARCH_RESULTS'
})
