import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home'
import Youtube from './pages/Youtube'
import Spotify from './pages/Spotify';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/youtube' component={Youtube}/>
          <Route path='/spotify' component={Spotify}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
