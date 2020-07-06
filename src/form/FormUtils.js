import React from 'react';
import _ from 'lodash';
import {
  OverlayTrigger,
  Popover
} from 'react-bootstrap';

export function normalizeForObjectKey (fieldKeyPath = '') {
  return fieldKeyPath.split('.').join('_');
}

export function childPath (fieldKeyPath) {
  return fieldKeyPath.split('.').join('.children.') + '.children';
}

export function errorPath (fieldKeyPath) {
  return fieldKeyPath.split('.').join('.children.') + '.error';
}

export function validateFields (fields) {
  _.each(fields, (component) => {
    component.validate();
  });
}

export function setFieldsValidationErrors (fields, errors) {
  _.each(fields, (field, keys) => {
    const { fieldKeyPath } = field.props;
    const value = field.getValue(fieldKeyPath);
    const errorMsg = field.getValidationError(value);
    _.set(errors, errorPath(fieldKeyPath), errorMsg);
  });
}

export function setFieldValidationErrors (errors, fieldKeyPath, errorMsg) {
  _.set(errors, errorPath(fieldKeyPath), errorMsg);
}

export function areFieldsValid (fields) {
  let isValid = true;
  _.each(fields, (component) => {
    let isFieldValid = false;
    isFieldValid = component.isValid();

    if (isValid) {
      isValid = isFieldValid;
    }
  });
  return isValid;
}

export function getValidity (fields) {
  let isValid = true;
  const invalidFields = [];
  _.each(fields, (component) => {
    let isFieldValid = false;
    isFieldValid = component.isValid();

    if (isValid) {
      isValid = isFieldValid;
    }
    if (!isFieldValid) {
      invalidFields.push(component);
    }
  });
  return { isValid, invalidFields };
}

export function getFieldPopover (content, id = Math.random(), popoverClass) {
  if (content) {
    const infoPopover = (
      <Popover id={id} className={popoverClass}>
        <div className='popover-content-container'>
          {content}
        </div>
      </Popover>
    );

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={infoPopover}>
        <span style={{ fontSize: '10px', color: 'white', backgroundColor: '#17a2b8', padding: '3px 6px', borderRadius: '10px' }}>?</span>
      </OverlayTrigger>
    );
  } else {
    return null;
  }
}

export const findSingleValueOption = (value, options, defaultValue) => {
  let valueOption;
  if (_.isEmpty(value)) {
    value = defaultValue;
  }
  if (value && options.length) {
    const callback = (option) => {
      return option.value === value;
    };
    valueOption = _.find(options, callback);
  }
  return valueOption;
};

export const findMultiValueOptions = (value, options, defaultValue) => {
  let valueOptions;
  if (!value && value !== null) {
    value = defaultValue;
  }
  if (value && options.length) {
    const callback = (option) => {
      return _.find(value, (v) => {
        return v === option.value;
      });
    };
    valueOptions = _.filter(options, callback);
  }
  return valueOptions;
};

export const toSelectObject = (value) => {
  if (_.isString(value)) {
    return {
      label: value,
      value
    };
  } else if (_.isObject(value)) {
    return value;
  } else {
    return null;
  }
};
