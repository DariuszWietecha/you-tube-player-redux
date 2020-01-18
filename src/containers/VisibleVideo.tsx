import { connect } from "react-redux";
import * as commonTypes from "../commonTypes";
import Video from "../components/Video";

const mapStateToProps = (state: commonTypes.IApplicationState) => ({ video: state.searchResults.video });

export default connect(mapStateToProps)(Video);
