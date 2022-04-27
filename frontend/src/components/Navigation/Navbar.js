import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu'
import './Navbar.scss';

function Navbar({ user, sideBarHandler }) {
  const { state } = useLocation();
  const [query, setQuery] = useState("");

  const search = () => {
    window.open("http://localhost:3000/search/" + query, "_self");
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }

  return (
    <div className='navbar'>
      <div>
        <input type="search" className="search-input" onInput={e => setQuery(e.target.value)} onKeyPress={handleEnterKey}></input>
        <button onClick={search} className="search-button">Search</button>
      </div>
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