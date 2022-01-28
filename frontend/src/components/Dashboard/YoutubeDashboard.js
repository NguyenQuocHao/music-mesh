import { useState, useEffect } from 'react'
import axios from "axios"
import TrackList from '../Music/MusicPad/TrackList'
import './Dashboard.scss'
import vars from '../../variables.js'

export default function YoutubeDashboard({ }) {
  const [myPlaylists, setMyPlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/youtube/popularSongs')
      .then(data => {
        setPopularSongs(data.data)
      })

    axios.get('http://localhost:5000/youtube/myPlaylists')
      .then(data => {
        setMyPlaylists(data.data)
      })

    axios.get('http://localhost:5000/youtube/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })

  }, [])

  return (
    <div className="dashboard">
      <TrackList data={popularSongs} title="Popular songs" site="youtube" page="dashboard" type={vars.song}></TrackList>
      <TrackList data={myPlaylists} title="My Playlists" site="youtube" page="dashboard" type={vars.playlist}></TrackList>
      <TrackList data={randomPlaylists} title="Random playlists" site="youtube" page="dashboard" type={vars.playlist}></TrackList>
    </div>
  )
}
