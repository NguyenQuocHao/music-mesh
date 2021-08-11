import React from 'react'
import axios from 'axios'
import Login from '../components/Login/Login'
import Dashboard from '../components/Dashboard/Dashboard'

const code = new URLSearchParams(window.location.search).get('code')

// TODO: Display tracks, artists, podcasts (using components)
class Spotify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
      isLoggedIn: false,
    };
    // this.search = this.search.bind(this);
  }

  componentDidMount(){
    if(code){
      this.setState({isLoggedIn: true});
    }
    else{
      this.setState({isLoggedIn: false});
    }
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let content;
    if(isLoggedIn){
      content = <Dashboard code={code}/>
    }
    else{
      content = <Login/>
    }

    return (
      <div>
        Spotify
        <div>
          <input></input>
          <button onClick={this.search}>
            Search
          </button>
          <div>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default Spotify

{/* <iframe src="https://open.spotify.com/embed/track/3GtXRW9ILD3QCAH3NVdwtA" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */ }