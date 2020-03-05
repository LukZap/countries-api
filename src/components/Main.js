import React from 'react'
import Filter from './Filter'
import SearchBar from './SearchBar'
import CountryList from './CountryList'

const Main = () => {
    return (
        <div>
            <SearchBar />
            <Filter />
            <CountryList />
        </div>
    );
}

export default Main;