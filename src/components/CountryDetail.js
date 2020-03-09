import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class CountryDetail extends React.Component {
    state = { goToHome: false, country: null };

    componentDidMount() {
        const name = this.props.match.params.countryName;
        this.setState({ country: this.props.countries.find(x => x.name === name) });
    }

    onBackButtonClick = () => {
        this.setState({goToHome: true})
    }

    renderBorderCountries = () => {
        return this.state.country.borders.map(x => {
            const borderCountry = this.props.countries.find(c => c.alpha3Code === x);
            if(!borderCountry) return null; // just problem when country is on different continent
            return <span className="border-badge" key={borderCountry.name}>{borderCountry.name}</span>;
        })
    }

    render() {
        if (this.state.goToHome) {
            return <Redirect push to="/" />;
        }

        if (!this.state.country) {
            return <div>No country</div>;
        }

        return (
            <div>
                <button className="back-button" onClick={this.onBackButtonClick}>
                    <i className="fas fa-arrow-left"></i>
                    Back
                </button>

                <div className="country-details">
                    <img src={this.state.country.flag} alt={`Flag of ${this.state.country.name}`} />
                    <div className="country-details__right-section">
                        <h1 className="country-details__title">{this.state.country.name}</h1>
                        <div className="country-details__info-container">
                            <div className="country-details__general-info">
                                <span className="country-details__info-item">
                                    <strong>Native Name: </strong>{this.state.country.name}
                                </span>                            
                                <span className="country-details__info-item">
                                    <strong>Population: </strong>{this.state.country.population.toLocaleString()}
                                </span>                            
                                <span className="country-details__info-item">
                                    <strong>Region: </strong>{this.state.country.region}
                                </span>           
                                <span className="country-details__info-item">
                                    <strong>Sub Region: </strong>{this.state.country.subregion}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Capital: </strong>{this.state.country.capital}
                                </span>
                            </div>

                            <div className="country-details__secondary-info">
                                <span className="country-details__info-item">
                                    <strong>Top Level Domain: </strong>{this.state.country.topLevelDomain.join(', ')}
                                </span>
                                <span className="country-details__info-item">
                                    <strong>Currencies: </strong>{ this.state.country.currencies.map(x => x.name).join(', ')}
                                </span>                                
                                <span className="country-details__info-item">
                                    <strong>Languages: </strong>{this.state.country.languages.map(x => x.name).join(', ')}
                                </span>
                            </div>
                        </div>
                        <div className="country-details__border-countries">
                            <div>
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
    return { countries: state.countries };
}

export default connect(mapStateToProps, null)(CountryDetail);