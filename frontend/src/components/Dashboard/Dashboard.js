import { useState, useEffect } from 'react'
import UseAuth from '../useAuth'
import MusicPadList from '../MusicPadList'
import SpotifyWebApi from "spotify-web-api-node"

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.REACT_APP_CLIENT_ID,
})

export default function Dashboard({ code }) {
  const accessToken = UseAuth(code)
  const playListLimit = 5
  const [userPlaylists, setUserPlaylists] = useState([])
  const [popPlaylists, setPopPlaylists] = useState([])
  const [topPlaylists, setTopPlaylists] = useState([])
  const [decadesPlaylists, setDecadesPlaylists] = useState([])
  const [moodPlaylists, setMoodPlaylists] = useState([])
  const [chillPlaylists, setChillPlaylists] = useState([])
  const [featuredPlaylists, setFeaturedPlaylists] = useState([])


  useEffect(() => {
    if (!accessToken) return
    console.log("Access token changes.")
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(() => {
    console.log("access token: " + spotifyApi.getAccessToken())
    spotifyApi.setAccessToken(accessToken)

    // spotifyApi.getRecommendations({ min_energy: 0.4, seed_artists: ['6mfK6Q2tzLMEchAr0e9Uzu', '4DYFVNKZ1uixa6SQTvzQwJ'], min_popularity: 50 })
    //   .then(function (data) {
    //     console.log('Recommendations', data.body);
    //   }, function (err) {
    //     console.log('Something went wrong!', err);
    //   })

    // spotifyApi.getCategories()
    //   .then(function (data) {
    //     console.log('Categories: ', data.body);
    //   }, function (err) {
    //     console.log('Something went wrong!', err);
    //   })

    spotifyApi.getUserPlaylists()
      .then(function (data) {
        console.log('User playlists', data.body);
        setUserPlaylists(data.body.items);
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    spotifyApi.getPlaylistsForCategory('pop', { limit: playListLimit })
      .then(function (data) {
        console.log('Pop playlists', data.body);
        setPopPlaylists(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

      spotifyApi.getPlaylistsForCategory('toplists', { limit: playListLimit })
      .then(function (data) {
        console.log('Top playlists', data.body);
        setTopPlaylists(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

      spotifyApi.getPlaylistsForCategory('decades', { limit: playListLimit })
      .then(function (data) {
        console.log('Decades playlists', data.body);
        setDecadesPlaylists(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    spotifyApi.getPlaylistsForCategory('mood', { limit: playListLimit })
      .then(function (data) {
        console.log('Mood playlists', data.body);
        setMoodPlaylists(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    spotifyApi.getPlaylistsForCategory('chill', { limit: playListLimit })
      .then(function (data) {
        console.log('Chill playlists', data.body);
        setChillPlaylists(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })

    spotifyApi.getFeaturedPlaylists({ limit: playListLimit })
      .then(function (data) {
        console.log('Featured playlists', data.body);
        setFeaturedPlaylists(data.body.playlists.items)
      }, function (err) {
        console.log('Something went wrong!', err);
      })
  }, [accessToken])

  return (
    <div>
      <MusicPadList data={userPlaylists} title="Your playlists"></MusicPadList>
      <MusicPadList data={featuredPlaylists} title="Featured by Spotify"></MusicPadList>
      <MusicPadList data={popPlaylists} title="Pop"></MusicPadList>
      <MusicPadList data={moodPlaylists} title="Mood"></MusicPadList>
      <MusicPadList data={chillPlaylists} title="Chill"></MusicPadList>
      <MusicPadList data={topPlaylists} title="Top List"></MusicPadList>
      <MusicPadList data={decadesPlaylists} title="Through the years..."></MusicPadList>
    </div>
  )
}
