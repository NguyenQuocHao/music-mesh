import { useState, useEffect } from 'react'
import axios from "axios"
import SongList from '../Music/MusicPad/SongList'
import './Dashboard.css'

export default function YoutubeDashboard({ }) {
  const [myPlaylists, setMyPlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/popularSongs')
      .then(data => {
        setPopularSongs(data.data)
      })

    axios.get('http://localhost:5000/myPlaylists')
      .then(data => {
        setMyPlaylists(data.data)
      })

    axios.get('http://localhost:5000/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })

  }, [])

  return (
    <div className="dashboard">
      <SongList data={popularSongs} title="Popular songs" site="youtube" page="dashboard"></SongList>
      <SongList data={myPlaylists} title="My Playlists" site="youtube" page="dashboard"></SongList>
      <SongList data={randomPlaylists} title="Random playlists" site="youtube" page="dashboard"></SongList>
    </div>
  )
}
