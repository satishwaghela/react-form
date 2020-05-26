import React from 'react';

export function SwitchInput ({ checked, id = Math.random(), onChange, switchWidth, onText, offText }) {
  return (
    <div className="onoffswitchinput" style={{ width: switchWidth }}>
      <input
        type='checkbox'
        className='onoffswitchinput-checkbox'
        id={id}
        value={checked}
        onChange={onChange}
      />
      <label className='onoffswitchinput-label' htmlFor={id}>
        <span className='onoffswitchinput-inner' data-oncontent={onText} data-offcontent={offText}></span>
        <span className='onoffswitchinput-switch' style={{ right: checked ? 0 : `calc(${switchWidth} - 30px)` }} ></span>
      </label>
    </div>
  );
}

SwitchInput.defaultProps = {
  onChange: () => {},
  switchWidth: '65px',
  onText: 'On',
  offText: 'Off'
}