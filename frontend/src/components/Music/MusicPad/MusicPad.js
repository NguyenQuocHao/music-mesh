import React from 'react';
import PropTypes from "prop-types";
import "./MusicPad.css";
import { Link } from 'react-router-dom';

export default class MusicPad extends React.Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
    subTitle: PropTypes.string,
    className: PropTypes.string,
    id: PropTypes.string,
    site: PropTypes.string,
  };

  render() {
    let link;
    if(this.props.site == "youtube"){
      link = `youtube-playlist`;
    }
    else{
      link = `spotify-playlist`;
    }

    console.log("Site type: " + this.props.site)
    return (
      <div className="test">
        <Link
          to={{
            pathname: `/${link}/${this.props.id}`,
            state: { id: this.props.id }
          }}
        >
          <img src={this.props.image} className="playlistImage" />
          <div className={"title"}>{this.props.title}</div>
          <div className={"subTitle"}>{this.props.subTitle}</div>
        </Link>
      </div>)
  }
}