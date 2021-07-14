import React from 'react'
import axios from 'axios'
import MusicPadList from '../components/MusicPadList'

// TODO: Display tracks, artists, podcasts (using components)
class Spotify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
    // this.search = this.search.bind(this);
  }

  search = () => {
    axios.get('http://localhost:8888/featuredPlaylists')
      .then((response) => {
        // handle success
        console.log(response);
        var test = response.data.playlists.playlists.items;
        console.log(test); 
        this.setState({ playlists: test });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        Spotify
        <div>
          <input></input>
          <button onClick={this.search}>
            Search
          </button>
          <div>
            <MusicPadList data={this.state.playlists}></MusicPadList>
          </div>
        </div>
      </div>
    )
  }
}

export default Spotify

{/* <iframe src="https://open.spotify.com/embed/track/3GtXRW9ILD3QCAH3NVdwtA" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */ }