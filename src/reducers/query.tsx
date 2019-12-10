
import { IClearQueryAction, IQueryChangeAction } from "../actions/types";
import * as actionsTypes from "../actions/types";

type QueryActionTypes = IQueryChangeAction | IClearQueryAction;

const query = (state: string = "", action: QueryActionTypes): string => {
  switch (action.type) {
    case actionsTypes.QUERY_CHANGE:
      return action.query;
    case actionsTypes.CLEAR_QUERY:
      return "";
    default:
      return state;
  }
};

export default query;
