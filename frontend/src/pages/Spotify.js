import React from 'react'
import axios from 'axios'

// TODO: Display tracks, artists, podcasts (using components)
class Spotify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlists: [],
    };
    // this.search = this.search.bind(this);
  }

  test = () => {
    this.setState({ date: new Date() });
    console.log(this.state.date)
  }

  search = () => {
    // var self = this;
    // console.log(this.state.date)
    axios.get('http://localhost:8888/playlists')
      .then((response) => {
        // handle success
        console.log(response);
        var test = response.data.playlists.items;
        console.log(test); 
        var res = test.map((id) =>
          <div>
            <iframe src={"https://open.spotify.com/embed/playlist/"+id.id} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>);
        console.log(res);
        this.setState({ playlists: res });
        console.log("state playlist: " + this.state.playlists);

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
            {this.state.playlists}
          </div>
        </div>
      </div>
    )
  }
}

export default Spotify

{/* <iframe src="https://open.spotify.com/embed/track/3GtXRW9ILD3QCAH3NVdwtA" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */ }
