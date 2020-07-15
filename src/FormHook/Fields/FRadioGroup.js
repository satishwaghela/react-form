import React from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { handleChangeFlow, getHelperText } from './FieldUtils';

export default function FRadioGroup (props) {
  const {
    FormControlLabelProps, RadioProps, form, fieldKeyPath, validation, onValueChange,
    radioOptions
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const handleChange = (event) => {
    const value = event.target.value;
    handleChangeFlow(value, fieldKeyPath, onValueChange, validation, form);
  };

  const value = form.getFieldValue(fieldKeyPath);

  return (
    <>
      {radioOptions.map((option, i) => (
        <FormControlLabel
          key={i}
          {...FormControlLabelProps}
          label={option.label}
          value={option.value}
          control={(
            <Radio {...RadioProps} checked={option.value === value} onChange={handleChange} />
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

FRadioGroup.propTypes = {
  FormControlLabelProps: PropTypes.object,
  RadioProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validation: PropTypes.func,
  onValueChange: PropTypes.func,
  radioOptions: PropTypes.array
};
