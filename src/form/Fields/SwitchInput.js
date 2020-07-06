import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

export class SwitchInput extends Component {
  render () {
    const { checked, id = Math.random(), onChange, switchWidth, onText, offText, className = '' } = this.props;
    return (
      <div className={`switch custom ${className}`}>
        <div className="onoffswitch" style={{width: switchWidth}}>
          <input
            type="checkbox"
            className="onoffswitch-checkbox"
            id={id}
            value={checked}
            checked={checked}
            onChange={onChange}
          />
          <label className="onoffswitch-label" htmlFor={id}>
            <span
              ref={ref => { this.inner = ref }}
              className="onoffswitch-inner"
              data-checked={checked}
              data-oncontent={onText}
              data-offcontent={offText}
              style={{ marginLeft: checked ? '0px' : `calc(-${switchWidth} + 5px)` }}
            />
            <span
              ref={ref => { this.switch = ref }}
              className="onoffswitch-switch"
              style={{ right: checked ? '0px' : `calc(${switchWidth} - 20px)`}}
            />
          </label>
        </div>
      </div>
    );
  }
}

SwitchInput.defaultProps = {
  onChange: () => {},
  switchWidth: '65px',
  onText: 'On',
  offText: 'Off'
};

SwitchInput.propTypes = {
  checked: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  switchWidth: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string
};
