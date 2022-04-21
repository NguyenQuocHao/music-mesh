import { useState, useEffect } from 'react'
import axios from "axios"
import vars from '../../variables'
import { useDispatch } from 'react-redux'
import { getMySpotifyPlaylists } from '../../redux/reducers/spotifySlice'
import PadList from '../Music/MusicPad/PadList'

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
      <PadList data={userPlaylists} title="Your playlists" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={featuredPlaylists} title="Featured by Spotify" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={moodPlaylists} title="Pop" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={chillPlaylists} title="Mood" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={topPlaylists} title="Chill" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={decadesPlaylists} title="Top List" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={decadesPlaylists} title="Through the years..." source="spotify" location="dashboard" type={vars.playlist}></PadList>
    </div>
  )
}
