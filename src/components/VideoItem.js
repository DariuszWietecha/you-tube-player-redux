import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from 'reactstrap'

const VideoItem = ({ horizontal, onClick, snippet }) => {
  if (horizontal) {
    return (
      <div className="card mb-3">
        <Card onClick={onClick}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <CardImg alt={snippet.description}
                src={snippet.thumbnails.medium.url} />
            </div>
            <div className="col-md-8">
              <CardBody>
                <CardTitle className="font-weight-bold">{snippet.title}</CardTitle>
                <CardSubtitle className="text-primary">{snippet.channelTitle}</CardSubtitle>
                <CardText>{snippet.description}</CardText>
              </CardBody>
            </div>
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="col-sm-4">
        <div className="m-4">
          <Card onClick={onClick}>
            <CardImg alt={snippet.description}
              src={snippet.thumbnails.medium.url}
              top
              width="100%" />
            <CardBody>
              <CardTitle className="font-weight-bold">{snippet.title}</CardTitle>
              <CardSubtitle className="text-primary">{snippet.channelTitle}</CardSubtitle>
              <CardText>{snippet.description}</CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

VideoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  snippet: {
    title: PropTypes.string.isRequired
  }
}

export default VideoItem
