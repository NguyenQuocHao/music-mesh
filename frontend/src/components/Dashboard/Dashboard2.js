import { useState, useEffect } from 'react'
import UseAuth2 from '../Login/useAuth2'
import axios from "axios"

export default function Dashboard2({ code }) {
  const accessToken = UseAuth2(code)
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
