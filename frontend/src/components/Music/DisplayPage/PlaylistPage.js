import axios from 'axios';
import {useState, useEffect} from 'react'
import { useLocation, Link } from "react-router-dom"
import SongList from '../MusicPad/SongList'
import './PlaylistPage.css'

export default function PlaylistPage() {
  const { state } = useLocation();
  const [relatedVideos, setRelatedVideos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8001/relatedVideos')
      .then(data => {
        // console.log('Related videos: ' + JSON.stringify(data, null, 2))
        setRelatedVideos(data.data)
      })
  }, [state])

  var embededLink = "https://www.youtube.com/embed/" + state.id
  //'https://open.spotify.com/embed/playlist/'+state.id;
  return (
    <div className="background">
    <div className="main-media">
      <iframe width="100%" src={embededLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
    <div className="song-list">      
      <SongList data={relatedVideos} tiFtle="Related music" site="youtube" page="display"></SongList>
    </div>
    </div>
  )
}