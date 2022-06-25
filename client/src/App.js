import './App.scss';
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import HomeDashboard from './components/Dashboard/HomeDashboard';
import YoutubeDashboard from './components/Dashboard/YoutubeDashboard';
import SpotifyDashboard from './components/Dashboard/SpotifyDashboard';
import OutsideAlerter from './components/Navigation/DropDown/OutsideAlerter';

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
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, []);

  useEffect(async () => {
    if (!userInfo || (!userInfo.linkedAccount && userInfo.provider !== 'spotify')) {
      await axios.get(`${HOST}/spotify/public`)
      return;
    }

    if (userInfo.provider === "google" || userInfo.linkedAccount) {
      await axios.get(`${HOST}/youtube/refreshToken`)

      await axios.get(`${HOST}/youtube/myPlaylists`)
        .then(data => {
          dispatch(getMyYoutubePlaylists(data.data))
        })
    }
    if (userInfo.provider === "spotify" || userInfo.linkedAccount) {
      // Only signed-in user user refresh token (via OAuth)
      await axios.get(`${HOST}/spotify/refreshToken`)

      await axios.get(`${HOST}/spotify/userPlaylists`)
        .then(function (data) {
          dispatch(getMySpotifyPlaylists(data.data))
        })
    }
  }, [userInfo])

  return (
    <Router>
      <div className='appWrapper'>
        <div>
          <OutsideAlerter handler={() => setSidebar(false)}>
            <Sidebar open={sidebar} />
          </OutsideAlerter>
        </div>
        <div className='mainWrapper'>
          <Navbar user={userInfo} sideBarHandler={showSidebar} />
          <main>
            <Switch>
              <Route path='/' exact children={<HomeDashboard user={userInfo}></HomeDashboard>} />
              <Route exact path='/login' children={<Login site={userInfo?.provider}></Login>} />
              <Route exact path='/youtube' children={<YoutubeDashboard user={userInfo}></YoutubeDashboard>} />
              <Route exact path='/spotify' children={<SpotifyDashboard user={userInfo}></SpotifyDashboard>} />
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
      </div>
    </Router>
  );
}

export default App;
