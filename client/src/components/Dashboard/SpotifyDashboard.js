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
  const [decadesPlaylists, setDecadesPlaylists] = useState([])
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
    {
      title: "Decades",
      data: decadesPlaylists
    },
  ]

  useEffect(() => {
    axios.get(HOST + '/spotify/refreshToken')

    axios.get(HOST + '/spotify/userPlaylists')
      .then(function (data) {
        dispatch(getMySpotifyPlaylists(data.data))
        setUserPlaylists(data.data);
      })
      .catch(err => { setDecadesPlaylists(null) })

    axios.get(HOST + '/spotify/pop')
      .then(function (data) {
        setPopPlaylists(data.data)
      })
      .catch(err => { setDecadesPlaylists(null) })

    axios.get(HOST + '/spotify/topLists')
      .then(function (data) {
        setTopPlaylists(data.data)
      })
      .catch(err => { setDecadesPlaylists(null) })

    axios.get(HOST + '/spotify/decades')
      .then(function (data) {
        setDecadesPlaylists(data.data)
      })
      .catch(err => { setDecadesPlaylists(null) })

    axios.get(HOST + '/spotify/mood')
      .then(function (data) {
        setMoodPlaylists(data.data)
      })
      .catch(err => { setDecadesPlaylists(null) })

    axios.get(HOST + '/spotify/chill')
      .then(function (data) {
        setChillPlaylists(data.data)
      })
      .catch(err => { setDecadesPlaylists(null) })

    axios.get(HOST + '/spotify/featuredPlaylists')
      .then(function (data) {
        setFeaturedPlaylists(data.data)
      })
      .catch(err => { setDecadesPlaylists(null) })
  }, [])

  return (
    <div className="dashboard">
      {lists.map((item, index) => item.data != null ?
        <PadList key={index} data={item.data} title={item.title} source="spotify" location="dashboard" type={vars.playlist}></PadList>
        : null
      )}
    </div>
  )
}