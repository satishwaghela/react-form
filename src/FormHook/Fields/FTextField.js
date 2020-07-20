import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import { getHelperText, useIsMount, MemoField } from './FieldUtils';

export default function FTextField (props) {
  const { TextFieldProps, form, fieldKeyPath, validation, valueChange = 'onChange', validateOnChange = true } = props;
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

  const changeHandleProps = {};
  if (valueChange === 'onBlur') {
    changeHandleProps.onBlur = handleChange;
  } else {
    changeHandleProps.onChange = handleChange;
  }

  return (
    <>
      <TextField
        error={!fieldMetaData.validating && !!fieldMetaData.error}
        fullWidth
        {...changeHandleProps}
        {...TextFieldProps}
        defaultValue={value || ''}
        ref={form.registerField(fieldKeyPath, {
          validation: validation
        })}
      />
      {getHelperText(fieldMetaData)}
    </>
  );
}

FTextField.propTypes = {
  TextFieldProps: PropTypes.object,
  form: PropTypes.object,
  fieldKeyPath: PropTypes.string,
  validateOnChange: PropTypes.bool,
  validation: PropTypes.func
};

export function MemoFTextField (props) {
  return (
    <MemoField
      Field={FTextField}
      props={props}
    />
  );
}
