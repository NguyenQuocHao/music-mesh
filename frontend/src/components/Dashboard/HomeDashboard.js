import { useState, useEffect } from 'react'
import axios from "axios"
import MusicPadList from '../Music/MusicPad/MusicPadList'
import vars from '../../variables'
import SongList from '../Music/MusicPad/SongList'

export default function SpotifyDashboard({ }) {
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([])
  const [topPlaylists, setTopPlaylists] = useState([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const [youtubePlaylists, setYoutubePlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/spotify/userPlaylists')
      .then(function (data) {
        console.log('User playlists', data.data);
        setSpotifyPlaylists(data.data);
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    axios.get('http://localhost:5000/spotify/topLists')
      .then(function (data) {
        console.log('Top playlists', data.data);
        setTopPlaylists(data.data)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    axios.get('http://localhost:5000/spotify/featuredPlaylists')
      .then(function (data) {
        console.log('Featured playlists', data.data);
        setFeaturedPlaylists(data.data)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    axios.get('http://localhost:5000/popularSongs')
      .then(data => {
        setPopularSongs(data.data)
      })

    axios.get('http://localhost:5000/myPlaylists')
      .then(data => {
        setYoutubePlaylists(data.data)
      })

    axios.get('http://localhost:5000/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })
  }, [])

  return (
    <div className="dashboard">
      <MusicPadList data={spotifyPlaylists} type={vars.playlist} title="Your Spotify playlists"></MusicPadList>
      <SongList data={youtubePlaylists} title="Your Youtube playlists" site="youtube" page="dashboard" type={vars.playlist}></SongList>
      <SongList data={popularSongs} title="Popular songs on Youtube" site="youtube" page="dashboard" type={vars.song}></SongList>
      <MusicPadList data={featuredPlaylists} type={vars.playlist} title="Featured by Spotify"></MusicPadList>
      <MusicPadList data={topPlaylists} type={vars.playlist} title="Top From Spotify"></MusicPadList>
      <SongList data={randomPlaylists} title="From Youtube with songs" site="youtube" page="dashboard" type={vars.playlist}></SongList>
    </div>
  )
}