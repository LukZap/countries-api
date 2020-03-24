import React, { useEffect } from 'react';
import { useState } from 'react';
import classNames from 'classnames'

import '../styles/select.scss';

const Select = ({options, title, onChange, selected}) => {
    const [selectOpen, setSelectOpen] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null)

    useEffect(() => {
        setSelectedOption(selected)
    }, [selected])

    const onClick = (option) => {
        setSelectedOption(option)
        onChange(option);
    }

    const renderOptions = () => {
        return options.map(option => {
            return (
                <span
                    className={classNames('custom-option', {selected: selected === option})}
                    key={option}
                    onClick={() => onClick(option)}>
                    {option}
                </span>
            )
        })
    }

    return (
        <div onClick={() => setSelectOpen(!selectOpen)} className={classNames('custom-select', {open: selectOpen})}>
            <div className="custom-select__trigger">
                <span>{selectedOption || title}</span>
                <div className="arrow"></div>
            </div>
            <div className="custom-options">
                {renderOptions()}
            </div>
        </div>
    );
}

export default Select;

