import React, { createRef } from 'react'
import { connect } from "react-redux";
import { fetchCountries, searchCountries } from "../actions";
import CountryCard from './CountryCard';
import Select from './Select'
import queryString from 'query-string'
import { withRouter } from "react-router";
import { compose } from 'redux';

class Main extends React.Component {
    options = ['Africa', 'Americas', 'Europe', 'Asia', 'Oceania'];
    state = { selected: null }

    constructor(props) {
        super(props);
        this.searchInput = createRef();
    }

    componentDidMount() {
        const values = queryString.parse(this.props.location.search)
        if (values && values.region) {
            const option = this.options.find(x => x.toLowerCase() === values.region.toLowerCase());
            if (option) {
                this.props.fetchCountries(option);
                this.setState({ selected: option })
            }
        } else if (values && values.search) {
            this.props.searchCountries(values.search);
            this.searchInput.current.value = values.search;
        } else {
            this.props.fetchCountries();
        }
    }

    onSelectChange = (selectedOption) => {
        this.props.fetchCountries(selectedOption);
        this.props.history.push(`/?region=${selectedOption}`);
        this.searchInput.current.value = '';
        this.setState({ selected: selectedOption })
    }

    renderCountriesList = () => {
        return this.props.countries.map(country =>
            <CountryCard country={country} key={country.name} />
        );
    }

    findCountries = () => {
        const searchQuery = this.searchInput.current.value;
        if (searchQuery) {
            this.props.searchCountries(searchQuery);
            this.props.history.push(`/?search=${searchQuery}`);
        }
    }

    onUserTypedToInput = (event) => {
        if (event.keyCode === 13) {
            this.findCountries();
        }
    }

    render() {
        return (
            <div className="main-wrapper">
                <div className="search-filter-menu">
                    <div className="input-wrapper">
                        <input type="search" placeholder="Search for a country..."
                            onKeyUp={this.onUserTypedToInput} ref={this.searchInput} />
                        <i className="fas fa-search" onClick={this.findCountries}></i>
                    </div>
                    <div className="custom-select-wrapper">
                        <Select options={this.options} title='Filter by Region'
                            onChange={this.onSelectChange} selected={this.state.selected} />
                    </div>
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
    connect(mapStateToProps, { fetchCountries, searchCountries })
)(Main);