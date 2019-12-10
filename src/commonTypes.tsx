
import { RouterState } from "connected-react-router";
import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";

export interface IPropsWithHandleVideoSelect {
  handleVideoSelect: (
    video: ISearchResource,
    videoIndex: number) => void;
}

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

export interface IVideoResource extends IResource {
  id: string;
  // other attribs was skipped as not critical
}

export interface IApplicationState {
  query: string;
  router: RouterState<any>;
  searchResults: ISearchResultsState;
  selectedVideo: ISelectVideoState;
  url: string;
}

export interface ISearchResultsState {
  isFetching: boolean;
  items: ISearchResource[];
  nextPageToken?: string;
}

export interface ISelectVideoState {
  video?: ISearchResource;
  index?: number;
}

export type Dispatch = ThunkDispatch<IApplicationState, void, Action>;

export type DispatchAction<T = void> = ThunkAction<
  Promise<T>,
  IApplicationState,
  void,
  Action
>;

export function isResource(obj: any): obj is ISearchResource | IVideoResource {
  return typeof obj.id !== "undefined";
}

export function isSearchResource(obj: any): obj is ISearchResource {
  return obj.id && typeof obj.id.videoId !== "undefined";
}
