import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers, Reducer } from "redux";
import * as commonTypes from "../commonTypes";
import query from "./query";
import searchResults from "./searchResults";
import selectedVideo from "./selectedVideo";
import url from "./url";

export const rootReducer =  (history: History<any>) => combineReducers<commonTypes.IApplicationState>({
// export const rootReducer =  (history: History<any>) => combineReducers({
  query,
  router: connectRouter(history),
  searchResults,
  selectedVideo,
  url,
});

// export type RootState = ReturnType<typeof rootReducer>;
