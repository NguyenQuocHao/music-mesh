import { useState, useEffect } from 'react'
import axios from "axios"
import PlaylistList from '../Music/MusicPad/PlaylistList'
import vars from '../../variables'
import { useDispatch } from 'react-redux'
import { getMySpotifyPlaylists } from '../../redux/reducers/spotifySlice'

export default function SpotifyDashboard() {
  const [userPlaylists, setUserPlaylists] = useState([])
  const [popPlaylists, setPopPlaylists] = useState([])
  const [topPlaylists, setTopPlaylists] = useState([])
  const [decadesPlaylists, setDecadesPlaylists] = useState([])
  const [moodPlaylists, setMoodPlaylists] = useState([])
  const [chillPlaylists, setChillPlaylists] = useState([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('http://localhost:5000/spotify/userPlaylists')
      .then(function (data) {
        dispatch(getMySpotifyPlaylists(data.data))
        setUserPlaylists(data.data);
      })

    axios.get('http://localhost:5000/spotify/pop')
      .then(function (data) {
        setPopPlaylists(data.data)
      })

    axios.get('http://localhost:5000/spotify/topLists')
      .then(function (data) {
        setTopPlaylists(data.data)
      })

    axios.get('http://localhost:5000/spotify/decades')
      .then(function (data) {
        setDecadesPlaylists(data.data)
      })

    axios.get('http://localhost:5000/spotify/mood')
      .then(function (data) {
        setMoodPlaylists(data.data)
      })

    axios.get('http://localhost:5000/spotify/chill')
      .then(function (data) {
        setChillPlaylists(data.data)
      })

    axios.get('http://localhost:5000/spotify/featuredPlaylists')
      .then(function (data) {
        setFeaturedPlaylists(data.data)
      })
  }, [])

  return (
    <div className="dashboard">
      <PlaylistList data={userPlaylists} type={vars.playlist} title="Your playlists" site="spotify"></PlaylistList>
      <PlaylistList data={featuredPlaylists} type={vars.playlist} title="Featured by Spotify" site="spotify"></PlaylistList>
      <PlaylistList data={popPlaylists} type={vars.playlist} title="Pop" site="spotify"></PlaylistList>
      <PlaylistList data={moodPlaylists} type={vars.playlist} title="Mood" site="spotify"></PlaylistList>
      <PlaylistList data={chillPlaylists} type={vars.playlist} title="Chill" site="spotify"></PlaylistList>
      <PlaylistList data={topPlaylists} type={vars.playlist} title="Top List" site="spotify"></PlaylistList>
      <PlaylistList data={decadesPlaylists} type={vars.playlist} title="Through the years..." site="spotify"></PlaylistList>
    </div>
  )
}
