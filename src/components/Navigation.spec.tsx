import { shallow } from "enzyme";
import React from "react";
import renderer from "react-test-renderer";
import * as commonTypes from "../commonTypes";
import { Navigation } from "./Navigation";

describe("Navigation component", () => {
  const searchResultsItem: commonTypes.ISearchResource = require("../../test/data/searchResultsItem.json");

  const props = {
    query: "query",
    searchResults: {
      index: 0,
      isFetching: false,
      items: [],
    },
    selectNextVideoSetUrl: jest.fn(),
    selectPrevVideoSetUrl: jest.fn(),
    unselectVideoSetUrl: jest.fn(),
  };

  const propsWithVideoItemFirst = {
    ...props,
    searchResults: {
      index: 0,
      isFetching: false,
      items: [searchResultsItem, searchResultsItem],
      video: searchResultsItem,
    },
  };

  const propsWithVideoItemSecond = {
    ...propsWithVideoItemFirst,
    searchResults: {
      ...propsWithVideoItemFirst.searchResults,
      index: 2,
    },
  };

  it("video item not set -> render null", () => {
    const component = renderer.create(<Navigation {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("normal view, video item is the first from the list", () => {
    const component = renderer.create(<Navigation {...propsWithVideoItemFirst} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("normal view, video item is the second from the list", () => {
    const component = renderer.create(<Navigation {...propsWithVideoItemSecond} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("calls the selectNextVideoSetUrl function when the 'Next' is clicked", () => {
    const wrapper = shallow(<Navigation {...propsWithVideoItemFirst} />);
    wrapper.find("#next").simulate("click");
    expect(propsWithVideoItemFirst.selectNextVideoSetUrl).toHaveBeenCalled();
  });
});
