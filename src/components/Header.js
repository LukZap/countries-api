import React from 'react'


const Header = () => {
    return (
        <header>
            <div className="header-wrapper">
                <h1>Where in the world?</h1>
                <span className="theme-mode">
                    <i className="far fa-moon" style={{ marginRight: '7px' }}></i>
                    Dark Mode
                </span>
            </div>
        </header>
    );
}

export default Header;