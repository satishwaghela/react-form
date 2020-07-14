import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { handleChangeFlow, getHelperText } from './FieldUtils';

export default function FTextField (props) {
  const { FormControlLabelProps, CheckboxProps, form, fieldKeyPath, validation, onValueChange } = props;
  const { formState } = form;
  const fieldMetaData = form.getFieldMetaData(formState, fieldKeyPath);

  const handleChange = (event) => {
    const value = event.target.checked;
    handleChangeFlow(value, fieldKeyPath, onValueChange, validation, form);
  };

  return (
    <>
      <FormControlLabel
        {...FormControlLabelProps}
        control={(
          <Checkbox
            {...CheckboxProps}
            checked={form.getFieldValue(formState, fieldKeyPath, false)}
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
