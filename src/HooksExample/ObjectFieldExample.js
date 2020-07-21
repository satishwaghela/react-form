import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FObjectField from '../FormHook/Fields/FObjectField';
import { MemoFTextField } from '../FormHook/Fields/FTextField';

export default function ObjectFieldExample (props) {
  const { form } = props;

  return (
    <FObjectField
      form={form}
      fieldKeyPath='permission'
      validation={(value = {}, formState, vCallback) => {
        if (!value.role && !value.user && !value.group) {
          vCallback('Role/User/Group is required');
        } else {
          vCallback();
        }
      }}
      Comp={ObjectComp}
    />
  );
}

ObjectFieldExample.propTypes = {
  form: PropTypes.object
};

function ObjectComp ({ fieldKeyPath, form, helperText, onRef }) {
  const fieldKeyPathRole = fieldKeyPath + '.role';
  const fieldKeyPathUser = fieldKeyPath + '.user';
  const fieldKeyPathGroup = fieldKeyPath + '.group';
  return (
    <>
      <Grid item xs={4} ref={onRef}>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathRole}
          TextFieldProps={{
            label: 'Role'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathUser}
          TextFieldProps={{
            label: 'User'
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <MemoFTextField
          form={form}
          fieldKeyPath={fieldKeyPathGroup}
          TextFieldProps={{
            label: 'Group'
          }}
        />
      </Grid>
      {helperText}
    </>
  );
}

ObjectComp.propTypes = {
  fieldKeyPath: PropTypes.string,
  onRef: PropTypes.func,
  form: PropTypes.object,
  helperText: PropTypes.any
};
