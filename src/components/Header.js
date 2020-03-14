import React from 'react'
import { withRouter } from "react-router";

class Header extends React.Component {
    state = {theme: 'Dark'};

    goToMainPage = () => {
        this.props.history.push('/');
    }
    
    changeTheme = () => {
        this.setState({theme: this.state.theme === 'Dark' ? 'Light' : 'Dark'});
        document.documentElement.setAttribute("data-theme", this.state.theme.toLowerCase());
    }

    render() {
        return (
            <header>
                <div className="header-wrapper">
                    <h1 onClick={this.goToMainPage}>Where in the world?</h1>
                    <span onClick={this.changeTheme} className="theme-mode">
                        <i 
                            className={this.state.theme === 'Dark' ? "far fa-moon" : "fas fa-moon"}
                            style={{ marginRight: '7px' }}></i>
                        {`${this.state.theme} Mode`}
                </span>
                </div>
            </header >
        );
    }
}

export default withRouter(Header);