import React, { useEffect } from 'react';
import { useState } from 'react';
import useQueryParams from './useQueryParams';
import { regions } from '../consts';
import Select from './shared/Select';

import '../styles/select.scss';

const RegionSelect = ({onChange}) => {
    const [selectedOption, setSelectedOption] = useState(null)

    const queryParams = useQueryParams();

    useEffect(() => {
        setSelectedOption(queryParams ? queryParams.region : null)
    }, [queryParams])

    const handleSelected = (region) => {
        onChange(region)
        setSelectedOption(region)
    }
    
    return (
        <Select 
            options={regions} 
            selected={selectedOption} 
            onSelect={handleSelected} 
            title='Filter by Region' />
    );
}

export default RegionSelect;

