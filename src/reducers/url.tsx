import * as actionsTypes from "../actions/types";

type UrlActionTypes = actionsTypes.IRequestQueryAction |
actionsTypes.IUnselectVideoAction |
actionsTypes.IResetSearchResultsAction |
actionsTypes.ISelectVideoAction;

const url = (state = "/", action: UrlActionTypes): string => {
  switch (action.type) {
    case actionsTypes.REQUEST_QUERY:
    case actionsTypes.UNSELECT_VIDEO:
      return "/" + action.query;
    case actionsTypes.RESET_SEARCH_RESULTS:
      return "/";
    case actionsTypes.SELECT_VIDEO:
      return "/" + action.selectedVideo.id.videoId;
    default:
      return state;
  }
};

export default url;
