import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Header from './Header'
import Main from './Main';
import CountryDetail from './CountryDetail';

const App = () => {
    return (
        <div className="wrapper">
            <HashRouter>
                <Header />
                <main>
                    <div style={{ padding: '0 20px' }}>
                        <Route path="/" exact component={Main} />
                        <Route path="/:countryName" component={CountryDetail} />
                    </div>
                </main>
            </HashRouter>
        </div>
    );
}

export default App;