import { useState, useEffect } from 'react'
import axios from "axios"
import PlaylistList from '../Music/MusicPad/PlaylistList'
import vars from '../../variables'

export default function SpotifyDashboard({ }) {
  const [userPlaylists, setUserPlaylists] = useState([])
  const [popPlaylists, setPopPlaylists] = useState([])
  const [topPlaylists, setTopPlaylists] = useState([])
  const [decadesPlaylists, setDecadesPlaylists] = useState([])
  const [moodPlaylists, setMoodPlaylists] = useState([])
  const [chillPlaylists, setChillPlaylists] = useState([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/spotify/userPlaylists')
      .then(function (data) {
        console.log('User playlists', data.data);
        setUserPlaylists(data.data);
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    axios.get('http://localhost:5000/spotify/pop')
      .then(function (data) {
        console.log('Pop playlists', data.data);
        setPopPlaylists(data.data)
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

    axios.get('http://localhost:5000/spotify/decades')
      .then(function (data) {
        console.log('Decades playlists', data.data);
        setDecadesPlaylists(data.data)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    axios.get('http://localhost:5000/spotify/mood')
      .then(function (data) {
        console.log('Mood playlists', data.data);
        setMoodPlaylists(data.data)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    axios.get('http://localhost:5000/spotify/chill')
      .then(function (data) {
        console.log('Chill playlists', data.data);
        setChillPlaylists(data.data)
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

      axios.get('http://localhost:5000/spotify/currentlyPlaying')
      .then(function (data) {
        console.log('Currently playing', data.data);
        // setFeaturedPlaylists(data.data)
      }, function (err) {
        console.log('Something went wrong!', err);
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
