import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { SiYoutube, SiSpotify } from 'react-icons/si';
import { AiOutlinePlus, AiOutlineLogout } from 'react-icons/ai';
import './Navbar.scss';

const unconnect = () => {
  window.open("http://localhost:5000/auth/unconnect", "_self");
};

const logout = () => {
  window.open("http://localhost:5000/auth/logout", "_self");
};

const goToSpotify = () => {
  window.open("http://localhost:3000/spotify", "_self");
};

const goToYoutube = () => {
  window.open("http://localhost:3000/youtube", "_self");
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

function DropdownMenu({ mainAccount }) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height + 30);
  }

  function DropdownItem(props) {
    function goToMenu() {
      if (props.goToMenu) {
        setActiveMenu(props.goToMenu);
      }
    }
    
    return (
      <a href="#" className="menu-item" onClick={props.handler ? props.handler : goToMenu}>
        {props.leftIcon ? <span className="icon-button">{props.leftIcon}</span> : null}
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
        >
        <div className="menu">
          <DropdownItem
            leftIcon={<img
              src={mainAccount.photos[0]?.value}
              alt=""
              className="avatar"
            />}
            rightIcon={mainAccount.provider === "google" ? <SiYoutube /> : <SiSpotify />}>
            {mainAccount.displayName}
          </DropdownItem>
          {
            mainAccount.linkedAccount ?
              <DropdownItem
                leftIcon={<img
                  src={mainAccount.linkedAccount.photos[0]?.value}
                  alt=""
                  className="avatar"
                />}
                rightIcon={mainAccount.linkedAccount.provider === "google" ? <SiYoutube /> : <SiSpotify />}
                goToMenu="unlink">
                {mainAccount.linkedAccount.displayName}
              </DropdownItem>
              :
              <DropdownItem leftIcon={<AiOutlinePlus />} handler={mainAccount.provider === "google" ? goToSpotify : goToYoutube}>
                Connect account
              </DropdownItem>
          }
          <DropdownItem leftIcon={<AiOutlineLogout />} handler={logout}>
            Logout
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'unlink'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
        >
        <div className="menu">
          <DropdownItem>
            <h3>Do you want to unlink this account?</h3>
          </DropdownItem>
          <DropdownItem handler={unconnect}>Yes</DropdownItem>
          <DropdownItem goToMenu="main">No</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Navbar;