import './App.scss';
import { useEffect, useState } from "react";
import Navbar from './components/Navigation/Navbar';
import Sidebar from './components/Navigation/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Youtube from './pages/Youtube';
import Spotify from './pages/Spotify';
import Login from './components/Login/Login';
import PlaylistPage from './components/Music/DisplayPage/PlaylistPage';
import SearchPage from './components/Dashboard/SearchPage';
import QueuePage from './components/Music/DisplayPage/QueuePage';

function App() {
  const [user, setUser] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <div className="App">
        {
          user ? <div className='appWrapper'>
            <div className='sideWrapper'>
              <Sidebar show={sidebar} sideBarHandler={showSidebar} />
            </div>
            <div className='mainWrapper'>
              <Navbar user={user} sideBarHandler={showSidebar} />
              <div className='main'>
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
                </Switch>
              </div>
            </div>
          </div> :
            <Login />
        }
      </div>
    </Router>
  );
}

export default App;