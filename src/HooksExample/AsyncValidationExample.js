import React, { useRef } from 'react';
import FTextField from '../FormHook/Fields/FTextField';
import { requiredValidation } from './validations';

export default function AsyncValidationExample (props) {
  const { form } = props;

  const timeoutId = useRef(0);

  return (
    <FTextField
      form={form}
      fieldKeyPath='username'
      onValueChange={(value, formState) => {
        window.clearTimeout(timeoutId.current);
      }}
      validation={(value, formState, callback) => {
        const requiredMsg = requiredValidation(value);
        if (requiredMsg) {
          callback(requiredMsg);
        } else {
          timeoutId.current = setTimeout(() => {
            const _callback = callback;
            const isUsernameTaken = takenUsernames.includes(value);
            const errorMsg = isUsernameTaken ? 'Username is taken' : undefined;
            _callback(errorMsg);
          }, 5000);
        }
      }}
      TextFieldProps={{
        label: 'Username'
      }}
    />
  )
}

const takenUsernames = ['satishwaghela']
