import { useState, useEffect } from 'react'
import SpotifyLogin from '../components/Login/SpotifyLogin'
import SpotifyDashboard from '../components/Dashboard/SpotifyDashboard'

// TODO: Refactor this, use session, cookie.
const code = new URLSearchParams(window.location.search).get('code')

function Spotify() {
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if(code){
      setLoggedIn(true)
    }
    else{
      setLoggedIn(false)
    }
  }, [])

  return (
    <div>
      <AuthButton isLoggedIn={isLoggedIn} />
    </div>
  )

}

const AuthButton = props => {
  let { isLoggedIn } = props;

  if (isLoggedIn) {
    return <SpotifyDashboard code={code}/>;
  } else {
    return <SpotifyLogin />;
  }
};

export default Spotify