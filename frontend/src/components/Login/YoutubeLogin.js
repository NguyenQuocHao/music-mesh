import React from 'react'
import "./Login.css"

require('dotenv').config()

const google = () => {
  window.open("http://localhost:5000/auth/google", "_self");
};

export default function YoutubeLogin() {
  return (
    <div class="center" onClick={google}>
      <button class="button-1 google" role="button">Login in with Google</button>
    </div>
  )
}