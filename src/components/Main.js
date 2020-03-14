import React, { createRef } from 'react'
import { connect } from "react-redux";
import { fetchCountries } from "../actions";
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
        this.getListFromQuery(this.props.location.search);
    }

    getListFromQuery = (query) => {
        const values = queryString.parse(query);
        if (values && values.region) {
            const option = this.options.find(x => x.toLowerCase() === values.region.toLowerCase());
            if (option) {
                this.props.fetchCountries('region', option);
                this.setState({ selected: option })
            }
        } else if (values && values.search) {
            this.props.fetchCountries('name', values.search);
            this.searchInput.current.value = values.search;
            this.setState({ selected: null })
        } else {
            this.props.fetchCountries();
            this.setState({ selected: null })
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.location.search !== prevProps.location.search) {
            this.getListFromQuery(this.props.location.search);
        }
    }

    onSelectChange = (selectedOption) => {
        this.props.history.push(`/?region=${selectedOption}`);
        this.searchInput.current.value = '';
    }

    renderCountriesList = () => {
        if(this.props.countries) {
            return this.props.countries.map(country =>
                <CountryCard country={country} key={country.name} />
            );
        } else {
            return <div>No countres found</div>
        }
    }

    findCountries = () => {
        const searchQuery = this.searchInput.current.value;
        if (searchQuery) {
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
    return { 
        countries: state.countries.countries,
    };
}

export default compose(
    withRouter,
    connect(mapStateToProps, { fetchCountries })
)(Main);