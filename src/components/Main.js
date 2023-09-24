import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import { fetchCountries } from "../actions";
import CountrySearchInput from './CountrySearchInput'
import CountryCard from './CountryCard';
import RegionSelect from './RegionSelect'
import useQueryParams from './useQueryParams';
import { regions } from '../consts';
 

const renderCountriesList = (countries) => {
    if (countries) {
        return countries.map(country =>
            <CountryCard country={country} key={country.name} />
        );
    }

    return <div>No countres found</div>
}

const Main = () => {
    // for routing
    const queryParams = useQueryParams()
    const history = useHistory();

    // for store
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries.countries)

    useEffect(() => {
        if(!queryParams) {
            dispatch(fetchCountries())
            return
        }

        if (queryParams.region) {
            const option = regions.find(x => x.toLowerCase() === queryParams.region.toLowerCase());
            if (option) {
                dispatch(fetchCountries('region', option))
            }
        } else if (queryParams.country) {
            dispatch(fetchCountries('name', queryParams.country))
        }
    }, [queryParams, dispatch])

    const handleInputDebunce = (countrySearch) => {
        history.push(countrySearch ? `/?country=${countrySearch}` : '/')
    }

    const handleSelectChange = (selectedRegion) => {
        history.push(`/?region=${selectedRegion}`);
    }

    return (
        <div className="main-wrapper">
            <div className="search-filter-menu">
                <div className="input-wrapper">
                    <CountrySearchInput onDebounce={handleInputDebunce} />
                    <i className="fas fa-search" />
                </div>
                <div className="custom-select-wrapper">
                    <RegionSelect onChange={handleSelectChange} />
                </div>
            </div>

            <div className="countries-list">
                {renderCountriesList(countries)}
            </div>
        </div>
    );
}

export default Main;