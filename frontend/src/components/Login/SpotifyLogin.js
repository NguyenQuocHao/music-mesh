import React from 'react'
require('dotenv').config()

const spotify = () => {
  window.open("http://localhost:5000/auth/spotify", "_self");
};

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID + "&response_type=code&redirect_uri=http://localhost:3000/spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function SpotifyLogin() {
  return (
    <div class="center" onClick={spotify}>
      <button class="button-1 google" role="button">Login in with Spotify</button>
    </div>
    // <div class="center">
    //   <a href={AUTH_URL}><button class="button-1 spotify" role="button">Login in with Spotify</button></a>
    // </div>
  )
}