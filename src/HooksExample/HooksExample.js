import React from 'react';
import useForm from '../FormHook';
import String from '../FormHook/Fields/String';

export default function Example () {
  const submitBtnRef = React.createRef();

  const form = useForm({
    formData: {},
    onFormChange: () => {
      const { valid } = form.getFormValidity();
      if (valid) {
        submitBtnRef.current.removeAttribute('disabled');
      } else {
        submitBtnRef.current.setAttribute('disabled', true);
      }
    }
  });

  const requiredValidation = (value) => {
    if (!value) {
      return 'Required!';
    }
  };

  const buttonProp = {};
  if (!submitBtnRef.current) {
    buttonProp.disabled = true;
  }

  return (
    <>
      <String
        form={form}
        fieldKeyPath='profile.firstname'
        ref={form.registerField('profile.firstname')}
        validation={(value, formState, fieldProps, callback) => {
          setTimeout(() => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }, 5000);
        }}
        fieldStateCustom={(metaData) => {
          return (
            <div>
              {metaData.error && <p className='text-danger field-error'>{metaData.error}</p>}
              {metaData.validating ? 'Validating...' : null}
            </div>
          );
        }}
      />
      <String
        form={form}
        fieldKeyPath='profile.lastname'
        ref={form.registerField('profile.lastname')}
        validation={(value, formState, fieldProps, callback) => {
          const errorMsg = requiredValidation(value);
          callback(errorMsg);
        }}
      />
      <button
        {...buttonProp}
        ref={submitBtnRef}
        onClick={() => {
          const validity = form.getFormValidity();
          if (validity.valid) {
            console.log(form.formState.formData);
          } else {
            console.log(validity);
            form.validateForm();
          }
        }}
      >
        Submit
      </button>
    </>
  );
}
