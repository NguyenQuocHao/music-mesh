import React from 'react';
import PropTypes from "prop-types";
import "./MusicPad.css";

export default class MusicPad extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    className: PropTypes.string,
  };

  render() {
    return (
      <div className="test">
        <img src={this.props.image} className="playlistImage" />
        <div className={"title"}>{this.props.title}</div>
        <div>{this.props.subTitle}</div>
      </div>)
  }
}