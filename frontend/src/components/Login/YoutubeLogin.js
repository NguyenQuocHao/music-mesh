import React from 'react'
import "./Login.css"

require('dotenv').config()

const AUTH_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly&response_type=code&client_id=" + process.env.REACT_APP_GOOGLE_CLIENT_ID + "&redirect_uri=http://localhost:3000/youtube" //http%3A%2F%2Flocalhost%3A3000%2Fyoutube
// "https://accounts.spotify.com/authorize?client_id="+process.env.REACT_APP_CLIENT_ID+"&response_type=code&redirect_uri=http://localhost:3000/spotify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function YoutubeLogin() {
  return (
    <div class="center">
      <a href={AUTH_URL}><button class="button-1 google" role="button">Login in with Google</button></a>
    </div>
  )
}