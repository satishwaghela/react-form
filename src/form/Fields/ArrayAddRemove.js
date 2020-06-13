import React from 'react';
import _ from 'lodash';
import { BaseField } from './BaseField';
import { childPath } from '../FormUtils';

export class ArrayAddRemove extends BaseField {
  handleChange = (value) => {
    super.handleChange(value);
  }

  handleAdd = (e) => {
    const { fieldKeyPath } = this.props;
    const value = [...this.getValue(fieldKeyPath, [])];
    value.push(undefined);
    this.handleChange(value);
  }

  handleRemove = (e, i) => {
    const { fieldKeyPath } = this.props;
    const value = [...this.getValue(fieldKeyPath, [])];
    value.splice(i, 1);

    const errors = this.getErrorArr();
    errors.splice(i, 1);
    this.setErrorArr(errors);

    this.handleChange(value);
  }

  getErrorArr () {
    const { fieldKeyPath } = this.props;
    return _.get(this, `context.form.state.errors.${childPath(fieldKeyPath)}`, []);
  }

  setErrorArr (errorArr) {
    const { fieldKeyPath } = this.props;
    return _.set(this, `context.form.state.errors.${childPath(fieldKeyPath)}`, errorArr);
  }

  getField = () => {
    const { fieldKeyPath, Child } = this.props;
    const valueArr = this.getValue(fieldKeyPath, []);
    return (
      <>
        {_.map(valueArr, (value, i) => {
          const baseFieldKeyPath = `${fieldKeyPath}.${i}`
          return (
            <Child
              key={baseFieldKeyPath}
              baseFieldKeyPath={baseFieldKeyPath}
              value={value}
              onRemove={e => this.handleRemove(e, i)}
            />
          )
        })}
        <button onClick={this.handleAdd}>Add</button>
      </>
    );
  }
}
