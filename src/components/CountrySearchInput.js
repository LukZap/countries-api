import React, { useEffect } from 'react'
import { useState } from 'react';
import useQueryParams from './useQueryParams';
import Input from './shared/Input';


const CountrySearchInput = ({onDebounce}) => {
    const [text, setText] = useState('')

    const queryParams = useQueryParams();

    useEffect(() => {
        const newInputText = !queryParams || !queryParams.country ? '' : queryParams.country 
        setText(newInputText)
    },[queryParams])

    return (
        <Input 
            onDebounce={onDebounce}
            onText={setText}
            text={text}
            placeholder='Search for a country...' />
    );
}

export default CountrySearchInput;