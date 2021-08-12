import { useState, useEffect } from 'react'
import YoutubeAuth from '../Login/YoutubeAuth'
import axios from "axios"
import SongList from '../Music/MusicPad/SongList'
import './Dashboard.css'

export default function YoutubeDashboard({ code }) {
  const accessToken = YoutubeAuth(code)
  const [myPlaylists, setMyPlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])

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
      })

    axios.get('http://localhost:8001/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })

  }, [accessToken])

  return (
    <div className="dashboard">
      <SongList data={popularSongs} title="Popular songs"></SongList>
      <SongList data={myPlaylists} title="My Playlists"></SongList>
      <SongList data={randomPlaylists} title="Random playlists"></SongList>
    </div>
  )
}
