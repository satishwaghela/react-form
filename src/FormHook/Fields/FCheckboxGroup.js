import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getHelperText, useCall } from './FieldUtils';

export default function FCheckboxGroup (props) {
  const {
    FormControlLabelProps, CheckboxProps, form, fieldKeyPath, validation,
    checkboxOptions, controlType = 'checkbox'
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, []);

  useCall(() => {
    if (validation) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator();
    }
  }, [value.length]);

  const handleChange = (event) => {
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      value.push(name);
    } else {
      const index = value.indexOf(name);
      value.splice(index, 1);
    }
    form.setFieldValue(fieldKeyPath, value);
  };

  let ControlComp;
  if (controlType === 'switch') {
    ControlComp = Switch;
  } else {
    ControlComp = Checkbox;
  }

  return (
    <>
      {checkboxOptions.map((option, i) => (
        <FormControlLabel
          key={i}
          {...FormControlLabelProps}
          label={option.label}
          control={(
            <ControlComp
              {...CheckboxProps}
              name={option.value}
              checked={value.includes(option.value)}
              onChange={handleChange}
            />
          )}
          ref={form.registerField(fieldKeyPath, {
            validation: validation
          })}
        />
      ))}
      {getHelperText(fieldMetaData)}
    </>
  );
}

FCheckboxGroup.propTypes = {
  FormControlLabelProps: PropTypes.object,
  CheckboxProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  checkboxOptions: PropTypes.array,
  controlType: PropTypes.string
};
