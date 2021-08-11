import { useState, useEffect } from 'react'
import YoutubeLogin from '../components/Login/YoutubeLogin'
import YoutubeDashboard from '../components/Dashboard/YoutubeDashboard'

const code = new URLSearchParams(window.location.search).get('code')

function Youtube() {
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
      Youtube
      {/* <AuthButton isLoggedIn={isLoggedIn} /> */}
      <YoutubeLogin />
      <YoutubeDashboard code={code}/>
    </div>
  )

}

const AuthButton = props => {
  let { isLoggedIn } = props;

  if (isLoggedIn) {
    return <YoutubeDashboard code={code}/>;
  } else {
    return <YoutubeLogin />;
  }
};

export default Youtube
