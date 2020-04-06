import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import App from "./App";
import { routerTestProps } from "./routerTestProps";

describe("App container", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore(
    {
      query: "query",
      searchResults: {
        index: 0,
        isFetching: false,
        items: [],
      },
    },
  );
  const { history, location, match } = routerTestProps("/:query?", { query: "query" });

  const props = {
    fetchQuery: jest.fn(),
    history,
    isFetching: false,
    location,
    match,
    queryChange: jest.fn(),
    resetSetUrl: jest.fn(),
  };

  it("Start view", () => {
    const component = renderer.create(
      <Provider store={store}>
        <App {...props} />
      </Provider>);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
