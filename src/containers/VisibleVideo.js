import { connect } from 'react-redux'
import Video from '../components/Video'

const mapStateToProps = (state) => ({ video: state.selectedVideo.video })

export default connect(mapStateToProps)(Video)
