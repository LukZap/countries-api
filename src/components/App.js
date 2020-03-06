import React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Header from './Header'
import Main from './Main';
import CountryDetail from './CountryDetail';

const App = () => {
    return (
        <div className="wrapper">
            <BrowserRouter>
                <Header />
                <Route path="/" exact component={Main} />
                <Route path="/country" exact component={CountryDetail} />
            </BrowserRouter>
        </div>
    );
}

export default App;