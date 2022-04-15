import { useState, useEffect } from 'react';
import "./MusicPad.css";
import { Link } from 'react-router-dom';
import GetRedirectLink from '../../../utils/redirect'

export default function MusicPad({ image, title, subTitle, id, site, page, type }) {
  return (
    <div className={"musicpad musicpad-" + page}>
      <Link
        to={{
          pathname: `/${GetRedirectLink(site, type)}/${id}`,
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