import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useForm from '../FormHook';
import FTextField from '../FormHook/Fields/FTextField';
import FCheckbox from '../FormHook/Fields/FCheckbox';
import FAutoComplete from '../FormHook/Fields/FAutoComplete';
import FCheckboxGroup from '../FormHook/Fields/FCheckboxGroup';
import FRadioGroup from '../FormHook/Fields/FRadioGroup';
import AsyncValidationExample from './AsyncValidationExample';
import ObjectFieldExample from './ObjectFieldExample';
import { requiredValidation } from './validations';

export default function Example () {
  const submitBtnRef = React.createRef();

  const form = useForm({
    formData: {}
  });

  const { formState } = form;
  useEffect(() => {
    form.getFormValidity((validity) => {
      if (validity.valid) {
        submitBtnRef.current.classList.remove('disable');
      } else {
        submitBtnRef.current.classList.add('disable');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState]);

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
      <Grid container>
        <ObjectFieldExample form={form} />
      </Grid>
      <Grid item xs={9}>
        <FAutoComplete
          form={form}
          fieldKeyPath='dummyname'
          valueKey='name'
          AutocompleteProps={{
            multiple: true,
            options: [{ name: 'Bob' }, { name: 'Alice' }],
            getOptionLabel: (option) => option.name
          }}
          TextFieldProps={{
            label: 'Combo box'
          }}
        />
      </Grid>
      <Grid item xs={9}>
        <FCheckboxGroup
          form={form}
          fieldKeyPath='assignResp'
          checkboxOptions={[{
            label: 'Gilad Gray',
            value: 'Gilad Gray'
          }, {
            label: 'Jason Killian',
            value: 'Jason Killian'
          }, {
            label: 'Antoine Llorca',
            value: 'Antoine Llorca'
          }]}
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
        />
      </Grid>
      <Grid item xs={9}>
        <FRadioGroup
          form={form}
          fieldKeyPath='gender'
          radioOptions={[{
            label: 'Female',
            value: 'female'
          }, {
            label: 'Male',
            value: 'male'
          }, {
            label: 'Other',
            value: 'other'
          }]}
          validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }}
        />
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
          variant='contained' color='primary'
          onClick={() => {
            console.log('form submit');
            form.getFormValidity((validity) => {
              if (validity.valid) {
                console.log(form.formState.formData);
              } else {
                console.log(validity);
                form.validateForm();
              }
            });
          }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
