import { useState, useEffect } from 'react'
import axios from "axios"
import SongList from '../Music/MusicPad/SongList'
import './Dashboard.scss'
import vars from '../../variables.js'

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
      <iframe src="https://www.youtube.com/embed/vKhuzVQboe0" width="100%" height="380" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
      <SongList data={popularSongs} title="Popular songs" site="youtube" page="dashboard" type={vars.song}></SongList>
      <SongList data={myPlaylists} title="My Playlists" site="youtube" page="dashboard" type={vars.playlist}></SongList>
      <SongList data={randomPlaylists} title="Random playlists" site="youtube" page="dashboard" type={vars.playlist}></SongList>
    </div>
  )
}
