import React from 'react'
import { Route, HashRouter } from 'react-router-dom'

import Header from './Header'
import Main from './Main';
import CountryDetail from './CountryDetail';

const App = () => {
    return (
        <div className="wrapper">
            <HashRouter>
                <Header />
                <main>
                    <div className="app-container">
                        <Route path="/" exact component={Main} />
                        <Route path="/:countryName" component={CountryDetail} />
                    </div>
                </main>
            </HashRouter>
        </div>
    );
}

export default App;