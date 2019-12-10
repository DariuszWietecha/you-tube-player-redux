import * as localforage from "localforage";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { fetchQuery, queryChange, resetSetUrl } from "../actions";
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";
import SearchDataList from "../components/SearchDataList";

interface ISearchProps {
  fetchQuery: (query: string) => commonTypes.DispatchAction;
  resetSearchResultsSetUrl: () => actionsTypes.IResetSearchResultsAction;
  selectedVideo: commonTypes.ISelectVideoState;
  query: string;
  queryChange: (query: string) => actionsTypes.IQueryChangeAction;
}

class Search extends Component<ISearchProps, {}> {
  public state = {
    searchOptions: [] as string[],
  };

  public componentDidMount() {
    return localforage.getItem("searchOptions")
      .then((searchOptions) => {
        return this.setState({searchOptions: searchOptions || []});
      });
  }

  public handleSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.updateSearchOptionsFetchQuery();
  }

  public updateSearchOptionsFetchQuery = () => {
    if (!this.state.searchOptions.includes(this.props.query)) {
      const updatedSearchOptions = [...this.state.searchOptions, ...[this.props.query]];
      localforage.setItem("searchOptions", updatedSearchOptions);
      this.setState({searchOptions: updatedSearchOptions});
    }

    this.props.fetchQuery(this.props.query);
  }

  public handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.updateSearchOptionsFetchQuery();
    }
  }

  public handleQueryChange = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.props.queryChange(event.currentTarget.value);
  }

public render() {
  if (!this.props.selectedVideo.video) {
    // let input

    return (
      <Form
      // onSubmit={e => {
      //   e.preventDefault()
      //   if (!input.value.trim()) {
      //     return
      //   }
      //   fetchQuery(input.value)
      // }}
      >
        <FormGroup>
          <div className="input-group">
            <Input
              autoFocus
              type="search"
              name="query"
              onChange={this.handleQueryChange}
              onKeyDown={this.handleKeyDown}
              value={this.props.query}
              placeholder="Search in YouTube"
              aria-describedby="button-addon4"
              list="searchHistory"
              autoComplete="off"/>
            <SearchDataList list={this.state.searchOptions} />
            {/* <input ref={node => input = node} className="form-control" aria-describedby="button-addon4" /> */}
            <div className="input-group-append" id="button-addon4">
              <Button onClick={this.handleSubmit} color="primary" outline>Search</Button>
              <Button onClick={() => this.props.resetSearchResultsSetUrl()} outline>Reset</Button>
            </div>
          </div>
        </FormGroup>
      </Form>
    );
  } else {
    return null;
  }
}
}
const mapStateToProps = (state: commonTypes.IApplicationState) => ({
  query: state.query,
  selectedVideo: state.selectedVideo,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchQuery: (query: string) => dispatch(fetchQuery(query)),
  queryChange: (query: string) => dispatch(queryChange(query)),
  resetSearchResultsSetUrl: () => dispatch(resetSetUrl()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);