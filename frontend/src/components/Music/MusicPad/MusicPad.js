import {useState, useEffect} from 'react';
import "./MusicPad.css";
import { Link } from 'react-router-dom';

export default function MusicPad({image, title, subTitle, id, site, page}){

  function GetRedirectLink(){
    if(site == "youtube"){
      return `youtube-playlist`;
    }
    else{
      return `spotify-playlist`;
    }
  }

  return(
      <div className={"musicpad musicpad-" + page}>
        <Link
          to={{
            pathname: `/${GetRedirectLink()}/${id}`,
            state: { id: id }
          }}
        >
          <div>
            <img src={image} className={"musicpad-" + page + "-image"} />
            <div className={"musicpad-title"}>{title}</div>
            <div className={"musicpad-sub-title"}>{subTitle}</div>
          </div>
        </Link>
      </div>
  )
}