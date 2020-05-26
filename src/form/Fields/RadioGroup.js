import React from 'react';
import { BaseField } from './BaseField';

export class RadioGroup extends BaseField {
  handleChange = (e, option) => {
    const { value } = option;
    const { fieldKeyPath } = this.props;
    this.setValue(fieldKeyPath, value);
    super.handleChange(value);
  }

  validate () {
    return super.validate(this.getValue());
  }

  getField = () => {
    const { options, fieldKeyPath } = this.props;
    const value = this.getValue(fieldKeyPath, '');
    return (
      <fieldset className='fieldset-default'>
        {options.map((opt, i) => {
          const label = opt.name;
          const checkboxComp = (
            <label className='checkbox-container display-block text-left' key={i + opt.name}>
              <input
                type='radio'
                checked={opt.value === value}
                onChange={e => this.handleChange(e, opt)}
                name={fieldKeyPath}
              />
              {label}
            </label>
          );
          return checkboxComp;
        })}
      </fieldset>
    );
  }
}
