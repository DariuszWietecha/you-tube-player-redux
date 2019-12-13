import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";
import { fetchQuery, queryChange, resetSetUrl } from "../actions";
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";
import {DivWithPointer, Overlay} from "../components/SimpleStyledComponents";
import Search from "./Search";
import VisibleNavigation from "./VisibleNavigation";
import Video from "./VisibleVideo";
import VisibleVideoList from "./VisibleVideoList";

interface IMatchParams {
  query: string;
}

interface IAppProps extends RouteComponentProps<IMatchParams> {
  isFetching: boolean;
  fetchQuery: (query: string) => commonTypes.DispatchAction;
  queryChange: (query: string) => actionsTypes.IQueryChangeAction;
  resetSetUrl: () => actionsTypes.IQueryChangeAction;
}

class App extends Component<IAppProps, {}> {
  public componentDidMount() {
    if (typeof this.props.match.params.query !== "undefined") {
      this.props.fetchQuery(this.props.match.params.query);
      this.props.queryChange(this.props.match.params.query);
    }
  }

  public render() {
    return (
      <div>
        <Overlay isFetching={this.props.isFetching}>
          <div>
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </Overlay>
        <Container className="pt-4">
          <Jumbotron>
            <DivWithPointer className="display-4 mb-4 text-center" onClick={this.props.resetSetUrl} role="button">
              You Tube Player
            </DivWithPointer>
            <VisibleNavigation></VisibleNavigation>
            <Search></Search>
            <Video></Video>
            <VisibleVideoList></VisibleVideoList>
          </Jumbotron>
        </Container >
      </div>
    );
  }
}

const mapStateToProps = (state: commonTypes.IApplicationState) => ({
  isFetching: state.searchResults.isFetching,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchQuery: (query: string) => dispatch(fetchQuery(query)),
  queryChange: (query: string) => dispatch(queryChange(query)),
  resetSetUrl: () => dispatch(resetSetUrl()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
