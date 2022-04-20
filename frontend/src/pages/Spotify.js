import { useState, useEffect } from 'react'
import Login from '../components/Login/Login'
import SpotifyDashboard from '../components/Dashboard/SpotifyDashboard'

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
        .then((data) => {
          if (data.user.linkedAccount && data.user.linkedAccount.provider === 'spotify') {
            setUser(data.user.linkedAccount);
          }
          else {
            setUser(data.user);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div>
      <Display user={user} />
    </div>
  )
}

const Display = props => {
  let { user } = props;
  if (user) {
    if (user.provider === 'spotify') {
      return <SpotifyDashboard />;
    }

    return <Login site={user.provider} />
  }

  return <Login />;
};

export default Spotify