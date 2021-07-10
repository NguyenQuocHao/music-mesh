import React from 'react'
import axios from 'axios'

class Spotify extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  search() {
    axios.get('http://localhost:8888/playlists')
      .then(function (response) {
        // handle success
        console.log(response);
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
        </div>
      </div>
    )
  }
}

export default Spotify