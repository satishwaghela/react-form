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
    } else if (_.isArray(component) || _.isObject(component)) {
      validateFields(component);
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
    } else if (_.isArray(component) || _.isObject(component)) {
      let isFieldValid = false;
      isFieldValid = areFieldsValid(component);

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
