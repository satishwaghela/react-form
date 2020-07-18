import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import useForm from '../FormHook';
import { MemoFTextField } from '../FormHook/Fields/FTextField';
import { MemoFCheckbox } from '../FormHook/Fields/FCheckbox';
import { MemoFAutoComplete } from '../FormHook/Fields/FAutoComplete';
import { MemoFCheckboxGroup } from '../FormHook/Fields/FCheckboxGroup';
import { MemoFRadioGroup } from '../FormHook/Fields/FRadioGroup';
import AsyncValidationExample from './AsyncValidationExample';
import ObjectFieldExample from './ObjectFieldExample';
import ArrayFieldExample from './ArrayFieldExample';
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
        <MemoFTextField
          form={form}
          fieldKeyPath='profile.firstname'
          /* validation={(value, formState, callback) => {
            const errorMsg = requiredValidation(value);
            callback(errorMsg);
          }} */
          TextFieldProps={{
            label: 'First Name'
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <MemoFTextField
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
        <MemoFAutoComplete
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
        <MemoFCheckboxGroup
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
        <MemoFRadioGroup
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
      <ArrayFieldExample form={form} />
      <MemoFCheckbox
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
