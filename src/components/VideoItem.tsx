import React from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import * as commonTypes from "../commonTypes";

interface IVideoItemProps {
  horizontal: boolean;
  onClick: () => commonTypes.DispatchAction;
  snippet: commonTypes.ISnippet;
  refs: React.RefObject<HTMLDivElement>;
}

const VideoItem = (props: IVideoItemProps) => {
  if (props.horizontal) {
    return (
      <div className="card mb-3" ref={props.refs}>
        <Card onClick={props.onClick}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <CardImg alt={props.snippet.description}
                src={props.snippet.thumbnails.medium.url} />
            </div>
            <div className="col-md-8">
              <CardBody>
                <CardTitle className="font-weight-bold">{props.snippet.title}</CardTitle>
                <CardSubtitle className="text-primary">{props.snippet.channelTitle}</CardSubtitle>
                <CardText>{props.snippet.description}</CardText>
              </CardBody>
            </div>
          </div>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="col-sm-4" ref={props.refs}>
        <div className="m-4">
          <Card onClick={props.onClick}>
            <CardImg alt={props.snippet.description}
              src={props.snippet.thumbnails.medium.url}
              top
              width="100%" />
            <CardBody>
              <CardTitle className="font-weight-bold">{props.snippet.title}</CardTitle>
              <CardSubtitle className="text-primary">{props.snippet.channelTitle}</CardSubtitle>
              <CardText>{props.snippet.description}</CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
};

export default VideoItem;
