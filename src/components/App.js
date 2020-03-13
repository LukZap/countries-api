import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Header from './Header'
import Main from './Main';
import CountryDetail from './CountryDetail';

const App = () => {
    return (
        <div className="wrapper">
            <Header />
            <main>
                <div style={{padding: '0 20px'}}>
                    <BrowserRouter>
                        <Route path="/" exact component={Main} />
                        <Route path="/:countryName" component={CountryDetail} />
                    </BrowserRouter>
                </div>
            </main>
        </div>
    );
}

export default App;