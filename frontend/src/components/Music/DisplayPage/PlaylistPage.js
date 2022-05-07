import { useState, useEffect, useReducer } from 'react';
import { useParams } from "react-router-dom";
import './PlaylistPage.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addTrack, } from '../../../redux/reducers/queue';
import axios from 'axios';

export default function PlaylistPage() {
  const [url, setUrl] = useState("")
  const { id } = useParams()
  const dispatch = useDispatch();
  const [info, setInfo] = useState()

  useEffect(() => {
    var embededLink = ""
    const currentLink = window.location.href
    if (currentLink.includes("youtube")) {
      if (currentLink.includes("song")) {
        embededLink = "https://www.youtube.com/embed/" + id
      }
      else if (currentLink.includes("playlist")) {
        embededLink = "https://www.youtube.com/embed/videoseries?list=" + id
      }

      axios.get('http://localhost:5000/youtube/getTrack/' + id)
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
    else {
      if (currentLink.includes("song")) {
        embededLink = "https://open.spotify.com/embed/track/" + id
      }
      else if (currentLink.includes("playlist")) {
        embededLink = "https://open.spotify.com/embed/playlist/" + id
      }

      axios.get('http://localhost:5000/spotify/getTrack/' + id)
        .then(data => {
          console.log(data)
          setInfo({
            id: data.data.id,
            title: data.data.title,
            image: data.data.image,
            artist: data.data.artist,
            source: 'spotify',
          })
        })
    }

    setUrl(embededLink)
  }, [id])

  const addTrackToQueue = () => {
    dispatch(addTrack(info));
    console.log(info)
  }

  return (
    <div className="background">
      <div className="main-media">
        <iframe src={url} width="100%" height="380" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
      </div>
      {/* <div className="song-list">
        <SongList data={relatedVideos} tiFtle="Related music" site="youtube" page="display"></SongList>
      </div> */}
      <button onClick={addTrackToQueue}>Add to queue</button>
    </div>
  )
}
