import React from 'react';

const SelectInput = (props) => {

    const {name, label, onChange, value, error, defaultOption, options} = props;

    return (
        <div className="form-group">
            <label htmlFor={name}> {label}</label>
            <select name={name} value={value} onChange={onChange} className="form-control">
                <option value="">{defaultOption}</option>
                {options.map(option=>{
                    return(
                        <option key={option.value} value={option.value}>{option.text}</option>
                    )
                })}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default SelectInput;