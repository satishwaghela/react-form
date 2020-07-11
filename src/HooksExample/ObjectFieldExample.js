import React from 'react';
import FFObjectField from '../FormHook/Fields/FFObjectField';
import FFTextField from '../FormHook/Fields/FFTextField';

export default function ObjectFieldExample (props) {
  const { form } = props;

  return (
    <FFObjectField
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
      <FFTextField
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
      <FFTextField
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
      <FFTextField
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
    </>
  )
}

