import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { validateFields, areFieldsValid } from './FormUtils';

export default class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      FormData: props.FormData || {},
      Errors: props.Errors || {}
    };
  }

  getChildContext () {
    return { Form: this };
  }

  render () {
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }

  registerField (fieldKeyPath, fildComponent) {
    _.set(this, `fields.${fieldKeyPath}`, fildComponent);
  }

  onFieldValueChange () {
    const { FormData, Errors } = this.state;
    const { onChange } = this.props;
    if (onChange) {
      onChange(FormData, Errors);
    }
  }

  validate () {
    validateFields(this.fields);
  }

  isValid () {
    return areFieldsValid(this.fields);
  }

  isReadOnly () {
    return this.props.readOnly;
  }
}

Form.defaultProps = {
  showRequired: true,
  readOnly: false
};

Form.childContextTypes = {
  Form: PropTypes.object
};

Form.propTypes = {
  FormData: PropTypes.object,
  Errors: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};
