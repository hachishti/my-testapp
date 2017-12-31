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
        name: 'My Playlist 1',
        songs: [
          { name: 'song1 list1', duration: 1256 },
          { name: 'song2 list1', duration: 5454 },
          { name: 'song3 list1', duration: 4477 }
        ]
      }
      ,
      {
        name: 'My playlist 2',
        songs: [
          { name: 'song1 list2', duration: 555 },
          { name: 'song2 list2', duration: 5224 }
        ]
      }
      ,
      {
        name: 'My Playlist 3',
        songs: [
          { name: 'song1 list3', duration: 1256 },
          { name: 'song2 list3', duration: 5454 },
          { name: 'song3 list3', duration: 4477 }
        ]
      }
      ,
      {
        name: 'My Playlisy 4',
        songs: [
          { name: 'song1 list4', duration: 545 },
          { name: 'song2 list4', duration: 98 },
          { name: 'song3 list4', duration: 787 },
          { name: 'song4 list4', duration: 787 },
          { name: 'song5 list4', duration: 3434 }
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
        <input type="text" />

      </div>
    );
  }
}

class PlayLists extends Component {
  render() {
    return (
      <div style={{ ...varDefaultStyle, width: "20%", display: 'inline-block' }}>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>  <li>Song 2</li>  <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = { serverData: {} }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ serverData: fakeServerData })
    }, 2000);

  }

  render() {
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
            <PlaylistCounter playLists={this.state.serverData.user.playLists} />
            <HoursCounter playLists={this.state.serverData.user.playLists} />
            <Filters />
            <PlayLists />
            <PlayLists />
            <PlayLists />
            <PlayLists />
          </div> : <h1 style={varDefaultStyle}>Loading...</h1>
        }
      </div>
    );
  }
}

export default App;
