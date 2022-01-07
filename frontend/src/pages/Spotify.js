import { useState, useEffect } from 'react'
import SpotifyLogin from '../components/Login/SpotifyLogin'
import SpotifyDashboard from '../components/Dashboard/SpotifyDashboard'

// TODO: Refactor this, use session, cookie.
const code = new URLSearchParams(window.location.search).get('code')

function Spotify() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);


  return (
    <div>
      <AuthButton user={user} />
    </div>
  )
}

const AuthButton = props => {
  let { user } = props;

  if (user) {
    return <SpotifyDashboard code={code}/>;
  } else {
    return <SpotifyLogin />;
  }
};

export default Spotify