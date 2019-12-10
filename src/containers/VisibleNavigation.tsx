import { connect } from "react-redux";
import { selectNextVideoSetUrl, selectPrevVideoSetUrl, unselectVideoSetUrl } from "../actions";
import * as commonTypes from "../commonTypes";
import Navigation from "../components/Navigation";

const mapStateToProps = (state: commonTypes.IApplicationState) => ({
  query: state.query,
  searchResults: state.searchResults.items,
  selectedVideo: state.selectedVideo,
});
// todo: any below
const mapDispatchToProps = (dispatch: any) => ({
  selectNextVideoSetUrl: (searchResults: commonTypes.ISearchResource[], index?: number) =>
    dispatch(selectNextVideoSetUrl(searchResults, index)),
  selectPrevVideoSetUrl: (searchResults: commonTypes.ISearchResource[], index?: number) =>
    dispatch(selectPrevVideoSetUrl(searchResults, index)),
  unselectVideoSetUrl: (query: string) => dispatch(unselectVideoSetUrl(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
