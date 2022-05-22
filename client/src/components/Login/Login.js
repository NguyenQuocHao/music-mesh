import Google from "../../assets/img/google.png";
import Spotify from "../../assets/img/spotify.png";
import './Login.scss'

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

  const getMainStyle = () => {
    if (site == undefined) {
      return "login-main login"
    }

    return "login-main link"
  }

  return (
    <div className={getMainStyle()}>
      <div className="ripple-background">
        <div className="circle xxlarge shade1"></div>
        <div className="circle xlarge shade2"></div>
        <div className="circle large shade3"></div>
        <div className="circle mediun shade4"></div>
        <div className="circle small shade5"></div>
      </div>

      <div className="login-wrapper">
        <div className="login-wrapper-content">
          <h4 className="login-header">
            {site != undefined ? 'Link your account' : 'Please choose a Login Method'}
          </h4>
          {
            site == 'google' ? null :
              <div className="login-button google" onClick={google}>
                <img src={Google} alt="" className="icon" />
                Google
              </div>
          }
          {
            site == 'spotify' ? null :
              <div className="login-button spotify" onClick={spotify}>
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
