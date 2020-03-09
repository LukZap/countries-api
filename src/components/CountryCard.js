import React from 'react'
import { Redirect } from 'react-router-dom';

class CountryCard extends React.Component {
    state = {redirect: false};

    onClick = () => {
        this.setState({redirect: true});
    }

    render() {
        if(this.state.redirect === true) {
            return <Redirect push to={`/${this.props.country.name}`} />
        }

        return (
            <div className="country-card" key={this.props.country.name} onClick={this.onClick}>
                <img src={this.props.country.flag} alt={`Flag of ${this.props.country.name}`} width="100%" />
                <div className="country-card__info">
                    <h3>{this.props.country.name}</h3>
                    <span><strong>Population:</strong> {this.props.country.population.toLocaleString()}</span>
                    <span><strong>Region:</strong> {this.props.country.region}</span>
                    <span><strong>Capital:</strong> {this.props.country.capital}</span>
                </div>
            </div>
        );
    }
}

export default CountryCard;