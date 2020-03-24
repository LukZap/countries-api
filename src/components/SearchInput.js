import _ from 'lodash'
import React, { useEffect, useCallback, useState } from 'react'

const SearchInput = ({text, onChange}) => {
    const [textInput, setTextInput] = useState('')
    const debouncedOnChange = useCallback(
        _.debounce(onChange, 500),
        [onChange]
    )

    useEffect(() => {
        setTextInput(text)
    }, [text])
 
    const handleTextChange = (e) => {
        setTextInput(e.target.value);
        debouncedOnChange(e.target.value.trim())
    };

    return (
        <input type="search" placeholder="Search for a country..."
            onChange={handleTextChange} value={textInput} />
    );
}

export default SearchInput;