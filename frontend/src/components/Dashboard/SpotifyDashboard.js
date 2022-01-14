import { useState, useEffect } from 'react'
import axios from "axios"
import MusicPadList from '../Music/MusicPad/MusicPadList'
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
  }, [])

  return (
    <div className="dashboard">
      <MusicPadList data={userPlaylists} type={vars.playlist} title="Your playlists"></MusicPadList>
      <MusicPadList data={featuredPlaylists} type={vars.playlist} title="Featured by Spotify"></MusicPadList>
      <MusicPadList data={popPlaylists} type={vars.playlist} title="Pop"></MusicPadList>
      <MusicPadList data={moodPlaylists} type={vars.playlist} title="Mood"></MusicPadList>
      <MusicPadList data={chillPlaylists} type={vars.playlist} title="Chill"></MusicPadList>
      <MusicPadList data={topPlaylists} type={vars.playlist} title="Top List"></MusicPadList>
      <MusicPadList data={decadesPlaylists} type={vars.playlist} title="Through the years..."></MusicPadList>
    </div>
  )
}
