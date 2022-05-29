import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './PlaylistPage.scss';
import { useDispatch } from 'react-redux';
import { addTrack, } from '../../../redux/reducers/queue';
import axios from 'axios';
import { FaEllipsisH } from "react-icons/fa";
import { HOST } from '../../../variables';
import { useAlert } from "react-alert";

export default function PlaylistPage() {
  const [url, setUrl] = useState("")
  const { id } = useParams()
  const dispatch = useDispatch();
  const [info, setInfo] = useState();
  const [showDropDown, setShowDropDown] = useState(false);
  const notificationsMessage = "Track added";
  const alert = useAlert();

  useEffect(() => {
    var embededLink = ""
    const currentLink = window.location.href
    if (currentLink.includes("youtube")) {
      if (currentLink.includes("song")) {
        embededLink = "https://www.youtube.com/embed/" + id

        axios.get(HOST + '/youtube/getTrack/' + id)
          .then(data => {
            setInfo({
              id: data.data[0].id,
              title: data.data[0].title,
              image: data.data[0].image,
              artist: data.data[0].artist,
              source: 'youtube',
            })
          })
      }
      else if (currentLink.includes("playlist")) {
        embededLink = "https://www.youtube.com/embed/videoseries?list=" + id
      }
    }
    else {
      if (currentLink.includes("song")) {
        embededLink = "https://open.spotify.com/embed/track/" + id

        axios.get(HOST + '/spotify/getTrack/' + id)
          .then(data => {
            setInfo({
              id: data.data.id,
              title: data.data.title,
              image: data.data.image,
              artist: data.data.artist,
              source: 'spotify',
            })
          })
      }
      else if (currentLink.includes("playlist")) {
        embededLink = "https://open.spotify.com/embed/playlist/" + id
      }
    }

    setUrl(embededLink)
  }, [id])

  const addTrackToQueue = () => {
    dispatch(addTrack(info));
    alert.success(notificationsMessage);
  }

  return (
    <div className="background">
      <div className="main-media">
        <iframe src={url} width="100%" height="380" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
      </div>
      {!window.location.href.includes("playlist") &&
        <div className='ellipsis'>
          <FaEllipsisH onClick={() => { setShowDropDown(!showDropDown); }} />
          {showDropDown &&
            <div className='track-dropdown'>
              <div className='track-dropdown-item' onClick={() => { addTrackToQueue(); }}>Add to Queue</div>
            </div>}
        </div>
      }
    </div>
  )
}
