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
    }
  }

  render () {
    const { disableBtn } = this.state;
    return (
      <div className='App'>
        <div className='row'>
          <div className='col-md-6 offset-md-3'>
            <Form FormData={{}} ref={ref => this.Form = ref} onChange={this.handleFormChange}>
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
