import React from 'react';
import PropTypes from 'prop-types';
import { getFieldPopover } from '../FormUtils';

export function FieldLabel ({ text, isRequired = false, info }) {
  return (
    <label>
      {text} {isRequired ? '*' : '' } {getFieldPopover(info, text + Math.random(), text)}
    </label>
  );
}

FieldLabel.propTypes = {
  text: PropTypes.string,
  isRequired: PropTypes.bool,
  info: PropTypes.any
};
