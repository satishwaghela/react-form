import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { validateFields, areFieldsValid } from './FormUtils';

export default class Form extends Component {
  constructor (props) {
    super(props);
    this.state = {
      FormData: props.FormData,
      Errors: props.Errors
    };
  }

  componentDidMount = () => {
    this.setState({ Errors: {} });
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.FormData !== nextProps.FormData) {
      this.updateFormData(nextProps.FormData);
    }
  }

  updateFormData (newFormData) {
    for (const key in this.state.Errors) {
      delete this.state.Errors[key];
    }

    this.setState({
      FormData: _.assignInWith(this.state.FormData, _.cloneDeep(newFormData)),
      Errors: this.state.Errors
    });
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
    const { onChange } = this.props;
    if (onChange) {
      onChange();
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
  readOnly: false,
  Errors: {},
  FormData: {}
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
