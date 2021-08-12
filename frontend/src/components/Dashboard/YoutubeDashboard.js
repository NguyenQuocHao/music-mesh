import { useState, useEffect } from 'react'
import YoutubeAuth from '../Login/YoutubeAuth'
import axios from "axios"
import SongList from '../Music/MusicPad/SongList'

export default function YoutubeDashboard({ code }) {
  const accessToken = YoutubeAuth(code)
  const [myPlaylists, setMyPlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])

  useEffect(() => {
    if (!accessToken) return
    console.log("Access token changes.")
    
    axios.get('http://localhost:8001/popularSongs')
    .then(data => {
      setPopularSongs(data.data)
      // console.log(JSON.stringify(data.data, null, 2))
    })

    axios.get('http://localhost:8001/myPlaylists')
    .then(data => {
      setMyPlaylists(data.data)
      console.log(JSON.stringify(data.data, null, 2))
    })

  }, [accessToken])

  return (
    <div>
      <SongList data={popularSongs} title="Popular songs"></SongList>
      <SongList data={myPlaylists} title="My Playlists"></SongList>
    </div>
  )
}
