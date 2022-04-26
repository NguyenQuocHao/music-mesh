import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'
import './Navbar.scss';

function Navbar({ user, sideBarHandler }) {
  const { state } = useLocation();

  return (
    <div className='navbar'>
      <div></div>
      <div>
        {user ? (
          <ul className="navbar-list login-nav">
            <li className="navbar-list-item">
              <NavItem icon={<img
                src={user.photos[0]?.value}
                alt=""
                className="avatar"
              />}>
                <DropdownMenu mainAccount={user}></DropdownMenu>
              </NavItem>
            </li>
          </ul>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

export default Navbar;