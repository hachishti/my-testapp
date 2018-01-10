import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let varDefaultTextColor = '#fff';
let varDefaultStyle = {
  color: varDefaultTextColor
}

let fakeServerData = {
  user: {
    userFirstName: 'David',
    userLastName: 'Brown',
    playLists: [
      {
        name: 'DevTips',
        songs: [
          { name: 'Tutorial 1', duration: 1256 },
          { name: 'Tutorial 2', duration: 5454 },
          { name: 'Tutorial 3', duration: 4477 }
        ]
      }
      ,
      {
        name: 'Technoledge',
        songs: [
          { name: 'React with JSX', duration: 555 },
          { name: 'React States', duration: 5224 }
        ]
      }
      ,
      {
        name: 'Car TV',
        songs: [
          { name: 'Audi A8 2018', duration: 1256 },
          { name: 'Mercedes S500', duration: 5454 },
          { name: 'BMW X7 2018', duration: 4477 }
        ]
      }
      ,
      {
        name: 'My Favourite Songs',
        songs: [
          { name: 'song1', duration: 545 },
          { name: 'song2', duration: 98 },
          { name: 'song3', duration: 787 },
          { name: 'song4', duration: 787 },
          { name: 'song5', duration: 3434 }
        ]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div style={{ width: '20%', display: 'inline-block', ...varDefaultStyle }}>
        <h2>{this.props.playLists.length} playlists</h2>
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playLists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration
    }, 0);
    return (
      <div style={{ width: '20%', display: 'inline-block', ...varDefaultStyle }}>
        <h2>{Math.round(totalDuration / 60)} hours</h2>
      </div>
    );
  }
}

class Filters extends Component {
  render() {
    return (
      <div style={varDefaultStyle}>
        <img />
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)
        } />

      </div>
    );
  }
}

class PlayLists extends Component {
  render() {
    let varPlaylist = this.props.playLists;
    return (
      <div style={{ ...varDefaultStyle, width: "20%", display: 'inline-block' }}>
        <img />
        <h3>{varPlaylist.name}</h3>
        <ul>
          {
            varPlaylist.songs.map(
              songs =>
                <li>{songs.name}</li>
            )
          }
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state =
      {
        serverData: {},
        filterString: ''
      }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 1000);
  }

  render() {
    let playlistToRender = this.state.serverData.user ?
      this.state.serverData.user.playLists.filter(playLists =>
        playLists.name.toLowerCase().includes(
          this.state.filterString.toLowerCase())
      ) : []
    return (
      <div className="App">
        {
          this.state.serverData.user
          &&
          <h1 style={varDefaultStyle}>
            {
              this.state.serverData.user.userFirstName
            }
            &nbsp;
            {
              this.state.serverData.user.userLastName
            }
            's Playlist
          </h1>
        }
        {this.state.serverData.user ?
          <div>
            <PlaylistCounter playLists={playlistToRender} />
            <HoursCounter playLists={playlistToRender} />
            <Filters onTextChange={text => this.setState({ filterString: text })} />
            {
              playlistToRender.map(
                playLists =>
                  <PlayLists playLists={playLists} />
              )
            }
          </div> : <h1 style={varDefaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}
export default App;
