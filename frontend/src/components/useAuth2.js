import { useState, useEffect } from "react"
import axios from "axios"

export default function UserAuth2(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    console.log("Sending code: " + code)
    axios.post('http://localhost:8001/login', {
      code,
    }).then(res => {
      console.log("Response from server: " + res);
      setAccessToken(res.data.accessToken)
      setRefreshToken(res.data.refreshToken)
      setExpiresIn(res.data.expiresIn)
      window.history.pushState({}, null, "/youtube")
      console.log("Access token: " + res.data.accessToken);
      console.log("Refresh token: " + res.data.refreshToken);
      console.log("Expires in: " + res.data.expiresIn);
    })
  }, [code])

  // useEffect(() => {
  //   if (!refreshToken || !expiresIn) return
  //   const interval = setInterval(() => {
  //     axios.post('http://localhost:8001/refresh', {
  //       refreshToken,
  //     }).then(res => {
  //       console.log("Resetting access token")
  //       setAccessToken(res.data.accessToken)
  //       setExpiresIn(res.data.expiresIn)
  //     })
  //   }, (expiresIn - 60) * 1000)

  //   return () => clearInterval(interval)
  // }, [refreshToken, expiresIn])

  return accessToken
}