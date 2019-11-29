import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'reactstrap'
import VideoItem from './VideoItem'

const VideoList = ({ more, videos, selectedVideo, selectVideoSetUrl }) => {
  const [horizontal, setHorizontal] = useState(true);

  if (!selectedVideo) {
    return (
      <div>
        <div className="row justify-content-end text-right">
          <div className={videos.length > 0 ? 'col-3 d-none d-lg-block mb-3' : 'd-none'}>
            <div className="custom-control custom-switch">
              <input id="customSwitch1"
                checked={horizontal}
                className="custom-control-input"
                name="horizontal"
                onChange={() => setHorizontal(!horizontal)}
                type="checkbox" />
              <label className="custom-control-label" htmlFor="customSwitch1">
                Switch to {horizontal === true ? 'grid' : 'list'}</label>
            </div>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {videos.map((video, index) =>
            <VideoItem
              key={index}
              horizontal={horizontal}
              {...video}
              onClick={() => selectVideoSetUrl(video, index)}
            />
          )}
        </div>
        <div className={videos.length > 1 ? 'row justify-content-center mt-3' : 'd-none'}>
          <Button onClick={more} outline>More</Button>
        </div>
      </div>
    )
  } else {
    return null
  }
}

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    snippet: {
      title: PropTypes.string.isRequired
    }
  }).isRequired).isRequired,
  selectedVideo: {
    snippet: { // TODO: change to object?
      title: PropTypes.string.isRequired
    }
  },
  selectVideoSetUrl: PropTypes.func.isRequired
}

export default VideoList
