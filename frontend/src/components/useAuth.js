import { useState, useEffect } from "react"
import axios from "axios"

export default function UserAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    console.log("Sending code: " + code)
    axios.post('http://localhost:8000/login', {
      code,
    }).then(res => {
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      window.history.pushState({}, null, "/spotify")
      console.log("Access token: " + res.data.accessToken);
      console.log("Refresh token: " + res.data.refreshToken);
      console.log("Expires in: " + res.data.expiresIn);
    })
  }, [code])

  useEffect(() => {
    if (!refreshToken || !expiresIn) return
    const interval = setInterval(() => {
      axios.post('http://localhost:8000/refresh', {
        refreshToken,
      }).then(res => {
        console.log("Resetting access token")
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
      })
    }, (expiresIn - 60) * 1000)

    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])
}