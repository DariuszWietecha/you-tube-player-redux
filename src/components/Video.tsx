import React from "react";
import * as commonTypes from "../commonTypes";

interface IVideoProps {
  video?: commonTypes.ISearchResource;
}

const Video = (props: IVideoProps) => {
  if (typeof props.video !== "undefined") {
    const url = `https://www.youtube.com/embed/${props.video.id.videoId}`;

    return (
      <div>
        <div className={"embed-responsive embed-responsive-16by9"}>
          <iframe allowFullScreen className={"embed-responsive-item"} src={url} title={props.video.snippet.title} />
        </div>
        <div>
          <h2>
            {props.video.snippet.title}
          </h2>
          <div>
            {props.video.snippet.description}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Video;
