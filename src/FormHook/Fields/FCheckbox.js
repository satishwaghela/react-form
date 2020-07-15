import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { handleChangeFlow, getHelperText } from './FieldUtils';

export default function FCheckbox (props) {
  const {
    FormControlLabelProps, CheckboxProps, form, fieldKeyPath, validation, onValueChange,
    controlType = 'checkbox'
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const handleChange = (event) => {
    const value = event.target.checked;
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
      <FormControlLabel
        {...FormControlLabelProps}
        control={(
          <ControlComp
            {...CheckboxProps}
            checked={form.getFieldValue(fieldKeyPath, false)}
            onChange={handleChange}
            ref={form.registerField(fieldKeyPath, {
              validation: validation
            })}
          />
        )}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

FCheckbox.propTypes = {
  FormControlLabelProps: PropTypes.object,
  CheckboxProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  onValueChange: PropTypes.func,
  controlType: PropTypes.string
};
