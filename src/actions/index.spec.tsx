import nock from "nock";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./index";
import * as types from "./types";

describe.only("Actions", () => {
  describe("sync actions", () => {
    it("should create queryChange action", () => {
      const query = "query";
      const expectedAction = {
        query: "query",
        type: "QUERY_CHANGE",
      };
      expect(actions.queryChange(query)).toEqual(expectedAction);
    });
  });

  describe("Thunk actions", () => {
    const ytNock = nock("https://www.googleapis.com");

    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore();

    const result = { nextPageToken: "nextPageToken", items: [] };

    afterAll(() => {
      nock.cleanAll();
    });

    it.only("creates receiveQuery when fetchQuery has been done", () => {
      ytNock
        .get(/youtube\/v3\/search\?key=.*&maxResults=12&part=snippet&q=query&type=video/)
        .reply(200, result);

      const expectedActions = [
        { type: types.RESET_SEARCH_RESULTS },
        { type: types.REQUEST_QUERY, query: "query" },
        { type: "@@router/CALL_HISTORY_METHOD", payload: { args: [undefined], method: "push" } },
        { type: types.RECEIVE_QUERY, videos: [], nextPageToken: "nextPageToken" },
      ];

      return store.dispatch(actions.fetchQuery("query")).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
