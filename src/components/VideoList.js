import React from 'react'
import PropTypes from 'prop-types'
import Video from './Video'

const VideoList = ({videos}) => (
  <ul>
    {videos.map(video =>
      <Video
        {...video}
      />
    )}
  </ul>
)

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default VideoList
