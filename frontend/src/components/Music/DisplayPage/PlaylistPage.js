import axios from 'axios';
import {useState, useEffect} from 'react'
import { useLocation, Link } from "react-router-dom"
import SongList from '../MusicPad/SongList'

export default function PlaylistPage() {
  const { state } = useLocation();
  const [relatedVideos, setRelatedVideos] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8001/relatedVideos')
      .then(data => {
        console.log('Related videos: ' + JSON.stringify(data, null, 2))
        setRelatedVideos(data.data)
      })
  }, [state])

  var embededLink = "https://www.youtube.com/embed/" + state.id
  //'https://open.spotify.com/embed/playlist/'+state.id;
  return (
    <div>
      <iframe width="560" height="315" src={embededLink} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      <SongList data={relatedVideos} title="Related music"></SongList>
    </div>
  )
}
