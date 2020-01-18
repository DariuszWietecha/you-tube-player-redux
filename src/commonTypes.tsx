
import { RouterState } from "connected-react-router";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export type DispatchAction<T = void> = ThunkAction<
  Promise<T>,
  IApplicationState,
  void,
  Action
>;

export interface IResource {
  kind: string;
  etag: string;
  snippet: ISnippet;
}
export interface ISearchListSearchResponse extends ISearchResponse {
  items: ISearchResource[];
}

export interface ISearchResource extends IResource {
  id: {
    kind: string;
    videoId: string;
    channelId?: string;
    playlistId?: string;
  };
}
export interface ISearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken?: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

export interface ISnippet {
  publishedAt: Date;
  channelId: string;
  title: string;
  description: string;
  thumbnails: {
    [key: string]: {
      url: string;
      width: number;
      height: number;
    },
  };
  channelTitle: string;
}

// State
export interface IApplicationState {
  query: string;
  router: RouterState;
  searchResults: ISearchResultsState;
  url: string;
}

export interface ISearchResultsState {
  isFetching: boolean;
  items: ISearchResource[];
  nextPageToken?: string;
  video?: ISearchResource;
  index?: number;
}

export function isSearchResource(obj: any): obj is ISearchResource {
  return obj.id && typeof obj.id.videoId !== "undefined";
}
