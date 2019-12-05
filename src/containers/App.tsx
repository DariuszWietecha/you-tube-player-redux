import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Container, Jumbotron } from "reactstrap";
import { AnyAction} from "redux";
import { fetchQuery, queryChange } from "../actions";
import * as actionsTypes from "../actions/types";
import * as commonTypes from "../commonTypes";
import Search from "./Search";
import VisibleNavigation from "./VisibleNavigation";
import Video from "./VisibleVideo";
import VisibleVideoList from "./VisibleVideoList";

interface IMatchParams {
  query: string;
}

interface IAppProps extends RouteComponentProps<IMatchParams> {
  dispatch: (action: any) => AnyAction;
  fetchQuery: (query: string) => commonTypes.DispatchAction;
  queryChange: (query: string) => actionsTypes.IQueryChangeAction;
}

class App extends Component<IAppProps, {}> {
  public componentDidMount() {
    if (typeof this.props.match.params.query !== "undefined") {
      this.props.dispatch(queryChange(this.props.match.params.query));
      this.props.dispatch(fetchQuery(this.props.match.params.query));
    }
  }

  public render() {
    return (
      <Container>
        <Jumbotron className="mt-4">
          <div className="display-4 mb-4 text-center">
            You Tube Player rcmodelreviews
          </div>
          <VisibleNavigation></VisibleNavigation>
          <Search></Search>
          <Video></Video>
          <VisibleVideoList></VisibleVideoList>
        </Jumbotron>
      </Container >
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchQuery: (query: string) => dispatch(fetchQuery(query)),
  queryChange: (query: string) => dispatch(queryChange(query)),
});

export default connect(mapDispatchToProps)(App);
