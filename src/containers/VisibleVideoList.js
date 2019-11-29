import { connect } from 'react-redux'
import { more, selectVideoSetUrl } from '../actions'
import VideoList from '../components/VideoList'

const mapStateToProps = state => ({
  videos: state.searchResults.items,
  selectedVideo: state.selectedVideo.video
})

const mapDispatchToProps = dispatch => ({
  more: () => dispatch(more()),
  selectVideoSetUrl: (video, index) => dispatch(selectVideoSetUrl(video, index))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList)
