import React from 'react';
import Form from '../form';
const {
  String,
  Password,
  RadioGroup,
  TextArea,
  MultiSelectTextInput
} = Form.Fields;

const PersonalInfoInputs = () => {
  return (
    <>
      <div className='row'>
        <div className='col-md-6'>
          <String
            label='First Name'
            fieldKeyPath='profile.firstname'
            validation={['required']}
            attrs={{
              placeholder: 'Enter first name'
            }}
            fieldInfo='You can show field info by passing fieldInfo prop'
          />
          <String
            label='E-mail'
            fieldKeyPath='email'
            validation={['required', 'email']}
            attrs={{
              placeholder: 'Enter e-mail address'
            }}
          />
        </div>
        <div className='col-md-6'>
          <Password
            label='Password'
            fieldKeyPath='password'
            attrs={{
              placeholder: 'Enter password'
            }}
          />
          <RadioGroup
            label='Sex'
            fieldKeyPath='sex'
            options={[{
              name: 'Male',
              value: 'M'
            },{
              name: 'Female',
              value: 'F'
            }]}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-12'>
          <TextArea
            label='Address'
            fieldKeyPath='textArea'
            validation={['required']}
          />
          <MultiSelectTextInput
            label='Multi Select Text Input'
            fieldKeyPath='multiSelectTextInput'
          />
        </div>
      </div>
    </>
  );
}

export default PersonalInfoInputs;
