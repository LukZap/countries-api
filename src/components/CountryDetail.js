import React from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../styles/country-details.scss';
import useCountry from './useCountry';

const CountryDetail = () => {
    const country = useSelector(state => state.country)
    const history = useHistory();
    useCountry();

    const onBackButtonClick = () => {
        history.goBack();
    }

    const onBadgeClick = (countryName) => {
        history.push(`/${countryName}`);
    }

    const renderBorderCountries = () => {
        return country.borders.map(borderCountry => {
            return (
                <button
                    className="border-button badge"
                    onClick={() => onBadgeClick(borderCountry)}
                    key={borderCountry}>
                    {borderCountry}
                </button>
            )
        })
    }

    if (!country) {
        return <div>No country</div>;
    } else {
        return (
            <div className="country-details-wrapper">
                <button className="back-button badge" onClick={onBackButtonClick}>
                    <i className="fas fa-arrow-left"></i>
                    Back
                </button>

                <div className="country-details">
                    <div className="country-details__img-container">
                        <img src={country.flag} alt={`Flag of ${country.name}`} />
                    </div>
                    <div className="country-details__right-section">
                        <h1 className="heading heading--h1 country-details__title">{country.name}</h1>
                        <div className="country-details__info-container">
                            <div className="country-details__general-info">
                                <CountryDetailInfo title="Native Name" info={country.nativeName} />
                                <CountryDetailInfo title="Population" info={country.population.toLocaleString()} />
                                <CountryDetailInfo title="Region" info={country.region} />
                                <CountryDetailInfo title="Sub Region" info={country.subregion} />
                                <CountryDetailInfo title="Capital" info={country.capital} />
                            </div>
                            <div className="country-details__secondary-info">
                                <CountryDetailInfo title="Top Level Domain" info={country.topLevelDomain.join(', ')} />
                                <CountryDetailInfo title="Currencies" info={country.currencies.map(x => x.name).join(', ')} />
                                <CountryDetailInfo title="Languages" info={country.languages.map(x => x.name).join(', ')} />
                            </div>
                        </div>
                        {
                            (country.borders && country.borders.length > 0) &&
                            <div className="country-details__border-countries-container">
                                <div className="country-details__border-countries">
                                    <strong>Border&nbsp;Countries:&nbsp;</strong>
                                </div>
                                <div className="country-details__badges">
                                    {renderBorderCountries()}
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const CountryDetailInfo = ({title, info}) => {
    return (
        <span className="country-details__info-item">
            <strong>{title}: </strong>{info}
        </span>
    )
}

export default CountryDetail;