import React, { useState } from 'react';
import DropdownMenu from './DropDown/DropdownMenu';
import './Navbar.scss';
import { CLIENT, HOST } from '../../variables';
import OutsideAlerter from './DropDown/OutsideAlerter';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar({ user }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(null);
  const [showSuggest, setShowSuggest] = useState(false);

  const search = () => {
    window.open(`${CLIENT}/search/${query}`, "_self");
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      search()
    }
  }

  const handleInput = (e) => {
    const input = e.target.value
    setQuery(input)

    if (input === "") {
      setSuggestions(null)
      return;
    }

    axios.get(`${HOST}/youtube/suggest/${input}`)
      .then(data => {
        setSuggestions(data.data)
      })
  }

  return (
    <header className='navbar'>
      <div className='search'>
        <OutsideAlerter className='search-wrapper-left' handler={() => { setShowSuggest(false) }}>
          <input type="search" className="search-input" onInput={handleInput}
            onKeyPress={handleEnterKey} onClick={() => { setShowSuggest(true) }} value={query}>
          </input>
          <div className='search-suggest'>
            {
              showSuggest && query && suggestions &&
              suggestions.map(item =>
                <Link to={`/search/${item}`} onClick={() => { setQuery(item); setSuggestions(null) }}>
                  <div className='search-suggest-item'>{item}</div>
                </Link>)
            }
          </div>
        </OutsideAlerter>
        <button onClick={search} className="search-button">Search</button>
      </div>
      <div>
        {user ?
          <div className="navbar-list login-nav">
            <div className="navbar-list-item">
              <NavItem
                icon={<img
                  src={user.photos[0]?.value}
                  alt=""
                  className="avatar"
                />}>
                <DropdownMenu mainAccount={user}></DropdownMenu>
              </NavItem>
            </div>
          </div>
          :
          <Link to="/login" className="navbar-list login-nav">Login</Link>
        }
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