import axios from 'axios';
import { useState, useEffect } from 'react'
import { useLocation, Link } from "react-router-dom"
import SongList from '../MusicPad/SongList'
import './PlaylistPage.css'

export default function PlaylistPage() {
  const { state } = useLocation();
  const [relatedVideos, setRelatedVideos] = useState([])
  const [url, setUrl] = useState("")

  useEffect(() => {
    var embededLink = ""
    if (window.location.href.includes("youtube")) {
      embededLink = "https://www.youtube.com/embed/" + state.id
      axios.get('http://localhost:8001/relatedVideos')
        .then(data => {
          setRelatedVideos(data.data)
        })
    }
    else {
      embededLink = "https://open.spotify.com/embed/playlist/" + state.id
    }

    setUrl(embededLink)
  }, [state])

  return (
    <div className="background">
      <div className="main-media">
        <iframe src={url} width="100%" height="380" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
      </div>
      <div className="song-list">
        <SongList data={relatedVideos} tiFtle="Related music" site="youtube" page="display"></SongList>
      </div>
    </div>
  )
}
