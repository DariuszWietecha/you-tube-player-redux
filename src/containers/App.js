import 'bootstrap/dist/css/bootstrap.css'
import { Container, Jumbotron } from 'reactstrap'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchQuery, queryChange } from '../actions'
import VisibleNavigation from './VisibleNavigation'
import Search from './Search'
import Video from './VisibleVideo'
import VisibleVideoList from './VisibleVideoList'

class App extends Component {
  componentDidMount() {
    if (typeof this.props.match.params.query !== "undefined") {
      this.props.dispatch(queryChange(this.props.match.params.query))
      this.props.dispatch(fetchQuery(this.props.match.params.query))
    }
  }

  render() {
    return (
      <Container>
        <Jumbotron className="mt-4">
          <div className="display-4 mb-4 text-center">
            You Tube Player rcmodelreviews
          </div>
          <VisibleNavigation></VisibleNavigation>
          <Search></Search>
          <Video history={this.props.history}></Video>
          <VisibleVideoList></VisibleVideoList>
        </Jumbotron>
      </Container >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchQuery: (query) => dispatch(fetchQuery(query)),
  queryChange: (query) => dispatch(queryChange(query)),
})

export default connect(mapDispatchToProps)(App)

