import React, { useState } from "react";
import { Button } from "reactstrap";
import * as commonTypes from "../commonTypes";
import VideoItem from "./VideoItem";

interface IVideoListProps {
  more: () => commonTypes.DispatchAction;
  videos: commonTypes.ISearchResource[];
  selectedVideo?: commonTypes.ISearchResource;
  selectVideoSetUrl: (video: commonTypes.ISearchResource, index: number) => commonTypes.DispatchAction;
}
const VideoList = (props: IVideoListProps) => {
  const [horizontal, setHorizontal] = useState(true);

  if (!props.selectedVideo) {
    return (
      <div>
        <div className="row justify-content-end text-right">
          <div className={props.videos.length > 0 ? "col-3 d-none d-lg-block mb-3" : "d-none"}>
            <div className="custom-control custom-switch">
              <input id="customSwitch1"
                checked={horizontal}
                className="custom-control-input"
                name="horizontal"
                onChange={() => setHorizontal(!horizontal)}
                type="checkbox" />
              <label className="custom-control-label" htmlFor="customSwitch1">
                Switch to {horizontal === true ? "grid" : "list"}</label>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {props.videos.map((video, index) =>
            <VideoItem
              key={index}
              horizontal={horizontal}
              {...video}
              onClick={() => props.selectVideoSetUrl(video, index)}
            />,
          )}
        </div>
        <div className={props.videos.length > 1 ? "row justify-content-center mt-3" : "d-none"}>
          <Button onClick={props.more} outline>More</Button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default VideoList;
