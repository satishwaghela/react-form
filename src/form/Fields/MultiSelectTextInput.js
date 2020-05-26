import React from 'react';
import _ from 'lodash';
import CreatableSelect from 'react-select/creatable';
import { BaseField } from './BaseField';

export class MultiSelectTextInput extends BaseField {
  state = {
    inputValue: ''
  }

  handleInputChange = (inputValue) => {
    this.setState({ inputValue });
  }

  handleChange = (selections) => {
    const { fieldKeyPath } = this.props;
    const value = _.map(selections, s => {
      if (_.has(s, 'value')) {
        return s.value;
      } else {
        return s;
      }
    });
    this.setValue(fieldKeyPath, value);
    super.handleChange(value);
  }

  handleKeyDown = (event) => {
    const { fieldKeyPath } = this.props;
    const { inputValue } = this.state;
    if (!inputValue) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        this.setState({ inputValue: '' });
        this.handleChange([...this.getValue(fieldKeyPath, []), inputValue]);
        event.preventDefault();
        break;
      default:
    }
  };

  validate () {
    return super.validate(this.getValue());
  }

  isValid () {
    return super.isValid(this.getValue());
  }

  getField = () => {
    const { inputValue } = this.state;
    const { fieldKeyPath } = this.props;

    const selectValue = this.getValue(fieldKeyPath, []).map(value => ({
      label: value,
      value
    }));

    return (
      <CreatableSelect
        inputValue={inputValue}
        value={selectValue}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        isMulti
        isClearable
        onInputChange={this.handleInputChange}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        components={{
          DropdownIndicator: null
        }}
        menuIsOpen={false}
      />
    );
  }
}
