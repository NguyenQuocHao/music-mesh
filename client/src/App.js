import './App.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Youtube from './pages/Youtube';
import Spotify from './pages/Spotify';
import NotFoundPage from './pages/NotFoundPage';
import Login from './components/Login/Login';
import PlaylistPage from './components/Music/DisplayPage/PlaylistPage';
import SearchPage from './components/Dashboard/SearchPage';
import QueuePage from './components/Music/DisplayPage/QueuePage';
import { HOST } from './variables';
import { setUser, user } from './redux/reducers/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getMySpotifyPlaylists } from './redux/reducers/spotifySlice';
import { getMyYoutubePlaylists } from './redux/reducers/youtubeSlice';

function App() {
  const userInfo = useSelector(user);
  const [sidebar, setSidebar] = useState(false);
  const dispatch = useDispatch();
  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    const getUser = () => {
      fetch(`${HOST}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
          throw new Error("Authentication has been failed!");
        })
        .then((resObject) => {
          dispatch(setUser(resObject.user))

          if (resObject.user.provider === "google" || resObject.user.linkedAccount) {
            axios.get(`${HOST}/youtube/myPlaylists`)
              .then(data => {
                dispatch(getMyYoutubePlaylists(data.data))
              })
          }
          if (resObject.user.provider === "spotify" || resObject.user.linkedAccount) {
            axios.get(`${HOST}/spotify/userPlaylists`)
              .then(function (data) {
                dispatch(getMySpotifyPlaylists(data.data))
              })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, []);

  return (
    <Router>
      <>
        {
          userInfo ? <div className='appWrapper'>
            <div>
              <Sidebar show={sidebar} sideBarHandler={showSidebar} />
            </div>
            <div className='mainWrapper'>
              <Navbar user={userInfo} sideBarHandler={showSidebar} />
              <main>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route exact path='/youtube' component={Youtube} />
                  <Route exact path='/spotify' component={Spotify} />
                  <Route path='/spotify/playlist/:id' component={PlaylistPage} />
                  <Route path='/spotify/song/:id' component={PlaylistPage} />
                  <Route path='/youtube/playlist/:id' component={PlaylistPage} />
                  <Route path='/youtube/song/:id' component={PlaylistPage} />
                  <Route path='/search/:query' component={SearchPage} />
                  <Route path='/myQueue' component={QueuePage} />
                  <Route path='*' component={NotFoundPage} />
                </Switch>
              </main>
            </div>
          </div> :
            <Login />
        }
      </>
    </Router>
  );
}

export default App;
