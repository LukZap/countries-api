import React from 'react';
import { useState } from 'react';
import classNames from 'classnames'

import '../styles/select.scss';

const Select = ({options, title, onChange, selected}) => {
    const [selectOpen, setSelectOpen] = useState(false)
    

    // how to do that better?
    const onClick = (event) => {
        let changed = false;

        if (!event.target.parentNode.querySelector('.custom-option.selected')) {
            event.target.classList.add('selected');
            event.target.closest('.custom-select')
                .querySelector('.custom-select__trigger span')
                .textContent = event.target.textContent;
            changed = true;
        } else if (!event.target.classList.contains('selected')) {
            event.target.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            event.target.classList.add('selected');
            event.target.closest('.custom-select')
                .querySelector('.custom-select__trigger span')
                .textContent = event.target.textContent;
            changed = true;
        }

        if (changed) {
            onChange(event.target.getAttribute("data-value"));
        }
    }

    const renderOptions = () => {
        return options.map(option => {
            return (
                <span
                    className={classNames('custom-option', {selected: selected === option})}
                    data-value={option}
                    key={option}
                    onClick={onClick}>
                    {option}
                </span>
            )
        })
    }

    return (
        <div onClick={() => setSelectOpen(!selectOpen)} className={classNames('custom-select', {open: selectOpen})}>
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

