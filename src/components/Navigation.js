import React from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

const Navigation = ({ searchResults, selectedVideo, selectPrevVideoSetUrl, selectNextVideoSetUrl, unselectVideoSetUrl, query }) => {
  const disabledPrev = selectedVideo.index === 0

  if (selectedVideo.video) {
    return (
      <div className="row justify-content-end">
        <div className="col mb-3 text-right">
          <span className={searchResults.length > 1 ? '' : 'd-none'}>
            <Button
              className="mr-2"
              color="info"
              disabled={disabledPrev}
              onClick={() => selectPrevVideoSetUrl(searchResults, selectedVideo.index)}
              outline>Prev</Button>
            <Button
              className="mr-4"
              color="info"
              onClick={() => selectNextVideoSetUrl(searchResults, selectedVideo.index)}
              outline>Next</Button>
          </span>
          <Button onClick={() => unselectVideoSetUrl(query)} outline>Back</Button>
        </div>
      </div>
    )
  } else {
    return null
  }
}

Navigation.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.shape({
    snippet: {
      title: PropTypes.string.isRequired
    }
  }).isRequired).isRequired,
  selectedVideo: {
    snippet: {
      description: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }
  },
  selectPrevVideoSetUrl: PropTypes.func.isRequired,
  selectNextVideoSetUrl: PropTypes.func.isRequired,
  unselectVideoSetUrl: PropTypes.func.isRequired
}

export default Navigation
