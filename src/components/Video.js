import React from 'react'
import PropTypes from 'prop-types'

const Video = ({title}) => (
  <li>
    {title}
  </li>
)

Video.propTypes = {
  title: PropTypes.string.isRequired
}

export default Video
