import { useState, useEffect } from 'react'
import axios from "axios"
import './Dashboard.scss'
import vars from '../../variables.js'
import { useDispatch } from 'react-redux'
import { getMyYoutubePlaylists } from '../../redux/reducers/youtubeSlice'
import PadList from '../Music/MusicPad/PadList'

export default function YoutubeDashboard() {
  const [myPlaylists, setMyPlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:5000/youtube/refresh')
      .then(data => {
      })

    axios.get('http://localhost:5000/youtube/popularSongs')
      .then(data => {
        setPopularSongs(data.data)
      })

    axios.get('http://localhost:5000/youtube/myPlaylists')
      .then(data => {
        dispatch(getMyYoutubePlaylists(data.data))
        setMyPlaylists(data.data)
      })

    axios.get('http://localhost:5000/youtube/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })
  }, [])

  return (
    <div className="dashboard">
      <PadList data={popularSongs} title="Popular songs" source="youtube" location="dashboard" type={vars.song}></PadList>
      <PadList data={myPlaylists} title="My Playlists" source="youtube" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={randomPlaylists} title="Random playlists" source="youtube" location="dashboard" type={vars.playlist}></PadList>
    </div>
  )
}
