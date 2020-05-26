import _ from 'lodash';

const EmailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i;

const ValidationRules = {
  required: (value, form, component) => {
    if (!value) {
      return 'Required!';
    } else {
      if (value instanceof Array) {
        if (value.length === 0) {
          const str = component.props.valuePath === 'files' ? 'Please select file(s)' : 'Required!';
          return str;
        }
      } else if (value === '' || (typeof value === 'string' && value.trim() === '') || _.isUndefined(value)) {
        return 'Required!';
      } else {
        return '';
      }
    }
  },

  email: (value, form, component) => {
    if (!value.trim()) {
      return false;
    } else {
      if (value instanceof Array) {
        return false;
      } else if (value === '' || (typeof value === 'string' && value.trim() === '') || _.isUndefined(value)) {
        return false;
      } else {
        let result = '';
        result = EmailRegexp.test(value) ? result : 'Invalid Email';
        return result;
      }
    }
  },

  number_min: (value, form, component) => {
    const min = _.get(component, 'props.attrs.min');
    if (!_.isUndefined(min) && value < min) {
      return `Number should be greater than or equal to ${min}`;
    }
  },

  number_max: (value, form, component) => {
    const max = _.get(component, 'props.attrs.max');
    if (!_.isUndefined(max) && value > max) {
      return `Number should be less than or equal to ${max}`;
    }
  }
};

export default ValidationRules;
