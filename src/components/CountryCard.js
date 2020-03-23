import React from 'react'
import { Redirect } from 'react-router-dom';
import '../styles/country-card.scss';

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
                <div className="country-card__img" style={{backgroundImage:  "url(" + this.props.country.flag + ")"}}></div>
                <div className="country-card__info-section">
                    <h3 className="heading heading--h3 country-card__title">{this.props.country.name}</h3>
                    <span className="country-card__info-detail"><strong>Population:</strong> {this.props.country.population.toLocaleString()}</span>
                    <span className="country-card__info-detail"><strong>Region:</strong> {this.props.country.region}</span>
                    <span className="country-card__info-detail"><strong>Capital:</strong> {this.props.country.capital}</span>
                </div>
            </div>
        );
    }
}

export default CountryCard;