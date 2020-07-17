import React from 'react';
import Grid from '@material-ui/core/Grid';
import FObjectField from '../FormHook/Fields/FObjectField';
import { MemoFTextField } from '../FormHook/Fields/FTextField';

export default function ObjectFieldExample (props) {
  const { form } = props;

  return (
    <FObjectField
      form={form}
      fieldKeyPath='permission'
      validation={(value = {}, formState, callback) => {
        if (!value.role && !value.user && !value.group) {
          callback('Role/User/Group is required');
        } else {
          callback();
        }
      }}
      Comp={ObjectComp}
    />
  );
}

function ObjectComp ({ validateObject, fieldKeyPath, form, helperText, onRef }) {
  const fieldKeyPathRole = fieldKeyPath + '.role';
  const fieldKeyPathUser = fieldKeyPath + '.user';
  const fieldKeyPathGroup = fieldKeyPath + '.group';
  return (
    <>
      <Grid item xs={4} ref={onRef}>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathRole}
          onValueChange={(value) => {
            validateObject();
          }}
          TextFieldProps={{
            label: 'Role'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathUser}
          onValueChange={(value) => {
            validateObject();
          }}
          TextFieldProps={{
            label: 'User'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathGroup}
          onValueChange={(value) => {
            validateObject();
          }}
          TextFieldProps={{
            label: 'Group'
          }}
        />
      </Grid>
      {helperText}
    </>
  );
}
