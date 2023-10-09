import React from "react";
import { useField } from 'informed';

export const NumberInput = (props) => {
  const { field, fieldState, fieldApi, ...otherProps } = useField(props);
  const { value } = fieldState;
  const { setValue, setTouched } = fieldApi;
  
  return (
    <input
      {...otherProps}
      value={!value && value !== 0 ? '' : value}
      maxLength={8}
      onChange={e => {
        let newValue = e.target.value.replace(/[^0-9]/g, '');
        setValue(newValue);
      }}
      onBlur={e => {
        setTouched(true);
      }}
    />
  );
};


