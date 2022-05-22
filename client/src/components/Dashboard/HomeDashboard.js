import { useState, useEffect } from 'react';
import axios from "axios";
import vars from '../../variables';
import PadList from '../Music/MusicPad/PadList';

export default function SpotifyDashboard() {
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([])
  const [topPlaylists, setTopPlaylists] = useState([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const [youtubePlaylists, setYoutubePlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])
  const lists = [
    {
      title: "My Spotify Playlists",
      data: spotifyPlaylists,
      source: "spotify",
      type: vars.playlist,
    },
    {
      title: "My Youtube Playlists",
      data: youtubePlaylists,
      source: "youtube",
      type: vars.playlist
    },
    {
      title: "Popular songs on Youtube",
      data: popularSongs,
      source: "youtube",
      type: vars.song
    },
    {
      title: "Featured by Spotify",
      data: featuredPlaylists,
      source: "spotify",
      type: vars.playlist
    },
    {
      title: "Top From Spotify",
      data: topPlaylists,
      source: "spotify",
      type: vars.playlist
    },
    {
      title: "Youtube randoms",
      data: randomPlaylists,
      source: "youtube",
      type: vars.playlist
    },
  ]

  useEffect(() => {
    axios.get('http://localhost:5000/spotify/userPlaylists')
      .then(function (data) {
        setSpotifyPlaylists(data.data);
      })
      .catch(err => { setSpotifyPlaylists(null) })

    axios.get('http://localhost:5000/spotify/topLists')
      .then(function (data) {
        setTopPlaylists(data.data)
      })
      .catch(err => { setTopPlaylists(null) })

    axios.get('http://localhost:5000/spotify/featuredPlaylists')
      .then(function (data) {
        setFeaturedPlaylists(data.data)
      })
      .catch(err => { setFeaturedPlaylists(null) })

    axios.get('http://localhost:5000/youtube/popularSongs')
      .then(data => {
        setPopularSongs(data.data)
      })
      .catch(err => { setPopularSongs(null) })

    axios.get('http://localhost:5000/youtube/myPlaylists')
      .then(data => {
        setYoutubePlaylists(data.data)
      })
      .catch(err => { setYoutubePlaylists(null) })

    axios.get('http://localhost:5000/youtube/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })
      .catch(err => { setRandomPlaylists(null) })
  }, [])

  return (
    <div className="dashboard">
      {lists.map(item => item.data != null ?
        <PadList data={item.data} title={item.title} source={item.source} location="dashboard" type={item.type}></PadList>
        : null
      )}
    </div>
  )
}