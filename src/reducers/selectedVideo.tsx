import { ISelectVideoAction, IUnselectVideoAction} from "../actions/types";
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";

type SelectVideoActionTypes = ISelectVideoAction | IUnselectVideoAction;

const selectVideo = (state = {}, action: SelectVideoActionTypes): commonTypes.ISelectVideoState => {
  switch (action.type) {
    case actionsTypes.SELECT_VIDEO:
      return {
        index: action.index,
        video: action.selectedVideo,
      };
    case actionsTypes.UNSELECT_VIDEO:
      return {};
    default:
      return state;
  }
};

export default selectVideo;
