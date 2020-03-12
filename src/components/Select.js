import React from 'react';
import '../styles/select.scss';

class Select extends React.Component {
    state = {selectOpen: false}

    toggle = () => {
        this.setState({selectOpen: !this.state.selectOpen});
    }

    // how to do that better?
    onClick = (event) => {
        var changed = false;

        if(!event.target.parentNode.querySelector('.custom-option.selected')) {
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

        if(changed) {
            this.props.onChange(event.target.getAttribute("data-value"));
        }
    }

    renderOptions = () => {
        return this.props.options.map(x => {
            return (
                <span 
                    className="custom-option"
                    data-value={x.toLowerCase()}
                    key={x}
                    onClick={this.onClick}>
                    {x}
                </span>
            )
        })
    }

    render() {
        return (
            <div onClick={this.toggle} className="custom-select-wrapper">
                <div className={this.state.selectOpen ? "custom-select open" : "custom-select" }>
                    <div className="custom-select__trigger">
                        <span>{this.props.title}</span>
                        <div className="arrow"></div>
                    </div>
                    <div className="custom-options">
                        {this.renderOptions()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Select;

