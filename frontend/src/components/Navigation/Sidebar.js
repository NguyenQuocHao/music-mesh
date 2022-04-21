import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.scss';
import { useSelector } from 'react-redux'
import { myYoutubePlaylists } from '../../redux/reducers/youtubeSlice'
import { mySpotifyPlaylists } from '../../redux/reducers/spotifySlice'
import GetRedirectLink from '../../utils/redirect'
import Logo from "../../assets/img/music mesh-logos_transparent.png";

function Sidebar({ show, sideBarHandler }) {
  const { state } = useLocation();
  const youtubePlaylists = useSelector(myYoutubePlaylists);
  const spotifyPlaylists = useSelector(mySpotifyPlaylists);

  const getYoutubePlaylists = () => {
    if (!Array.isArray(youtubePlaylists)) {
      return;
    }

    return youtubePlaylists.map(item =>
      <div className='side-bar-text' key={item.id}>
        <Link
          to={{
            pathname: `/${GetRedirectLink('youtube', 'playlist')}/${item.id}`,
            state: { id: item.id }
          }}>
          {item.title}
        </Link>
      </div>);
  }

  const getSpotifyPlaylists = () => {
    if (!Array.isArray(spotifyPlaylists)) {
      return;
    }

    return spotifyPlaylists.map(item =>
      <div className='side-bar-text' key={item.id}>
        <Link
          to={{
            pathname: `/${GetRedirectLink('spotify', 'playlist')}/${item.id}`,
            state: { id: item.id }
          }}>
          {item.name}
        </Link>
      </div>);
  }

  return (
    // <IconContext.Provider value={{ color: '#fff' }}>
    <nav className={show ? 'side-bar active' : 'side-bar'}>
      <ul className='side-bar-items' onClick={sideBarHandler}>
        <li className='side-bar-toggle'>
          <a className='menu-bars' href='/'>
            <img src={Logo} height='100px' />
          </a>
        </li>
        <br></br>
        <div>Main</div>
        {SidebarData.map((item, index) => {
          return (
            <li key={index} className={item.cName}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
        <br></br>
        <div>My Playlists</div>
        <ul className='youtube-playlists'>
          {
            getYoutubePlaylists()
          }
        </ul>
        <ul className='spotify-playlists'>
          {
            getSpotifyPlaylists()
          }
        </ul>
      </ul>
    </nav>
    // </IconContext.Provider>
  );
}

export default Sidebar;