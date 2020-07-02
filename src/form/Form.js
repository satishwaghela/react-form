import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { validateFields, areFieldsValid, getValidity, normalizeForObjectKey } from './FormUtils';

export default class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  getChildContext () {
    return { form: this, formData: this.props.formData, errors: this.state.errors };
  }

  render () {
    this.deregisterFields();
    return (
      <div className={this.props.className} style={this.props.style}>
        {this.props.children}
      </div>
    );
  }

  registerField (fieldKeyPath, fildComponent) {
    _.set(this, `fields.${normalizeForObjectKey(fieldKeyPath)}`, fildComponent);
  }

  deregisterFields () {
    _.unset(this, 'fields');
  }

  onFieldValueChange (newFormData) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(newFormData);
    }
  }

  setErrors = (errors) => {
    this.setState({ errors });
  }

  validate () {
    validateFields(this.fields);
  }

  isValid () {
    return areFieldsValid(this.fields);
  }

  getValidity () {
    return getValidity(this.fields);
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
  form: PropTypes.object,
  formData: PropTypes.object,
  errors: PropTypes.object
};

Form.propTypes = {
  formData: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};
