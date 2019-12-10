import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";
import styled from "styled-components";
import { fetchQuery, queryChange, resetSetUrl } from "../actions";
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";
import Search from "./Search";
import VisibleNavigation from "./VisibleNavigation";
import Video from "./VisibleVideo";
import VisibleVideoList from "./VisibleVideoList";

interface IMatchParams {
  query: string;
}
interface IOverlayParams {
  isFetching: boolean;
}

interface IAppProps extends RouteComponentProps<IMatchParams> {
  isFetching: boolean;
  fetchQuery: (query: string) => commonTypes.DispatchAction;
  queryChange: (query: string) => actionsTypes.IQueryChangeAction;
  resetSetUrl: () => actionsTypes.IQueryChangeAction;
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  visibility: ${(props: IOverlayParams) => props.isFetching ? "visible" : "hidden"};
  z-index: 1;

  .spinner-border {
    position: absolute;
    top: 50%;
  }
`;
const Logo = styled.div`
  cursor: pointer
`;

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
            <Logo className="display-4 mb-4 text-center" onClick={() => this.props.resetSetUrl()} role="button">
              You Tube Player rcmodelreviews
            </Logo>
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
