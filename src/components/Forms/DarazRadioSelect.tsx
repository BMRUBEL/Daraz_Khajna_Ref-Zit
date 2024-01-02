import React from 'react';
import { Radio } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

type UMRadioSelectProps = {
  name: string;
  options: { value: boolean; label: string }[];
  defaultValue?: boolean;
  label? : string;
  required?: boolean;
  disable?: boolean;
  
};

const FormRadioSelect = ({ name, options, defaultValue, label, required ,disable}: UMRadioSelectProps) => {
  const { control } = useFormContext();

  return (
    <>
     <p>{label ? label : null}</p>
     <p style={{ color: "red" }}>{`${required ? "*" : ""}`}</p>
     <Controller
    
    name={name}
    control={control}
    defaultValue={defaultValue}
    disabled ={disable}
    render={({ field }) => (
      <Radio.Group {...field}>
        {options.map((option) => (
          <Radio key={option.value} value={option.value}  >
            {option.label}
          </Radio>
        ))}
      </Radio.Group>
    )}
  />
    </>
  
  );
};

export default FormRadioSelect;
