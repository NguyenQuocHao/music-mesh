import { useState, useEffect } from 'react';
import axios from 'axios';
import vars from '../../variables';
import { useDispatch } from 'react-redux';
import { getMySpotifyPlaylists } from '../../redux/reducers/spotifySlice';
import PadList from '../Music/MusicPad/PadList';
import { HOST } from '../../variables';

export default function SpotifyDashboard() {
  const dispatch = useDispatch()
  const [userPlaylists, setUserPlaylists] = useState([])
  const [popPlaylists, setPopPlaylists] = useState([])
  const [topPlaylists, setTopPlaylists] = useState([])
  const [moodPlaylists, setMoodPlaylists] = useState([])
  const [chillPlaylists, setChillPlaylists] = useState([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])
  const lists = [
    {
      title: "My Spotify Playlists",
      data: userPlaylists
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
    axios.get(HOST + '/spotify/refreshToken')

    axios.get(HOST + '/spotify/userPlaylists')
      .then(function (data) {
        dispatch(getMySpotifyPlaylists(data.data))
        setUserPlaylists(data.data);
      })
      .catch(err => { setUserPlaylists(null) })

    axios.get(HOST + '/spotify/pop')
      .then(function (data) {
        setPopPlaylists(data.data)
      })
      .catch(err => { setPopPlaylists(null) })

    axios.get(HOST + '/spotify/topLists')
      .then(function (data) {
        setTopPlaylists(data.data)
      })
      .catch(err => { setTopPlaylists(null) })


    axios.get(HOST + '/spotify/mood')
      .then(function (data) {
        setMoodPlaylists(data.data)
      })
      .catch(err => { setMoodPlaylists(null) })

    axios.get(HOST + '/spotify/chill')
      .then(function (data) {
        setChillPlaylists(data.data)
      })
      .catch(err => { setChillPlaylists(null) })

    axios.get(HOST + '/spotify/featuredPlaylists')
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