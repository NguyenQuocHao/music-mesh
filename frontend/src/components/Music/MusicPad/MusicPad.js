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
      <div className={page+"-page"}>
        <Link
          to={{
            pathname: `/${GetRedirectLink()}/${id}`,
            state: { id: id }
          }}
        >
          <div>
            <img src={image} className={page+"-image"} />
            <div className={"title"}>{title}</div>
            <div className={"subTitle"}>{subTitle}</div>
          </div>
        </Link>
      </div>
  )
}