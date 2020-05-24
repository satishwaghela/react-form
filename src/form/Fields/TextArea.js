import React from 'react';
import { String } from './String';

export class TextArea extends String {
  getField = () => {
    return (
      <textarea
        className={
          this.context.Form.state.Errors[this.props.valuePath]
            ? 'form-control invalidInput'
            : 'form-control'
        }
        ref='input'
        value={this.props.data[this.props.value] || ''}
        disabled={this.shouldDisable()}
        {...this.props.attrs}
        onChange={this.handleChange}
        style={{ maxWidth: '100%' }}
      />
    );
  }
}
