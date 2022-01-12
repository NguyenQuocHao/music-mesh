import React, { useState } from 'react';
import * as AiIcons from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar({show, sideBarHandler}) {
  const { state } = useLocation();

  return (
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={show ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={sideBarHandler}>
            <li className='navbar-toggle'>
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
          </ul>
        </nav>
      </IconContext.Provider>
  );
}

export default Navbar;