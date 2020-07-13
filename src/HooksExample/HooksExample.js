import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useForm from '../FormHook';
import FTextField from '../FormHook/Fields/FTextField';
import FCheckbox from '../FormHook/Fields/FCheckbox';
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
      <Grid item xs={6}>
        <AsyncValidationExample form={form} />
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
      <Grid item xs={6}>
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
      </Grid>
      <Grid container xs={9}>
        <ObjectFieldExample form={form} />
      </Grid>
      <FCheckbox
        form={form}
        fieldKeyPath='ack'
        validation={(value, formState, callback) => {
          const errorMsg = value ? '' : 'Please accept terms & conditions';
          callback(errorMsg);
        }}
        FormControlLabelProps={{
          label: 'Terms & Conditions'
        }}
      />
      <div>
        <Button
          ref={submitBtnRef}
          {...buttonProps}
          variant="contained" color="primary"
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
        >
          Submit
        </Button>
      </div>
    </>
  );
}
