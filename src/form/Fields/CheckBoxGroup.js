import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';

export class CheckBoxGroup extends BaseField {
  handleChange = (e, option) => {
    const { fieldKeyPath } = this.props;
    const selected = this.getValue(fieldKeyPath, []);
    const index = selected.indexOf(option.value);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(option.value);
    }
    this.setValue(fieldKeyPath, selected);
    super.handleChange(selected);
  }

  validate () {
    return super.validate(this.getValue());
  }

  getField = () => {
    const { options, fieldKeyPath } = this.props;
    const selected = this.getValue(fieldKeyPath, []);
    return (
      <fieldset className='fieldset-default'>
        {options.map((opt, i) => {
          const label = opt.name;
          const checkboxComp = (
            <label className='checkbox-container display-block text-left' key={i + opt.name}>
              <input
                type='checkbox'
                checked={!!_.find(selected, (s) => s === opt.value)}
                onChange={e => this.handleChange(e, opt)}
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
