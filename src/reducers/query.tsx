
import { IQueryChangeAction, IResetSearchResultsAction } from "../actions/types";
import * as actionsTypes from "../actions/types";

type QueryActionTypes = IQueryChangeAction | IResetSearchResultsAction;

const query = (state: string = "", action: QueryActionTypes): string => {
  switch (action.type) {
    case actionsTypes.QUERY_CHANGE:
      return action.query;
    case actionsTypes.RESET_SEARCH_RESULTS:
      return "";
    default:
      return state;
  }
};

export default query;
