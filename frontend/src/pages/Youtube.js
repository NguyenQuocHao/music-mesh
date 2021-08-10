import { useState, useEffect } from 'react'
import Login2 from '../components/Login/Login2'
import Dashboard2 from '../components/Dashboard/Dashboard2'

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
      <Login2 />
      <Dashboard2 code={code}/>
    </div>
  )

}

const AuthButton = props => {
  let { isLoggedIn } = props;

  if (isLoggedIn) {
    return <Dashboard2 code={code}/>;
  } else {
    return <Login2 />;
  }
};

export default Youtube
