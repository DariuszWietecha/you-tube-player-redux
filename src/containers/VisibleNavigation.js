import { connect } from 'react-redux'
import { selectPrevVideoSetUrl, selectNextVideoSetUrl, unselectVideoSetUrl } from '../actions'
import Navigation from '../components/Navigation'

const mapStateToProps = state => ({
  query: state.query,
  searchResults: state.searchResults.items,
  selectedVideo: state.selectedVideo
})

const mapDispatchToProps = dispatch => ({
  selectPrevVideoSetUrl: (searchResults, index) => dispatch(selectPrevVideoSetUrl(searchResults, index)),
  selectNextVideoSetUrl: (searchResults, index) => dispatch(selectNextVideoSetUrl(searchResults, index)),
  unselectVideoSetUrl: (query) => dispatch(unselectVideoSetUrl(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
