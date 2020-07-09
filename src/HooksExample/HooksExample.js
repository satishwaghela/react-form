import React from 'react';
import useForm from '../FormHook';
import String from '../FormHook/Fields/String';

export default function Example () {
  const form = useForm({
    formData: {}
  });

  const requiredValidation = (value) => {
    if (!value) {
      return 'Required!';
    }
  };

  return (
    <>
      <String
        form={form}
        fieldKeyPath='profile.firstname'
        validations={[requiredValidation]}
        ref={form.registerField('profile.firstname')}
      />
      <String
        form={form}
        fieldKeyPath='profile.lastname'
        validations={[requiredValidation]}
        ref={form.registerField('profile.lastname')}
      />
      <button
        onClick={() => {
          const { valid } = form.getFormValidity();
          if (valid) {
            console.log(form.formState.formData);
          } else {
            form.validateForm();
          }
        }}
      >
        Submit
      </button>
    </>
  );
}
