import React from 'react'
import { connect } from 'react-redux';
import { fetchCountry } from '../actions'
import '../styles/country-details.scss';

class CountryDetail extends React.Component {
    componentDidMount() {
        const name = this.props.match.params.countryName;
        this.props.fetchCountry(name);
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.countryName !== prevProps.match.params.countryName) {
            this.props.fetchCountry(this.props.match.params.countryName);
        }
    }

    onBackButtonClick = () => {
        this.props.history.goBack();
    }

    onBadgeClick = (countryName) => {
        this.props.history.push(`/${countryName}`);
    }

    renderBorderCountries = () => {
        return this.props.country.borders.map(borderCountry => {
            return (
                <button 
                    className="border-badge"
                    onClick={() => this.onBadgeClick(borderCountry)}
                    key={borderCountry}>
                    {borderCountry}
                </button>
            )
        })
    }

    render() {
        if (!this.props.country) {
            return <div>No country</div>;
        }

        return (
            <div className="country-details-wrapper">
                <button className="back-button" onClick={this.onBackButtonClick}>
                    <i className="fas fa-arrow-left"></i>
                    Back
                </button>

                <div className="country-details">
                    <div className="country-details__img-container">
                        <img src={this.props.country.flag} alt={`Flag of ${this.props.country.name}`} />
                    </div>
                    <div className="country-details__right-section">
                        <h1 className="country-details__title">{this.props.country.name}</h1>
                        <div className="country-details__info-container">
                            <div className="country-details__general-info">
                                <span className="country-details__info-item">
                                    <strong>Native Name: </strong>{this.props.country.nativeName}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Population: </strong>{this.props.country.population.toLocaleString()}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Region: </strong>{this.props.country.region}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Sub Region: </strong>{this.props.country.subregion}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Capital: </strong>{this.props.country.capital}
                                </span>
                            </div>

                            <div className="country-details__secondary-info">
                                <span className="country-details__info-item">
                                    <strong>Top Level Domain: </strong>{this.props.country.topLevelDomain.join(', ')}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Currencies: </strong>{this.props.country.currencies.map(x => x.name).join(', ')}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Languages: </strong>{this.props.country.languages.map(x => x.name).join(', ')}
                                </span>
                            </div>
                        </div>
                        {
                            this.props.country.borders && this.props.country.borders.length > 0 ?
                                <div className="country-details__border-countries-container">
                                    <div className="country-details__border-countries">
                                        <strong>Border&nbsp;Countries:&nbsp;</strong>
                                    </div>
                                    <div className="country-details__badges">
                                        {this.renderBorderCountries()}
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { country: state.country };
}

export default connect(mapStateToProps, { fetchCountry })(CountryDetail);