import React, { useState } from 'react'
import { useHistory } from "react-router";

const Header = () => {
    const [theme, setTheme] = useState('Dark');
    const history = useHistory();

    const changeTheme = () => {
        setTheme(theme === 'Dark' ? 'Light' : 'Dark');
        document.documentElement.setAttribute("data-theme", theme.toLowerCase());
    }

    return (
        <header className="header flex-row">
            <div className="flex-row flex-row--space-between container">
                <h1 className="heading header__title" onClick={() => history.push('/')}>Where in the world?</h1>
                <span onClick={changeTheme} className="theme-mode">
                    <i className={theme === 'Dark' ? "far fa-moon" : "fas fa-moon"} />
                    {`${theme} Mode`}
                </span>
            </div>
        </header >
    );
}

export default Header;