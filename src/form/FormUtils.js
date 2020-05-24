import React from 'react';
import _ from 'lodash';
import {
  OverlayTrigger,
  Popover
} from 'react-bootstrap';
import generateFields from './generateFields';

export const cloneFields = (fields, data) => {
  if (!_.isArray(fields)) {
    fields = [fields];
  }
  return fields.map((child, i) => {
    if (!child) {
      return null;
    }
    return React.cloneElement(child, {
      ref: child.props
        ? (child.props._ref || i)
        : i,
      key: i,
      data: data,
      ...child.props
    });
  });
};

export function validateFields (fields) {
  _.each(fields, (component) => {
    if (component.type === 'FormField') {
      component.validate();
    }
  });
}

export function areFieldsValid (fields) {
  let isValid = true;
  _.each(fields, (component) => {
    if (component.type === 'FormField') {
      let isFieldValid = false;
      isFieldValid = component.isValid();

      if (isValid) {
        isValid = isFieldValid;
      }
    }
  });
  return isValid;
}

export function getFieldPopover (content, id = Math.random(), popoverClass) {
  if (content) {
    const infoPopover = (
      <Popover id={id} className={popoverClass}>
        {content}
      </Popover>
    );

    return (
      <OverlayTrigger trigger={['hover', 'focus']} placement='right' overlay={infoPopover}>
        <i className='fa fa-question-circle text-info' />
      </OverlayTrigger>
    );
  } else {
    return null;
  }
}

export const getDependentFields = (field, valuePath, data) => {
  if (_.get(field, 'fields', []).length) {
    const fields = generateFields(field.fields, data, valuePath.split('.'));
    return cloneFields(fields, data);
  }
  return null;
};

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
