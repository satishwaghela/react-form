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
  state = {
    FormData: {},
    disableBtn: true
  }

  handleSubmit = () => {
    if (this.Form.isValid()) {
      console.log(this.Form.state.FormData);
    } else {
      this.Form.validate();
      console.log(this.Form.state.Errors);
    }
  }

  handleFormChange = () => {
    if (this.Form.isValid()) {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  }

  render () {
    const { FormData, disableBtn } = this.state;
    return (
      <div className='App'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <Form FormData={FormData} ref={ref => this.Form = ref} onChange={this.handleFormChange}>
              <String
                label='E-mail'
                fieldKeyPath='email'
                validation={['required', 'email']}
              />
              <String
                fieldKeyPath='profile.firstname'
                validation={['required']}
                attrs={{
                  placeholder: 'Without title'
                }}
              />
              <String
                fieldKeyPath='profile.lastname'
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
              <div className='row'>
                <div className='col-md-6'>
                  <String
                    label='Key'
                    fieldKeyPath='xyz.0.key'
                    validation={['required']}
                  />
                </div>
                <div className='col-md-6'>
                  <String
                    label='Value'
                    fieldKeyPath='xyz.0.value'
                    validation={['required']}
                  />
                </div>
              </div>
            </Form>
            <button
              type='button'
              onClick={this.handleSubmit}
              className={`btn btn-success ${disableBtn ? 'disable' : ''}`}
            >Submit</button>
            </div>
        </div>
      </div>
    );
  }
}
