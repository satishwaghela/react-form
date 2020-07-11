import React from 'react';
import useForm from '../FormHook';

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

  const { formState } = form;

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
      <input
        type='text'
        value={form.getFieldValue(formState, 'profile.firstname', '')}
        onChange={(e) => {
          const value = e.target.value;
          const newFormState = { ...formState };
          form.setFieldValue(newFormState, 'profile.firstname', value);
          form.setFieldError(newFormState, 'profile.firstname');
          // const validator = form.getValidator(newFormState, 'profile.firstname', value);
          // validator();
          form.setFormState(newFormState);
        }}
        onBlur={(e) => {
          const value = e.target.value;
          const newFormState = { ...formState };
          const validator = form.getValidator(newFormState, 'profile.firstname', value);
          validator();
          form.setFormState(newFormState);
        }}
        ref={form.registerField('profile.firstname', {
          validation: (value, formState, callback) => {
            setTimeout(() => {
              const errorMsg = requiredValidation(value);
              callback(errorMsg);
            }, 5000);
          }
        })}
      />
      <p className='text-danger'>{form.getFieldMetaData(formState, 'profile.firstname').error}</p>
      <p className='text-danger'>{form.getFieldMetaData(formState, 'profile.firstname').validating ? 'Validating...' : null}</p>
      <input
        type='text'
        value={form.getFieldValue(formState, 'profile.lastname', '')}
        onChange={(e) => {
          const value = e.target.value;
          const newFormState = { ...formState };
          form.setFieldValue(newFormState, 'profile.lastname', value);
          form.setFormState(newFormState);
        }}
        ref={form.registerField('profile.lastname', {})}
      />
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
