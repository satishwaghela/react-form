import React, { Component } from 'react';
import Form from './form';
const {
  String,
  CheckBox,
  CheckBoxGroup,
  Select,
  CreatableSelect,
  MultiSelect,
  CreatableMultiSelect,
  TextArea
} = Form.Fields;

export default class App extends Component {
  handleSubmit = () => {
    if (this.Form.isValid()) {
      console.log(this.Form.state.FormData);
    } else {
      this.Form.validate();
    }
  }

  render () {
    return (
      <div className='App'>
        <Form FormData={{}} ref={ref => this.Form = ref}>
          <String
            fieldKeyPath='firstname'
            validation={['required']}
          />
          <String
            fieldKeyPath='lastname'
          />
          <CheckBox
            fieldKeyPath='active'
            checkBoxLabel='Active'
          />
          <CheckBoxGroup
            fieldKeyPath='group'
            options={[{
              name: 'Admin',
              value: 'admin'
            },{
              name: 'User1',
              value: 'user1'
            }]}
          />
          <Select
            fieldKeyPath='select'
            attrs={{
              options: [{
                label: 'Admin',
                value: 'admin'
              },{
                label: 'User1',
                value: 'user1'
              }]
            }}
          />
          <CreatableSelect
            fieldKeyPath='creatableSelect'
            attrs={{
              options: [{
                label: 'Admin',
                value: 'admin'
              },{
                label: 'User1',
                value: 'user1'
              }]
            }}
          />
          <MultiSelect
            fieldKeyPath='multiSelect'
            attrs={{
              options: [{
                label: 'Admin',
                value: 'admin'
              },{
                label: 'User1',
                value: 'user1'
              }]
            }}
          />
          <CreatableMultiSelect
            fieldKeyPath='creatableMultiSelect'
            attrs={{
              options: [{
                label: 'Admin',
                value: 'admin'
              },{
                label: 'User1',
                value: 'user1'
              }]
            }}
            validation={['required']}
          />
          <TextArea
            fieldKeyPath='textArea'
            validation={['required']}
          />
        </Form>
        <button type='button' onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
