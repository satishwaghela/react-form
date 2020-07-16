import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getHelperText, useCall } from './FieldUtils';

export default function FCheckbox (props) {
  const {
    FormControlLabelProps, CheckboxProps, form, fieldKeyPath, validation,
    controlType = 'checkbox'
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath, false);

  useCall(() => {
    if (validation) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator();
    }
  }, [value]);

  const handleChange = (event) => {
    const value = event.target.checked;
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
      <FormControlLabel
        {...FormControlLabelProps}
        control={(
          <ControlComp
            {...CheckboxProps}
            checked={value}
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
  controlType: PropTypes.string
};
