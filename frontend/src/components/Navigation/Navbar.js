import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Navbar.scss';

const logout = () => {
  window.open("http://localhost:5000/auth/logout", "_self");
};

function Navbar({ user, sideBarHandler }) {
  const { state } = useLocation();

  return (
    <div className='navbar'>
      <div></div>
      <div>
        {user ? (
          <ul className="navbar-list login-nav">
            <li className="navbar-list-item">
              <img
                src={user.photos[0]?.value}
                alt=""
                className="avatar"
              />
            </li>
            <li className="navbar-list-item">{user.displayName}</li>
            <li className="navbar-list-item" onClick={logout}>
              Logout
            </li>
          </ul>
        ) : (
          null
        )}
      </div>
    </div>
  );
}

export default Navbar;