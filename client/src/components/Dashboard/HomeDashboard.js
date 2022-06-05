import { useState, useEffect } from 'react';
import axios from "axios";
import vars from '../../variables';
import PadList from '../Music/MusicPad/PadList';
import { HOST } from '../../variables';

export default function HomeDashboard({ user }) {
  const [spotifyPlaylists, setSpotifyPlaylists] = useState(null)
  const [topPlaylists, setTopPlaylists] = useState(null)
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null)
  const [youtubePlaylists, setYoutubePlaylists] = useState(null)
  const [popularSongs, setPopularSongs] = useState(null)
  const [randomPlaylists, setRandomPlaylists] = useState(null)
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
    if (user.provider === 'google' || user.linkedAccount?.provider === 'google') {
      axios.get(HOST + '/youtube/popularSongs')
        .then(data => {
          setPopularSongs(data.data)
        })
        .catch(err => { setPopularSongs(null) })

      axios.get(HOST + '/youtube/myPlaylists')
        .then(data => {
          setYoutubePlaylists(data.data)
        })
        .catch(err => { setYoutubePlaylists(null) })

      axios.get(HOST + '/youtube/randomPlaylists')
        .then(data => {
          setRandomPlaylists(data.data)
        })
        .catch(err => { setRandomPlaylists(null) })
    }

    if (user.provider === 'spotify' || user.linkedAccount?.provider === 'spotify') {
      axios.get(HOST + '/spotify/userPlaylists')
        .then(function (data) {
          setSpotifyPlaylists(data.data);
        })
        .catch(err => { setSpotifyPlaylists(null) })

      axios.get(HOST + '/spotify/topLists')
        .then(function (data) {
          setTopPlaylists(data.data)
        })
        .catch(err => { setTopPlaylists(null) })

      axios.get(HOST + '/spotify/featuredPlaylists')
        .then(function (data) {
          setFeaturedPlaylists(data.data)
        })
        .catch(err => { setFeaturedPlaylists(null) })
    }
  }, [])

  return (
    <>
      {lists.map((item, index) => item.data != null ?
        <PadList key={index} data={item.data} title={item.title} source={item.source} location="dashboard" type={item.type}></PadList>
        : null
      )}
    </>
  )
}