import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';

const Select = ({options, title, onSelect, selected}) => {
    const [selectOpen, setSelectOpen] = useState(false)

    const handleOptionSelect = (option) => {
        onSelect(option);
    }

    const handleOpenCloseSelect = () => {
        setSelectOpen(opened => !opened)
    }

    const renderOptions = () => {
        return options.map(option => {
            return (
                <span
                    className={classNames('custom-option', {selected: selected === option})}
                    key={option}
                    onClick={() => handleOptionSelect(option)}>
                    {option}
                </span>
            )
        })
    }

    return (
        <div onClick={handleOpenCloseSelect} className={classNames('custom-select', {open: selectOpen})}>
            <div className="custom-select__trigger">
                <span>{selected || title}</span>
                <div className="arrow"></div>
            </div>
            <div className="custom-options">
                {renderOptions()}
            </div>
        </div>
    );
}

export default Select;

