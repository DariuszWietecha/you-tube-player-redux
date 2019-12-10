import { push } from "connected-react-router";
import fetch from "cross-fetch";
import { fromNullable } from "fp-ts/lib/Option";
import * as commonTypes from "../commonTypes";
import * as types from "./types";

export const queryChange = (query: string): types.IQueryChangeAction => {
  return {
    query,
    type: "QUERY_CHANGE",
  };
};

export const clearQuery = (): types.IClearQueryAction => {
  return {
    type: "CLEAR_QUERY",
  };
};

export const requestQuery = (query: string): types.IRequestQueryAction => ({
  query,
  type: "REQUEST_QUERY",
});

export const receiveQuery = (json: commonTypes.ISearchListSearchResponse): types.IReceiveQueryAction => ({
  nextPageToken: json.nextPageToken,
  type: "RECEIVE_QUERY",
  videos: json.items,
});

export const fetchQuery = (query: string,
                           nextPageToken?: string,
 ): commonTypes.DispatchAction =>
  async (dispatch, getState) => {
    if (typeof nextPageToken === "undefined") {
      dispatch(resetSearchResults());
    }
    dispatch(requestQuery(query));
    // TODO: check if has issues like axios
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    const params: types.IFetchParams = {
      key: "AIzaSyC0MQX8fF-4QGAVSDCijzHfgibnGeBVlzs",
      maxResults: "12",
      part: "snippet",
      q: query,
      type: "video",
    };

    if (nextPageToken) {
      params.pageToken = nextPageToken;
    }

    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

    return fetch(url.toJSON())
      .then(
        (response) => response.json(),
        (error) => { throw new Error(`An error occurred, ${error}`); },
      )
      .then((json) => {
        const stateAfterFetch = getState();
        dispatch(push(stateAfterFetch.url));
        dispatch(receiveQuery(json));
      });
  };

export const selectVideoSetUrl = (video: commonTypes.ISearchResource,
                                  index: number,
                                  node?: any): commonTypes.DispatchAction =>
  async (dispatch, getState) => {
    dispatch(selectVideo(video, index));
    const stateAfterSelectVideo = getState();
    dispatch(push(stateAfterSelectVideo.url));
  };

export const selectVideo = (video: commonTypes.ISearchResource,
                            index: number): types.ISelectVideoAction => ({
    index,
    selectedVideo: video,
    type: "SELECT_VIDEO",
  });

export const selectPrevVideoSetUrl = (searchResults: commonTypes.ISearchResource[],
                                      index?: number): commonTypes.DispatchAction =>
  async (dispatch) => {
    fromNullable(index)
      .map((i) => {
        let newVideoIndex = i;
        newVideoIndex--;
        return dispatch(selectVideoSetUrl(searchResults[newVideoIndex], newVideoIndex));
      })
      .getOrElseL(() => { throw new Error("Index is not defined"); });
  };

export const  selectNextVideoSetUrl = (searchResults: commonTypes.ISearchResource[],
                                       index?: number): commonTypes.DispatchAction =>
  async (dispatch, getState) => {
    return fromNullable(index)
      .map((i) => {
    let newVideoIndex = i;
    newVideoIndex++;
    if (typeof searchResults[newVideoIndex] === "undefined") {
      const stateBeforeFetch = getState();
      return dispatch(fetchQuery(stateBeforeFetch.query,
        stateBeforeFetch.searchResults.nextPageToken,
        ))
        .then(() => {
          const stateAfterFetch = getState();
          return dispatch(selectVideoSetUrl(stateAfterFetch.searchResults.items[newVideoIndex], newVideoIndex));
        });
    } else {
      return dispatch(selectVideoSetUrl(searchResults[newVideoIndex], newVideoIndex));
    }
  })
  .getOrElseL(() => { throw new Error("Index is not defined"); });
  };

export const more = (): commonTypes.DispatchAction =>
  async (dispatch, getState) => {
    const stateBeforeFetch = getState();
    return dispatch(fetchQuery(stateBeforeFetch.query,
       stateBeforeFetch.searchResults.nextPageToken,
      ));
  };

export const unselectVideoSetUrl = (query: string): commonTypes.DispatchAction =>
  async (dispatch, getState) => {
    dispatch(unselectVideo(query));
    const state = getState();
    dispatch(push(state.url));
  };

export const unselectVideo = (query: string): types.IUnselectVideoAction => ({
  query,
  type: "UNSELECT_VIDEO",
});

export const resetSetUrl = (): commonTypes.DispatchAction =>
  async (dispatch, getState) => {
    dispatch(clearQuery());
    dispatch(resetSearchResults());
    const stateAfterResetSearchResults = getState();
    dispatch(push(stateAfterResetSearchResults.url));
  };

export const resetSearchResults = (): types.IResetSearchResultsAction => ({
  type: "RESET_SEARCH_RESULTS",
});
