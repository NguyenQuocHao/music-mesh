import React from 'react';
import './Navbar.scss';

const NavButton = ({ isLeft, handler }) => {
    if (isLeft) {
        return (<div className="nav-button" title="Previous" onClick={handler}>&#8249;</div>)
    }

    return (<div className="nav-button" title="Next" onClick={handler}>&#8250;</div>)
}

export default NavButton