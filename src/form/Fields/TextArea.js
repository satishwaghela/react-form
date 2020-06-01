import React from 'react';
import _ from 'lodash';
import { String } from './String';

export class TextArea extends String {
  getField = () => {
    const { fieldKeyPath } = this.props;
    return (
      <textarea
        className={
          _.get(this.context.form.state.errors, fieldKeyPath)
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref={ref => { this.input = ref; }}
        value={this.getValue(fieldKeyPath, '')}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
        style={{ maxWidth: '100%' }}
      />
    );
  }
}
