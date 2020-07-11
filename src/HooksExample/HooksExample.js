import React from 'react';
import useForm from '../FormHook';
import FFTextField from '../FormHook/Fields/FFTextField';
import ObjectFieldExample from './ObjectFieldExample';

export default function Example () {
  const submitBtnRef = React.createRef();

  const form = useForm({
    formData: {},
    onFormChange: () => {
      const { valid } = form.getFormValidity();
      if (valid) {
        submitBtnRef.current.classList.remove('disable');
      } else {
        submitBtnRef.current.classList.add('disable');
      }
    }
  });

  const requiredValidation = (value) => {
    if (!value) {
      return 'Required!';
    }
  };

  const buttonProps = {};
  if (!submitBtnRef.current) {
    buttonProps.className = 'disable';
  }

  return (
    <>
      <div>
        <FFTextField
          form={form}
          fieldKeyPath='profile.firstname'
          validation={(value, formState, callback) => {
            setTimeout(() => {
              const errorMsg = requiredValidation(value);
              callback(errorMsg);
            }, 5000);
          }}
          TextFieldProps={{
            label: 'First Name'
          }}
        />
      </div>
      <div>
        <FFTextField
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
