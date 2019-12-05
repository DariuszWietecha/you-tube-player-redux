
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";

type SearchResultsActionTypes = actionsTypes.IRequestQueryAction |
actionsTypes.IReceiveQueryAction |
actionsTypes.IResetSearchResultsAction;

const searchResults = (state = { isFetching: false, items: [] as commonTypes.ISearchResource[]},
                       action: SearchResultsActionTypes): commonTypes.ISearchResultsState => {
  switch (action.type) {
    case actionsTypes.REQUEST_QUERY:
      return {
        ...state,
        ...{ isFetching: true },
      };
    case actionsTypes.RECEIVE_QUERY:
      return {
        ...state,
        ...{
          isFetching: false,
          items: [...state.items, ...action.videos],
          nextPageToken: action.nextPageToken,
        },
      };
    case actionsTypes.RESET_SEARCH_RESULTS:
      return {
        ...state,
        ...{
          items: [],
          nextPageToken: "",
        },
      };
    default:
      return state;
  }
};

export default searchResults;
