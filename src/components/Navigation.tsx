import React from "react";
import { Button } from "reactstrap";
import * as commonTypes from "../commonTypes";

interface INavigationProps {
  searchResults: commonTypes.ISearchResultsState;
  selectPrevVideoSetUrl: (searchResults: commonTypes.ISearchResource[], index?: number) => commonTypes.DispatchAction;
  selectNextVideoSetUrl: (video: commonTypes.ISearchResource[], index?: number) => commonTypes.DispatchAction;
  unselectVideoSetUrl: (query: string) => commonTypes.DispatchAction;
  query: string;
}

const Navigation = (props: INavigationProps) => {
  const disabledPrev = props.searchResults.index === 0;

  if (typeof props.searchResults.index !== "undefined") {
    return (
      <div className="row justify-content-end">
        <div className="col mb-3 text-right">
          <span className={props.searchResults.items.length > 1 ? "" : "d-none"}>
            <Button
              className="mr-2"
              color="info"
              disabled={disabledPrev}
              onClick={() => props.selectPrevVideoSetUrl(props.searchResults.items, props.searchResults.index)}
              outline>Prev</Button>
            <Button
              className="mr-4"
              color="info"
              onClick={() => props.selectNextVideoSetUrl(props.searchResults.items, props.searchResults.index)}
              outline>Next</Button>
          </span>
          <Button onClick={() => props.unselectVideoSetUrl(props.query)} outline>Back</Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Navigation;
