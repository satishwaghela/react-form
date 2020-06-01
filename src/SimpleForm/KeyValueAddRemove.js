import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Form from '../form';
const { String } = Form.Fields;

export default class KeyValueAddRemove extends Component {
  getForm () {
    return _.get(this, 'context.form');
  }

  getValueArr () {
    const { fieldKeyBasePath } = this.props;
    return _.get(this, `context.form.props.formData.${fieldKeyBasePath}`, []);
  }

  setValueArr (formData, valueArr) {
    const { fieldKeyBasePath } = this.props;
    return _.set(formData, fieldKeyBasePath, valueArr);
  }

  getErrorArr () {
    const { fieldKeyBasePath } = this.props;
    return _.get(this, `context.form.state.errors.${fieldKeyBasePath}`, []);
  }

  setErrorArr (errorArr) {
    const { fieldKeyBasePath } = this.props;
    return _.set(this, `context.form.state.errors.${fieldKeyBasePath}`, errorArr);
  }

  handleAdd = () => {
    const { fieldKeyBasePath } = this.props;
    const form = this.getForm();
    const { formData } = form.props;
    const copyFormData = _.cloneDeep(formData);
    const valueArr = _.get(copyFormData, fieldKeyBasePath, []);
    valueArr.push(undefined);
    this.setValueArr(copyFormData, valueArr);
    form.onFieldValueChange(copyFormData, () => {
      // form.forceUpdate();
    });
  }

  handleRemove = (index) => {
    const { fieldKeyBasePath } = this.props;
    const form = this.getForm();
    const { formData } = form.props;
    const copyFormData = _.cloneDeep(formData);
    const valueArr = _.get(copyFormData, fieldKeyBasePath, []);
    const errorArr = this.getErrorArr();
    valueArr.splice(index, 1);
    errorArr.splice(index, 1);
    this.setValueArr(copyFormData, valueArr);
    this.setErrorArr(errorArr);
    form.onFieldValueChange(copyFormData, () => {
      // form.forceUpdate();
    });
  }

  render () {
    const { fieldKeyBasePath } = this.props;
    const valueArr = this.getValueArr();
    return (
      <>
        <div className='row'>
          <div className='col-md-5'>Key *</div>
          <div className='col-md-5'>Value *</div>
        </div>
        {_.map(valueArr, (v, i) => {
          return (
            <div className='row'>
              <div className='col-md-5'>
                <String
                  fieldKeyPath={`${fieldKeyBasePath}.${i}.key`}
                  validation={['required']}
                />
              </div>
              <div className='col-md-5'>
                <String
                  fieldKeyPath={`${fieldKeyBasePath}.${i}.value`}
                  validation={['required']}
                />
              </div>
              <div className='col-md-2'>
                <button onClick={() => this.handleRemove(i)}>Remove</button>
              </div>
            </div>
          );
        })}
        <button onClick={this.handleAdd}>Add</button>
      </>
    );
  }
}

KeyValueAddRemove.contextTypes = {
  form: PropTypes.object
};

KeyValueAddRemove.propTypes = {
  fieldKeyBasePath: PropTypes.string
};
