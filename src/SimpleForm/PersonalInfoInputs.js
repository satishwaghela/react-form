import React from 'react';
import Form from '../form';
const {
  String,
  RadioGroup,
  TextArea
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
          <String
            label='Last Name'
            fieldKeyPath='profile.lastname'
            attrs={{
              placeholder: 'Enter last name'
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
        </div>
      </div>
    </>
  );
}

export default PersonalInfoInputs;
