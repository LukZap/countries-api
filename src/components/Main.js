import React from 'react'
import { connect } from "react-redux";
import { fetchCountries } from "../actions";
import CountryCard from './CountryCard';

class Main extends React.Component {
    componentDidMount() {
        this.props.fetchCountries();
    }

    selectChange = (event) => {
        this.props.fetchCountries(event.target.value);
    }

    renderCountriesList = () => {
        return this.props.countries.map(country => 
            <CountryCard key={country.name} country={country} /> 
        );        
    }

    render() {
        return (
            <div>
                <div className="search-filter-menu">
                    <div className="input-wrapper">
                        <input type="search" placeholder="Search for a country..." />
                        <i className="fas fa-search"></i>
                    </div>
                    <select onChange={this.selectChange}>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="oceania">Oceania</option>
                    </select>
                </div>

                <div className="countries-list">
                    {this.renderCountriesList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { countries: state.countries };
}

export default connect(mapStateToProps, { fetchCountries })(Main);