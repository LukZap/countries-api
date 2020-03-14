import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import Main from './Main';
import CountryDetail from './CountryDetail';

const App = () => {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Header />
                <main>
                    <div style={{ padding: '0 20px' }}>
                        <Route path="/" exact component={Main} />
                        <Route path="/:countryName" component={CountryDetail} />
                    </div>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;