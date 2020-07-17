import React, { useRef } from 'react';
import { MemoFTextField } from '../FormHook/Fields/FTextField';
import { requiredValidation } from './validations';

export default function AsyncValidationExample (props) {
  const { form } = props;

  const timeoutId = useRef(0);

  return (
    <MemoFTextField
      form={form}
      fieldKeyPath='username'
      validation={(value, formState, callback) => {
        window.clearTimeout(timeoutId.current);
        const requiredMsg = requiredValidation(value);
        if (requiredMsg) {
          callback(requiredMsg);
        } else {
          timeoutId.current = setTimeout(() => {
            const isUsernameTaken = takenUsernames.includes(value);
            const errorMsg = isUsernameTaken ? 'Username is taken' : undefined;
            callback(errorMsg);
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
