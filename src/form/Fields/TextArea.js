import React from 'react';
import _ from 'lodash';
import { String } from './String';

export class TextArea extends String {
  getField = () => {
    const { data, fieldKeyPath } = this.props;
    return (
      <textarea
        className={
          _.get(this.context.Form.state.Errors, fieldKeyPath)
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref='input'
        value={_.get(data, fieldKeyPath, '')}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
        style={{ maxWidth: '100%' }}
      />
    );
  }
}
