import React from 'react';
import Form from '../form';
const {
  Switch,
  CheckBox,
  CheckBoxGroup,
  Select,
  CreatableSelect,
  MultiSelect,
  CreatableMultiSelect
} = Form.Fields;

const OtherInputs = () => {
  return (
    <>
      <div className='row'>
        <div className='col-md-6'>
          <div className='row'>
            <div className='col-md-6'>
              <CheckBox
                label='Status'
                fieldKeyPath='active'
                checkBoxLabel='Active'
              />
            </div>
            <div className='col-md-6'>
              <Switch
                label='Status Switch'
                fieldKeyPath='switch'
                onText='Enabled'
                offText='Disabled'
                switchWidth='100px'
              />
            </div>
          </div>
          <Select
            label='Report E-mail'
            fieldKeyPath='reportEmail'
            attrs={{
              options: [{
                label: 'sample1@email.com',
                value: 'sample1@email.com'
              },{
                label: 'sample2@email.com',
                value: 'sample2@email.com'
              }]
            }}
          />
          <MultiSelect
            label='Language'
            fieldKeyPath='language'
            attrs={{
              options: [{
                label: 'US English',
                value: 'en-us'
              },{
                label: 'UK English',
                value: 'en-uk'
              }]
            }}
            validation={['required']}
          />
        </div>
        <div className='col-md-6'>
          <CheckBoxGroup
            label='Groups'
            fieldKeyPath='group'
            options={[{
              name: 'Admin',
              value: 'admin'
            },{
              name: 'Editors',
              value: 'editors'
            },{
              name: 'Engineering',
              value: 'engineering'
            }]}
          />
          <CreatableSelect
            label='Color Code'
            fieldKeyPath='colorCode'
            attrs={{
              options: [{
                label: 'Orange',
                value: 'orange'
              },{
                label: 'Green',
                value: 'green'
              }]
            }}
            fieldInfo='This is creatable field'
          />
          <CreatableMultiSelect
            label='Sports'
            fieldKeyPath='sports'
            attrs={{
              options: [{
                label: 'football',
                value: 'football'
              },{
                label: 'basketball',
                value: 'basketball'
              }]
            }}
            validation={['required']}
            fieldInfo='This is creatable field'
          />
        </div>
      </div>
    </>
  );
}

export default OtherInputs;
