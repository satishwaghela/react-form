import React from 'react';
import useForm from '../FormHook';
import FTextField from '../FormHook/Fields/FTextField';
import AsyncValidationExample from './AsyncValidationExample';
import ObjectFieldExample from './ObjectFieldExample';
import { requiredValidation } from './validations';

export default function Example () {
  const submitBtnRef = React.createRef();

  const form = useForm({
    formData: {},
    onFormChange: () => {
      const validity = form.getFormValidity();
      console.log(validity);
      if (validity.valid) {
        submitBtnRef.current.classList.remove('disable');
      } else {
        submitBtnRef.current.classList.add('disable');
      }
    }
  });

  const buttonProps = {};
  if (!submitBtnRef.current) {
    buttonProps.className = 'disable';
  }

  return (
    <>
      <div>
        <AsyncValidationExample form={form} />
      </div>
      <div>
        <FTextField
          form={form}
          fieldKeyPath='profile.firstname'
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
          TextFieldProps={{
            label: 'First Name'
          }}
        />
      </div>
      <div>
        <FTextField
          form={form}
          fieldKeyPath='profile.lastname'
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
          TextFieldProps={{
            label: 'Last Name'
          }}
        />
      </div>
      <div>
        <ObjectFieldExample form={form} />
      </div>
      <button
        ref={submitBtnRef}
        onClick={() => {
          console.log('form submit')
          const validity = form.getFormValidity();
          if (validity.valid) {
            console.log(form.formState.formData);
          } else {
            console.log(validity);
            form.validateForm();
          }
        }}
        {...buttonProps}
      >
        Submit
      </button>
    </>
  );
}
