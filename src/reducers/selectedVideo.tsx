import { IResetSearchResultsAction, ISelectVideoAction, IUnselectVideoAction} from "../actions/types";
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";

type SelectVideoActionTypes = ISelectVideoAction | IUnselectVideoAction | IResetSearchResultsAction;

const selectVideo = (state: commonTypes.ISelectVideoState = {},
                     action: SelectVideoActionTypes): commonTypes.ISelectVideoState => {
  switch (action.type) {
    case actionsTypes.SELECT_VIDEO:
      return {
        index: action.index,
        video: action.selectedVideo,
      };
    case actionsTypes.UNSELECT_VIDEO:
      return {
        index: state.index,
      };
    case actionsTypes.RESET_SEARCH_RESULTS:
      return {};
    default:
      return state;
  }
};

export default selectVideo;
