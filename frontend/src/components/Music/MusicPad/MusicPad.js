import { useState, useEffect } from 'react';
import "./MusicPad.css";
import { Link } from 'react-router-dom';
import vars from '../../../variables'

export default function MusicPad({ image, title, subTitle, id, site, page, type }) {
  function GetRedirectLink() {
    var link = ""
    switch (site) {
      case vars.youtube:
        link += vars.youtube;
        break;
      case vars.spotify:
        link += vars.spotify;
        break;
    }

    switch (type) {
      case vars.playlist:
        link += "-" + vars.playlist;
        break;
      case vars.song:
        link += "-" + vars.song;
        break;
    }

    return link
  }

  return (
    <div className={"musicpad musicpad-" + page}>
      <Link
        to={{
          pathname: `/${GetRedirectLink()}/${id}`,
          state: { id: id }
        }}
      >
        <div>
          <img src={image} className={"musicpad-" + page + "-image"} />
          <div className={"music-title"}>{title}</div>
          <div className={"musicpad-sub-title"}>{subTitle}</div>
        </div>
      </Link>
    </div>
  )
}