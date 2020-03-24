import React from 'react'

const CountryDetailInfo = ({title, info}) => {
    return (
        <span className="country-details__info-item">
            <strong>{title}: </strong>{info}
        </span>
    )
}

export default CountryDetailInfo;