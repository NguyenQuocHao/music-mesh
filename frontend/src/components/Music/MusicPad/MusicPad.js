import {useState, useEffect} from 'react';
import "./MusicPad.css";
import { Link } from 'react-router-dom';

export default function MusicPad({image, title, subTitle, className, id, site}){

  function GetRedirectLink(){
    if(site == "youtube"){
      return `youtube-playlist`;
    }
    else{
      return `spotify-playlist`;
    }
  }

  return(
      <div className="test">
        <Link
          to={{
            pathname: `/${GetRedirectLink()}/${id}`,
            state: { id: id }
          }}
        >
          <img src={image} className="playlistImage" />
          <div className={"title"}>{title}</div>
          <div className={"subTitle"}>{subTitle}</div>
        </Link>
      </div>
  )
}