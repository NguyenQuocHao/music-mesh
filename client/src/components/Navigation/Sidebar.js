import React from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.scss';
import { useSelector } from 'react-redux';
import { myYoutubePlaylists } from '../../redux/reducers/youtubeSlice';
import { mySpotifyPlaylists } from '../../redux/reducers/spotifySlice';
import GetRedirectLink from '../../utils/redirect';
import Logo from "../../assets/img/music mesh-logos_transparent.png";

function Sidebar({ show, sideBarHandler }) {
  const youtubePlaylists = useSelector(myYoutubePlaylists);
  const spotifyPlaylists = useSelector(mySpotifyPlaylists);

  const getYoutubePlaylists = () => {
    if (!Array.isArray(youtubePlaylists)) {
      return;
    }

    return youtubePlaylists.map(item =>
      <div className='sidebar-text' key={item.id}>
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
      <div className='sidebar-text' key={item.id}>
        <Link
          to={{
            pathname: `/${GetRedirectLink('spotify', 'playlist')}/${item.id}`,
            state: { id: item.id }
          }}>
          {item.title}
        </Link>
      </div>);
  }

  return (
    <nav className={show ? 'sidebar active' : 'sidebar'}>
      <ul className='sidebar-items' onClick={sideBarHandler}>
        <li className='sidebar-toggle'>
          <a className='menu-bars' href='/'>
            <img src={Logo} height='100px' />
          </a>
        </li>
        <br></br>
        <div className='sidebar-title'>Main</div>
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
        <div className='sidebar-title'>My Playlists</div>
        <div className='sidebar-youtube-playlists'>
          {
            getYoutubePlaylists()
          }
        </div>
        <div className='sidebar-spotify-playlists'>
          {
            getSpotifyPlaylists()
          }
        </div>
      </ul>
    </nav>
  );
}

export default Sidebar;