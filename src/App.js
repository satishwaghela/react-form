import React, { Component } from 'react';
// import SimpleForm from './SimpleForm';
import HooksExample from './HooksExample';

export default class App extends Component {
  state = {
    formData: {}
  }

  handleNew = (e) => {
    this.setState({ formData: {} });
  }

  handleEdit = (e) => {
    this.setState({
      formData: {
        id: 1,
        username: 'test',
        profile: {
          firstname: 'satish',
          lastname: 'waghela'
        },
        dummyname: ['Bob'],
        permission: { user: 'testuser1' },
        assignResp: ['Gilad Gray', 'Jason Killian'],
        gender: 'male',
        access: [{ role: 'testrole' }, { user: 'testuser' }, { group: 'testgroup' }],
        ack: true
      }
    });
  }

  render () {
    const { formData } = this.state;
    return (
      <>
        <button onClick={this.handleNew}>New</button>
        <button onClick={this.handleEdit}>Edit</button>
        <HooksExample formData={formData} key={formData.id} />
      </>
    );
  }
}
