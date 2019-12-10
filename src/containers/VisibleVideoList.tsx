import { connect } from "react-redux";
import { more, selectVideoSetUrl } from "../actions";
import * as commonTypes from "../commonTypes";
import VideoList from "../components/VideoList";

const mapStateToProps = (state: commonTypes.IApplicationState) => ({
  selectedVideo: state.selectedVideo,
  videos: state.searchResults.items,
});

const mapDispatchToProps = (dispatch: any) => ({
  more: () => dispatch(more()),
  selectVideoSetUrl: (video: commonTypes.ISearchResource, index: number) => dispatch(selectVideoSetUrl(video, index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoList);
