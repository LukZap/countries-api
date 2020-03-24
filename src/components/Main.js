import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory } from "react-router";
import queryString from 'query-string'

import { fetchCountries } from "../actions";
import SearchInput from './SearchInput'
import CountryCard from './CountryCard';
import Select from './Select'

const Main = () => {
    // for state
    const options = ['Africa', 'Americas', 'Europe', 'Asia', 'Oceania'];
    const [selected, setSelected] = useState(null)
    const [inputValue, setInputValue] = useState('')

    // for routing
    const { search } = useLocation();
    const history = useHistory();

    // for store
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries.countries)

    useEffect(() => {
        getListFromQuery(search);
    }, [search])

    const getListFromQuery = (query) => {
        const values = queryString.parse(query);

        if (values && values.region) {
            const option = options.find(x => x.toLowerCase() === values.region.toLowerCase());
            if (option) {
                dispatch(fetchCountries('region', option))
                setSelected(option);
            }
        } else if (values && values.search) {
            dispatch(fetchCountries('name', values.search))
            setInputValue(values.search)
            setSelected(null)
        } else {
            dispatch(fetchCountries())
            setSelected(null)
        }
    }
    
    const findCountries = (val) => {
        history.push(val ? `/?search=${val}` : '/')
    }

    const onSelectChange = (selectedOption) => {
        history.push(`/?region=${selectedOption}`);
        setInputValue('')
    }

    const renderCountriesList = () => {
        if (countries) {
            return countries.map(country =>
                <CountryCard country={country} key={country.name} />
            );
        } else {
            return <div>No countres found</div>
        }
    }

    return (
        <div className="main-wrapper">
            <div className="search-filter-menu">
                <div className="input-wrapper">
                    <SearchInput onChange={findCountries} text={inputValue} />
                    <i className="fas fa-search" />
                </div>
                <div className="custom-select-wrapper">
                    <Select options={options} title='Filter by Region'
                        onChange={onSelectChange} selected={selected} />
                </div>
            </div>

            <div className="countries-list">
                {renderCountriesList()}
            </div>
        </div>
    );
}

export default Main;