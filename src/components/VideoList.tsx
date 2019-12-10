import { fromNullable } from "fp-ts/lib/Option";
import React, { Component } from "react";
import { Button } from "reactstrap";
import * as commonTypes from "../commonTypes";
import VideoItem from "./VideoItem";

interface IVideoListProps {
  more: () => commonTypes.DispatchAction;
  videos: commonTypes.ISearchResource[];
  selectedVideo: commonTypes.ISelectVideoState;
  selectVideoSetUrl: (video: commonTypes.ISearchResource, index: number) => commonTypes.DispatchAction;
}
class VideoList extends Component<IVideoListProps, {}> {
  public state = {
    horizontal: true,
  };

  public refss: Array<React.RefObject<HTMLDivElement>> = [];

  public componentDidUpdate() {
    return fromNullable(this.props.selectedVideo.index)
      .mapNullable((i) => this.refss[i])
      .mapNullable((r) => r.current)
      .map((c) => {
        c.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
  }

  public setHorizontal = () => {
    this.setState({
      horizontal: !this.state.horizontal,
    });
  }

  public render() {
    this.refss = this.props.videos.reduce((acc, value, index) => {
      acc[index] = React.createRef();
      return acc;
    }, [] as Array<React.RefObject<HTMLDivElement>>);

    if (!this.props.selectedVideo.video) {
      return (
        <div>
          <div className="row justify-content-end text-right">
            <div className={this.props.videos.length > 0 ? "col-3 d-none d-lg-block mb-3" : "d-none"}>
              <div className="custom-control custom-switch">
                <input id="customSwitch1"
                  checked={this.state.horizontal}
                  className="custom-control-input"
                  name="horizontal"
                  onChange={() => this.setHorizontal()}
                  type="checkbox" />
                <label className="custom-control-label" htmlFor="customSwitch1">
                  Switch to {this.state.horizontal === true ? "grid" : "list"}</label>
              </div>
            </div>
          </div>
          <div className="d-flex flex-wrap">
            {this.props.videos.map((video, index) =>
              <VideoItem
                horizontal={this.state.horizontal}
                {...video}
                onClick={() => this.props.selectVideoSetUrl(video, index)}
                refs={this.refss[index]}
                key={index}
              />,
            )}
          </div>
          <div className={this.props.videos.length > 1 ? "row justify-content-center mt-3" : "d-none"}>
            <Button onClick={this.props.more} outline>More</Button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default VideoList;
