import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { validateFields, areFieldsValid, normalizeFieldKeyPath } from './FormUtils';

export default class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      errors: {}
    };
  }

  getChildContext () {
    return { form: this };
  }

  shouldComponentUpdate (nextProps, nextState) {
    this._prevProps = this.props;
    this._prevState = this.state;
    this._nextProps = nextProps;
    this._nextState = nextState;
    return true;
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
    _.set(this, `fields.${normalizeFieldKeyPath(fieldKeyPath)}`, fildComponent);
  }

  deregisterFields () {
    _.unset(this, 'fields');
  }

  onFieldValueChange (newFormData, callback) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(newFormData, callback);
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
  form: PropTypes.object
};

Form.propTypes = {
  formData: PropTypes.object,
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
};
