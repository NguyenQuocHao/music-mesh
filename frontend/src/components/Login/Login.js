import Google from "../../assets/img/google.png";
import Spotify from "../../assets/img/spotify.png";

const Login = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const spotify = () => {
    window.open("http://localhost:5000/auth/spotify", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton spotify" onClick={spotify}>
            <img src={Spotify} alt="" className="icon" />
            Spotify
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
