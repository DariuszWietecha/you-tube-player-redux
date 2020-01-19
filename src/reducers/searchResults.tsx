
import { LOCATION_CHANGE, LocationChangeAction } from "connected-react-router";
import * as he from "he";
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";

type SearchResultsActionTypes = actionsTypes.IRequestQueryAction |
  actionsTypes.IReceiveQueryAction |
  actionsTypes.IResetSearchResultsAction | actionsTypes.ISelectVideoAction |
  actionsTypes.IUnselectVideoAction | actionsTypes.IResetSearchResultsAction |
  LocationChangeAction;

const searchResults = (
  state = { isFetching: false, items: [] as commonTypes.ISearchResource[] },
  action: SearchResultsActionTypes): commonTypes.ISearchResultsState => {
  switch (action.type) {
    case actionsTypes.REQUEST_QUERY:
      return {
        ...state,
        ...{ isFetching: true },
      };
    case actionsTypes.RECEIVE_QUERY:
      const videos = action.videos.map((item) => {
        item.snippet.title = he.decode(item.snippet.title);
        return item;
      }, [] as commonTypes.ISearchResource[]);
      return {
        ...state,
        ...{
          isFetching: false,
          items: [...state.items, ...videos],
          nextPageToken: action.nextPageToken,
        },
      };
    case actionsTypes.RESET_SEARCH_RESULTS:
      return {
        ...state,
        ...{
          index: undefined,
          items: [],
          nextPageToken: "",
          video: undefined,
        },
      };
    case actionsTypes.SELECT_VIDEO:
      return {
        ...state,
        ...{
          index: action.index,
          video: action.selectedVideo,
        },
      };
    case actionsTypes.UNSELECT_VIDEO:
      return {
        ...state,
        ...{ video: undefined },
      };
    case LOCATION_CHANGE:
      const videoId = action.payload.location.pathname.replace("/", "");
      let index;
      const video = state.items.find((item, itemIndex) => {
        if (item.id.videoId === videoId) {
          index = itemIndex;
          return true;
        }
        return false;
      });
      if (video) {
        return {
          ...state,
          ...{
            index,
            video,
          },
        };
      } else {
        return {
          ...state,
          ...{
            video: undefined,
          },
        };
      }
    default:
      return state;
  }
};

export default searchResults;
