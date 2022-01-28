import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.scss';
import { IconContext } from 'react-icons';

function Sidebar({ show, sideBarHandler, youtubePlaylists, spotifyPlaylists }) {
  const { state } = useLocation();

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
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
          <div className='side-bar-text'>My Playlists</div>
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebar;