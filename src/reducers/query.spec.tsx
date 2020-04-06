import * as actionsTypes from "../actions/types";
import queryReducer from "./query";

const queryChangeAction = {
  query: "query",
  type: actionsTypes.QUERY_CHANGE,
};
const clearQueryAction = {
  type: actionsTypes.CLEAR_QUERY,
};
const receiveQueryAction = {
  nextPageToken: "nextPageToken",
  type: actionsTypes.RECEIVE_QUERY,
  videos: [],
};

describe("query reducer", () => {
  it("should return the initial state", () => {
    expect(queryReducer(undefined, receiveQueryAction))
      .toEqual("");
  });

  it("queryChangeAction", () => {
    expect(queryReducer(undefined, queryChangeAction))
      .toEqual("query");
  });

  it("clearQueryAction", () => {
    expect(queryReducer("query", clearQueryAction))
      .toEqual("");
  });
});
