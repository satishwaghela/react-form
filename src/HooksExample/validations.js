import _ from 'lodash';

export function requiredValidation (value) {
  if (_.isEmpty(value)) {
    return 'Required!';
  }
};
