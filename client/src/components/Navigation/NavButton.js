import React from 'react';
import './Navbar.scss';

const NavButton = ({isLeft, handler}) => {
    if(isLeft){
        return(<a href="#" className="nav-button" onClick={handler}>&#8249;</a>)             
    }

    return(<a href="#" className="nav-button" onClick={handler}>&#8250;</a>)             
}

export default NavButton