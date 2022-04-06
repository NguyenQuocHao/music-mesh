import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.scss';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux'
import { myYoutubePlaylists, getMyYoutubePlaylists } from '../../redux/youtubeSlice'
import GetRedirectLink from '../../utils/redirect'

function Sidebar({ show, sideBarHandler }) {
  const { state } = useLocation();
  const youtubePlaylists = useSelector(myYoutubePlaylists);

  const getYoutubePlaylists = () => {
    if (!Array.isArray(youtubePlaylists)) {
      return;
    }

    return youtubePlaylists.map(item =>
      <div className='side-bar-playlist-text side-bar-text-hover'>
        <Link
          to={{
            pathname: `/${GetRedirectLink('youtube', 'playlist')}/${item.id}`,
            state: { id: item.id }
          }}>
          {item.snippet.title}
        </Link>
      </div>);
  }

  return (
    // <IconContext.Provider value={{ color: '#fff' }}>
    <nav className={show ? 'side-bar active' : 'side-bar'}>
      <ul className='side-bar-items' onClick={sideBarHandler}>
        <li className='side-bar-toggle'>
          <Link className='menu-bars'
            to={{
              state: state
            }}>
            Music Mesh
          </Link>
        </li>
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
        <br></br>
        <ul className='youtube-playlists'>
          {
            getYoutubePlaylists()
          }
        </ul>
      </ul>
    </nav>
    // </IconContext.Provider>
  );
}

export default Sidebar;