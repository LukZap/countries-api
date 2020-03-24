import React from 'react'
import { useHistory } from 'react-router-dom';

import '../styles/country-card.scss';

const CountryCard = ({ country }) => {
    const history = useHistory()

    return (
        <div className="country-card" key={country.name} onClick={() =>  history.push(`/${country.name}`)}>
            <div className="country-card__img" style={{ backgroundImage: `url(${country.flag})` }}></div>
            <div className="country-card__info-section">
                <h3 className="heading heading--h3 country-card__title">{country.name}</h3>
                <span className="country-card__info-detail"><strong>Population:</strong> {country.population.toLocaleString()}</span>
                <span className="country-card__info-detail"><strong>Region:</strong> {country.region}</span>
                <span className="country-card__info-detail"><strong>Capital:</strong> {country.capital}</span>
            </div>
        </div>
    );
}

export default CountryCard;