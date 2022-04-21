import { useState, useEffect } from 'react'
import axios from "axios"
import vars from '../../variables'
import PadList from '../Music/MusicPad/PadList'

export default function SpotifyDashboard() {
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([])
  const [topPlaylists, setTopPlaylists] = useState([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const [youtubePlaylists, setYoutubePlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/spotify/userPlaylists')
      .then(function (data) {
        setSpotifyPlaylists(data.data);
      })

    axios.get('http://localhost:5000/spotify/topLists')
      .then(function (data) {
        setTopPlaylists(data.data)
      })

    axios.get('http://localhost:5000/spotify/featuredPlaylists')
      .then(function (data) {
        setFeaturedPlaylists(data.data)
      })

    axios.get('http://localhost:5000/youtube/popularSongs')
      .then(data => {
        setPopularSongs(data.data)
      })

    axios.get('http://localhost:5000/youtube/myPlaylists')
      .then(data => {
        setYoutubePlaylists(data.data)
      })

    axios.get('http://localhost:5000/youtube/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })
  }, [])

  return (
    <div className="dashboard">
      <PadList data={spotifyPlaylists} title="Your Spotify playlists" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={youtubePlaylists} title="Your Youtube playlists" source="youtube" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={popularSongs} title="Popular songs on Youtube" source="youtube" location="dashboard" type={vars.song}></PadList>
      <PadList data={featuredPlaylists} title="Featured by Spotify" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={topPlaylists} title="Top From Spotify" source="spotify" location="dashboard" type={vars.playlist}></PadList>
      <PadList data={randomPlaylists} title="From Youtube with songs" source="youtube" location="dashboard" type={vars.playlist}></PadList>

      {/* <PlaylistList data={spotifyPlaylists} type={vars.playlist} title="Your Spotify playlists"></PlaylistList>
      <TrackList data={youtubePlaylists} title="Your Youtube playlists" site="youtube" page="dashboard" type={vars.playlist}></TrackList>
      <TrackList data={popularSongs} title="Popular songs on Youtube" site="youtube" page="dashboard" type={vars.song}></TrackList>
      <PlaylistList data={featuredPlaylists} type={vars.playlist} title="Featured by Spotify"></PlaylistList>
      <PlaylistList data={topPlaylists} type={vars.playlist} title="Top From Spotify"></PlaylistList>
      <TrackList data={randomPlaylists} title="From Youtube with songs" site="youtube" page="dashboard" type={vars.playlist}></TrackList> */}
    </div>
  )
}