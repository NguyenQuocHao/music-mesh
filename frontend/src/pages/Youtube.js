import { useState, useEffect } from 'react'
import YoutubeLogin from '../components/Login/YoutubeLogin'
import YoutubeDashboard from '../components/Dashboard/YoutubeDashboard'

const code = new URLSearchParams(window.location.search).get('code')

function Youtube() {
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
      {/* <YoutubeLogin />
      <YoutubeDashboard code={code}/> */}
    </div>
  )

}

const AuthButton = props => {
  let { user } = props;

  if (user) {
    return <YoutubeDashboard code={code}/>;
  } else {
    return <YoutubeLogin />;
  }
};

export default Youtube
