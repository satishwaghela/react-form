import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { getHelperText, useIsMount, MemoField } from './FieldUtils';

export default function FRadioGroup (props) {
  const {
    FormControlLabelProps, RadioProps, form, fieldKeyPath, validation,
    radioOptions, validateOnChange = true
  } = props;
  const fieldMetaData = form.getFieldMetaData(fieldKeyPath);

  const value = form.getFieldValue(fieldKeyPath);

  const isMount = useIsMount();
  useEffect(() => {
    if (validateOnChange && !isMount) {
      const validator = form.getValidator(fieldKeyPath, value);
      validator && validator();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (event) => {
    const value = event.target.value;
    form.setFieldValue(fieldKeyPath, value);
  };

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
  validateOnChange: PropTypes.bool,
  radioOptions: PropTypes.array
};

export function MemoFRadioGroup (props) {
  return (
    <MemoField
      Field={FRadioGroup}
      props={props}
    />
  );
}
