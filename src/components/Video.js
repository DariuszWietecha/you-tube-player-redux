import React from 'react'
import PropTypes from 'prop-types'

const Video = ({video}) => {
    if (video != null) {
      let videoId = "";
      if (video.id && typeof video.id.videoId !== "undefined") {
        videoId = video.id.videoId;
      } else {
        videoId = video.id;
      }

      const url = `https://www.youtube.com/embed/${videoId}`;

      return (
        <div>
          <div className={"embed-responsive embed-responsive-16by9"}>
            <iframe allowFullScreen className={"embed-responsive-item"} src={url} title={video.snippet.title} />
          </div>
          <div>
            <h2>
              {video.snippet.title}
            </h2>
            <div>
              {video.snippet.description}
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

Video.propTypes = {
  video: {
    snippet: {
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }
  }
}

export default Video
