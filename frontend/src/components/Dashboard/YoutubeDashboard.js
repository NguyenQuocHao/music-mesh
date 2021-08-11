import { useState, useEffect } from 'react'
import YoutubeAuth from '../Login/YoutubeAuth'
import axios from "axios"

export default function YoutubeDashboard({ code }) {
  const accessToken = YoutubeAuth(code)
  const [popularSongs, setPopularSongs] = useState([])

  useEffect(() => {
    if (!accessToken) return
    console.log("Access token changes.")
    axios.get('http://localhost:8001/popularSongs')
    .then(data => {
      console.log(JSON.stringify(data.data, null, 2))
    })
  }, [accessToken])

  return (
    <div>

    </div>
  )
}
