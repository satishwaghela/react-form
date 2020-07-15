import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { handleChangeFlow, getHelperText } from './FieldUtils';

export default function FCheckboxGroup (props) {
  const {
    FormControlLabelProps, CheckboxProps, form, fieldKeyPath, validation, onValueChange,
    checkboxOptions, controlType = 'checkbox'
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, []);

  const handleChange = (event) => {
    const checked = event.target.checked;
    const name = event.target.name;
    if (checked) {
      value.push(name);
    } else {
      const index = value.indexOf(name);
      value.splice(index, 1);
    }
    handleChangeFlow(value, fieldKeyPath, onValueChange, validation, form);
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
  onValueChange: PropTypes.func,
  checkboxOptions: PropTypes.array,
  controlType: PropTypes.string
};
