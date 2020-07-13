import React from 'react';
import Grid from '@material-ui/core/Grid';
import FObjectField from '../FormHook/Fields/FObjectField';
import FTextField from '../FormHook/Fields/FTextField';

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
          callback()
        }
      }}
      Child={ObjectChild}
    />
  )
}

function ObjectChild ({ validateObject, fieldKeyPath, form }) {
  const fieldKeyPathRole = fieldKeyPath + '.role';
  const fieldKeyPathUser = fieldKeyPath + '.user';
  const fieldKeyPathGroup = fieldKeyPath + '.group';
  return (
    <>
      <Grid item xs={4}>
        <FTextField
          form={form}
          fieldKeyPath={fieldKeyPathRole}
          onValueChange={(value, newformState) => {
            const object = form.getFieldValue(newformState, fieldKeyPath);
            validateObject(object, newformState)
          }}
          TextFieldProps={{
            label: 'Role'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <FTextField
          form={form}
          fieldKeyPath={fieldKeyPathUser}
          onValueChange={(value, newformState) => {
            const object = form.getFieldValue(newformState, fieldKeyPath);
            validateObject(object, newformState)
          }}
          TextFieldProps={{
            label: 'User'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <FTextField
          form={form}
          fieldKeyPath={fieldKeyPathGroup}
          onValueChange={(value, newformState) => {
            const object = form.getFieldValue(newformState, fieldKeyPath);
            validateObject(object, newformState)
          }}
          TextFieldProps={{
            label: 'Group'
          }}
        />
      </Grid>
    </>
  )
}

