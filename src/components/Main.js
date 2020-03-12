import React, { createRef } from 'react'
import { connect } from "react-redux";
import { fetchCountries } from "../actions";
import CountryCard from './CountryCard';
import Select from './Select'
import queryString from 'query-string'
import { withRouter } from "react-router";
import { compose } from 'redux';


class Main extends React.Component {
    options = ['Africa','Americas','Europe','Asia','Oceania'];

    constructor(props) {
        super(props);
        this.searchInput = createRef();
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        if(values && values.region && 
            this.options.find(x => x.toLowerCase() === values.region.toLowerCase())) {
            this.props.fetchCountries(values.region.toLowerCase());
        } else {
            this.props.fetchCountries();
        }
    }

    onSelectChange = (selectedOption) => {
        this.props.fetchCountries(selectedOption);
        this.props.history.push(`/?region=${selectedOption}`);
    }

    renderCountriesList = () => {
        return this.props.countries.map(country => 
            <CountryCard key={country.name} country={country} /> 
        );        
    }

    findCountries = () => {
        console.log('hit enter');
        // add search action
    }

    onUserTypedToInput= (event) => {
        if (event.keyCode === 13) {
            this.findCountries(this.searchInput.current.value);
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="search-filter-menu">
                    <div className="input-wrapper">
                        <input type="search" placeholder="Search for a country..." 
                            onKeyUp={this.onUserTypedToInput} ref={this.searchInput}/>
                        <i className="fas fa-search" onClick={this.findCountries}></i>
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

export default compose( 
    withRouter,
    connect(mapStateToProps, { fetchCountries })
)(Main);