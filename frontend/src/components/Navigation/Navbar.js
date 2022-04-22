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
      <Link className='menu-bars'
        to={{
          state: state
        }}>
      </Link>
      <div className='userInfo'>
        {user ? (
          <ul className="list loginNav">
            <li className="listItem">
              <img
                src={user.photos[0]?.value}
                alt=""
                className="avatar"
              />
            </li>
            <li className="listItem">{user.displayName}</li>
            <li className="listItem" onClick={logout}>
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