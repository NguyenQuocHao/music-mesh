import { useState, useEffect } from 'react';
import axios from "axios";
import vars from '../../variables.js';
import { myYoutubePlaylists } from '../../redux/reducers/youtubeSlice';
import PadList from '../Music/MusicPad/PadList';
import { HOST } from '../../variables';
import { useSelector } from 'react-redux';

export default function YoutubeDashboard() {
  const youtubePlaylists = useSelector(myYoutubePlaylists);
  const [popularSongs, setPopularSongs] = useState(null);
  const [randomPlaylists, setRandomPlaylists] = useState(null);
  const lists = [
    {
      title: "My Youtube Playlists",
      data: youtubePlaylists,
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
    axios.get(`${HOST}/youtube/popularSongs`)
      .then(data => {
        setPopularSongs(data.data)
      })
      .catch(err => { setPopularSongs(null) })

    axios.get(`${HOST}/youtube/randomPlaylists`)
      .then(data => {
        setRandomPlaylists(data.data)
      })
      .catch(err => { setRandomPlaylists(null) })
  }, [])

  return (
    <>
      {lists.map((item, index) => item.data != null ?
        <PadList key={index} data={item.data} title={item.title} source="youtube" location="dashboard" type={item.type}></PadList>
        : null
      )}
    </>
  )
}