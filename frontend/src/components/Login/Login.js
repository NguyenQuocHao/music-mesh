import Google from "../../assets/img/google.png";
import Spotify from "../../assets/img/spotify.png";
import './Login.css'

const Login = ({ site }) => {
  const google = () => {
    var authLink = "http://localhost:5000/auth/google";
    if (site == undefined) {
      authLink += "/signin"
    }
    else {
      authLink += "/connect"
    }

    window.open(authLink, "_self");
  };

  const spotify = () => {
    var authLink = "http://localhost:5000/auth/spotify";
    if (site == undefined) {
      authLink += "/signin"
    }
    else {
      authLink += "/connect"
    }

    window.open(authLink, "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">
        {site != undefined ? 'Link your account' : 'Choose a Login Method'}</h1>
      <div className="wrapper">
        <div className="left">
          {
            site == 'google' ? null :
              <div className="loginButton google" onClick={google}>
                <img src={Google} alt="" className="icon" />
                Google
              </div>
          }
          {
            site == 'spotify' ? null :
              <div className="loginButton spotify" onClick={spotify}>
                <img src={Spotify} alt="" className="icon" />
                Spotify
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
