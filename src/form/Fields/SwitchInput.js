import React from 'react';
import PropTypes from 'prop-types';

export function SwitchInput ({ checked, id = Math.random(), onChange, switchWidth, onText, offText }) {
  return (
    <div className='onoffswitchinput' style={{ width: switchWidth }}>
      <input
        type='checkbox'
        className='onoffswitchinput-checkbox'
        id={id}
        value={checked}
        onChange={onChange}
      />
      <label className='onoffswitchinput-label' htmlFor={id}>
        <span className='onoffswitchinput-inner' data-oncontent={onText} data-offcontent={offText} />
        <span className='onoffswitchinput-switch' style={{ right: checked ? 0 : `calc(${switchWidth} - 30px)` }} />
      </label>
    </div>
  );
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
  switchWidth: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string
};
