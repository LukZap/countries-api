import _ from 'lodash'
import React, { useCallback } from 'react'


const Input = ({text, onText, onDebounce, placeholder}) => {

    const debouncedOnChange = useCallback(
        _.debounce(onDebounce, 500),
        [onDebounce]
    )
    const handleTextChange = (e) => {
        onText(e.target.value);
        debouncedOnChange(e.target.value.trim())
    };

    return (
        <input 
            type="search" 
            placeholder={placeholder}
            onChange={handleTextChange} 
            value={text} />
    );
}

export default Input;