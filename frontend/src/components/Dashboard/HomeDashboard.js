import { useState, useEffect } from 'react'
import axios from "axios"
import PlaylistList from '../Music/MusicPad/PlaylistList'
import vars from '../../variables'
import TrackList from '../Music/MusicPad/TrackList'

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
      <PlaylistList data={spotifyPlaylists} type={vars.playlist} title="Your Spotify playlists"></PlaylistList>
      <TrackList data={youtubePlaylists} title="Your Youtube playlists" site="youtube" page="dashboard" type={vars.playlist}></TrackList>
      <TrackList data={popularSongs} title="Popular songs on Youtube" site="youtube" page="dashboard" type={vars.song}></TrackList>
      <PlaylistList data={featuredPlaylists} type={vars.playlist} title="Featured by Spotify"></PlaylistList>
      <PlaylistList data={topPlaylists} type={vars.playlist} title="Top From Spotify"></PlaylistList>
      <TrackList data={randomPlaylists} title="From Youtube with songs" site="youtube" page="dashboard" type={vars.playlist}></TrackList>
    </div>
  )
}