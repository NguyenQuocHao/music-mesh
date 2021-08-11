import React from 'react'
require('dotenv').config()

const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id="+process.env.REACT_APP_CLIENT_ID+"&response_type=code&redirect_uri=http://localhost:3000/spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function SpotifyLogin(){
  return(
    <div>
      <a href={AUTH_URL}>Login in with Spotify</a>
    </div>
  )
}