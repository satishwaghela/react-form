# This form module provides solution for simple form as well as advanced form i.e dynamic form rendering using json and create custom field e.g key value pair or array of key value pair.

## Simple form example

```
import  React, { Component } from  'react';
import  Form  from  './form';
import { String, Password } from  './form/Fields'

class  LoginForm  extends  Component {
	state = {
		formData: {} // default values can be set here
	}

	handleLogin = () => {
		if (this.Form.isValid()) {
			console.log(this.Form.state.FormData);
		} else {
			this.Form.validate(); // Validate shows error msg on UI
		}
	}
	
	render () {
		const { formData } = this.state;

		return (
			<Form  FormData={formData}  ref={ref  =>  this.Form = ref}>
				<String
					fieldKeyPath='username'
					validation={['required']}
				>
				<Password
					fieldKeyPath='password'
					validation={['required']}
				>
				<button  type='button'  onClick={this.handleLogin}>Login</button>
			</Form>  
		);
	}
}
```
#

> this module uses lodash's `get` and `set` methods. this means in fieldKeyPath you can pass `'profile.firstName'` to set `firstName` value  in `profile` object of formData or likewise can give array index `'keyValue.0.key'` and `'keyValue.0.value'`, see examples to explore more.

## Clone and run server to see more examples. 
