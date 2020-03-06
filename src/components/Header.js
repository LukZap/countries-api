import React from 'react'


const Header = () => {
    return (
        <header>
            <h1>Where in the world?</h1>
            <span className="theme-mode">
                <i className="far fa-moon" style={{ marginRight: '7px' }}></i>
                Dark Mode
            </span>
        </header>
    );
}

export default Header;