import React from 'react'
require('dotenv').config()

const spotify = () => {
  window.open("http://localhost:5000/auth/spotify", "_self");
};

export default function SpotifyLogin() {
  return (
    <div class="center" onClick={spotify}>
      <button class="button-1 google" role="button">Login in with Spotify</button>
    </div>
  )
}