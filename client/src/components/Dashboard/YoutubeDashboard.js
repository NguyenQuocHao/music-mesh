import { useState, useEffect } from 'react';
import axios from "axios";
import './Dashboard.scss';
import vars from '../../variables.js';
import { useDispatch } from 'react-redux';
import { getMyYoutubePlaylists } from '../../redux/reducers/youtubeSlice';
import PadList from '../Music/MusicPad/PadList';
import { HOST } from '../../variables';

export default function YoutubeDashboard() {
  const dispatch = useDispatch()
  const [myPlaylists, setMyPlaylists] = useState([])
  const [popularSongs, setPopularSongs] = useState([])
  const [randomPlaylists, setRandomPlaylists] = useState([])
  const lists = [
    {
      title: "My Youtube Playlists",
      data: myPlaylists,
      type: vars.playlist
    },
    {
      title: "Popular songs",
      data: popularSongs,
      type: vars.song,
    },
    {
      title: "Random playlists",
      data: randomPlaylists,
      type: vars.playlist
    },
  ]

  useEffect(() => {
    axios.get(HOST + '/youtube/refreshToken')

    axios.get(HOST + '/youtube/popularSongs')
      .then(data => {
        setPopularSongs(data.data)
      })
      .catch(err => { setPopularSongs(null) })

    axios.get(HOST + '/youtube/myPlaylists')
      .then(data => {
        dispatch(getMyYoutubePlaylists(data.data))
        setMyPlaylists(data.data)
      })
      .catch(err => { setMyPlaylists(null) })

    axios.get(HOST + '/youtube/randomPlaylists')
      .then(data => {
        setRandomPlaylists(data.data)
      })
      .catch(err => { setRandomPlaylists(null) })
  }, [])

  return (
    <div className="dashboard">
      {lists.map((item, index) => item.data != null ?
        <PadList key={index} data={item.data} title={item.title} source="youtube" location="dashboard" type={item.type}></PadList>
        : null
      )}
    </div>
  )
}