import { Action } from "redux";
import * as commonTypes from "../commonTypes";

export interface IFetchParams {
  [key: string]: string;
}

export const QUERY_CHANGE = "QUERY_CHANGE";
export const CLEAR_QUERY = "CLEAR_QUERY";
export const REQUEST_QUERY = "REQUEST_QUERY";
export const RECEIVE_QUERY = "RECEIVE_QUERY";
export const SELECT_VIDEO = "SELECT_VIDEO";
export const UNSELECT_VIDEO = "UNSELECT_VIDEO";
export const RESET_SEARCH_RESULTS = "RESET_SEARCH_RESULTS";

export interface IQueryChangeAction extends Action {
  type: typeof QUERY_CHANGE;
  query: string;
}

export interface IClearQueryAction extends Action {
  type: typeof CLEAR_QUERY;
}

export interface IRequestQueryAction extends Action {
  type: typeof REQUEST_QUERY;
  query: string;
}

export interface IReceiveQueryAction extends Action {
  nextPageToken: string;
  type: typeof RECEIVE_QUERY;
  videos: commonTypes.ISearchResource[];
}

export interface ISelectVideoAction extends Action {
  index: number;
  selectedVideo: commonTypes.ISearchResource;
  type: typeof SELECT_VIDEO;
}

export interface IUnselectVideoAction extends Action {
  type: typeof UNSELECT_VIDEO;
  query: string;
}

export interface IResetSearchResultsAction extends Action {
  type: typeof RESET_SEARCH_RESULTS;
}
