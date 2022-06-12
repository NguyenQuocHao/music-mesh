import { useState, useEffect } from 'react';
import axios from 'axios';
import vars from '../../variables';
import { mySpotifyPlaylists } from '../../redux/reducers/spotifySlice';
import PadList from '../Music/MusicPad/PadList';
import { HOST } from '../../variables';
import { useSelector } from 'react-redux';

export default function SpotifyDashboard() {
  const [popPlaylists, setPopPlaylists] = useState(null)
  const [topPlaylists, setTopPlaylists] = useState(null)
  const [moodPlaylists, setMoodPlaylists] = useState(null)
  const [chillPlaylists, setChillPlaylists] = useState(null)
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null)
  const spotifyPlaylists = useSelector(mySpotifyPlaylists);
  const lists = [
    {
      title: "My Spotify Playlists",
      data: spotifyPlaylists
    },
    {
      title: "Featured by Spotify",
      data: featuredPlaylists
    },
    {
      title: "Mood",
      data: moodPlaylists
    },
    {
      title: "Chill",
      data: chillPlaylists
    },
    {
      title: "Top",
      data: topPlaylists
    },
    {
      title: "Pop",
      data: popPlaylists
    },
  ]

  useEffect(() => {
    axios.get(`${HOST}/spotify/pop`)
      .then(function (data) {
        setPopPlaylists(data.data)
      })
      .catch(err => { setPopPlaylists(null) })

    axios.get(`${HOST}/spotify/topLists`)
      .then(function (data) {
        setTopPlaylists(data.data)
      })
      .catch(err => { setTopPlaylists(null) })


    axios.get(`${HOST}/spotify/mood`)
      .then(function (data) {
        setMoodPlaylists(data.data)
      })
      .catch(err => { setMoodPlaylists(null) })

    axios.get(`${HOST}/spotify/chill`)
      .then(function (data) {
        setChillPlaylists(data.data)
      })
      .catch(err => { setChillPlaylists(null) })

    axios.get(`${HOST}/spotify/featuredPlaylists`)
      .then(function (data) {
        setFeaturedPlaylists(data.data)
      })
      .catch(err => { setFeaturedPlaylists(null) })
  }, [])

  return (
    <>
      {lists.map((item, index) => item.data != null ?
        <PadList key={index} data={item.data} title={item.title} source="spotify" location="dashboard" type={vars.playlist}></PadList>
        : null
      )}
    </>
  )
}