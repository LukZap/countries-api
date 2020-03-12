import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCountry } from '../actions'

class CountryDetail extends React.Component {
    componentDidMount() {
        const name = this.props.match.params.countryName;
        this.props.fetchCountry(name);
    }

    onBackButtonClick = () => {
        this.props.history.goBack();
    }

    renderBorderCountries = () => {
        return this.props.country.borders.map(x => {
            return <span className="border-badge" key={x}>{x}</span>;
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
                    <img src={this.props.country.flag} alt={`Flag of ${this.props.country.name}`} />
                    <div className="country-details__right-section">
                        <h1 className="country-details__title">{this.props.country.name}</h1>
                        <div className="country-details__info-container">
                            <div className="country-details__general-info">
                                <span className="country-details__info-item">
                                    <strong>Native Name: </strong>{this.props.country.name}
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
                                    <strong>Currencies: </strong>{ this.props.country.currencies.map(x => x.name).join(', ')}
                                </span>                                
                                <span className="country-details__info-item">
                                    <strong>Languages: </strong>{this.props.country.languages.map(x => x.name).join(', ')}
                                </span>
                            </div>
                        </div>
                        <div className="country-details__border-countries-container">
                            <div className="country-details__border-countries">
                                <strong>Border&nbsp;Countries:&nbsp;</strong>
                            </div>
                            <div className="country-details__badges">
                                {this.renderBorderCountries()}
                            </div>
                        </div>
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