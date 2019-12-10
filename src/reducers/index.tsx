import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import * as commonTypes from "../commonTypes";
import query from "./query";
import searchResults from "./searchResults";
import selectedVideo from "./selectedVideo";
import url from "./url";

export const rootReducer =  (history: History<any>) => combineReducers<commonTypes.IApplicationState>({
  query,
  router: connectRouter(history),
  searchResults,
  selectedVideo,
  url,
});
