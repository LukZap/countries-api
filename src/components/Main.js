import React from 'react'
import { connect } from "react-redux";
import { fetchCountries } from "../actions";
import CountryCard from './CountryCard';
import Select from './Select'

class Main extends React.Component {
    options = ['Africa','Americas','Europe','Asia','Oceania'];

    componentDidMount() {
        this.props.fetchCountries();
    }

    onSelectChange = (selectedOption) => {
        this.props.fetchCountries(selectedOption);
    }

    renderCountriesList = () => {
        return this.props.countries.map(country => 
            <CountryCard key={country.name} country={country} /> 
        );        
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="search-filter-menu">
                    <div className="input-wrapper">
                        <input type="search" placeholder="Search for a country..." />
                        <i className="fas fa-search"></i>
                    </div>
                    <Select options={this.options} title='Filter by Region' 
                        onChange={this.onSelectChange} />
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