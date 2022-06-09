import React, { useState } from 'react';
import DropdownMenu from './DropDown/DropdownMenu';
import './Navbar.scss';
import { CLIENT } from '../../variables';
import OutsideAlerter from './DropDown/OutsideAlerter';

function Navbar({ user }) {
  const [query, setQuery] = useState("");

  const search = () => {
    window.open(CLIENT + "/search/" + query, "_self");
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }

  return (
    <header className='navbar'>
      <div>
        <input type="search" className="search-input" onInput={e => setQuery(e.target.value)} onKeyPress={handleEnterKey}></input>
        <button onClick={search} className="search-button">Search</button>
      </div>
      <div>
        {user ? (
          <div className="navbar-list login-nav">
            <div className="navbar-list-item">
              <NavItem
                icon={<img
                  src={user.photos[0]?.value}
                  alt=""
                  className="avatar"
                />}
              >
                <DropdownMenu mainAccount={user}></DropdownMenu>
              </NavItem>
            </div>
          </div>
        ) : (
          null
        )}
      </div>
    </header>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <OutsideAlerter handler={() => { setOpen(false) }}>
      <li className="nav-item">
        <div className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </div>

        {open && props.children}
      </li>
    </OutsideAlerter>
  );
}

export default Navbar;