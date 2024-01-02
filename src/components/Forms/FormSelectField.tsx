"use client";

import { Input, Select } from "antd";
import { type } from "os";
import { useFormContext, Controller } from "react-hook-form";

type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: any;
  required?: boolean;
};
const FormSelectField = ({
  name,
  size,
  value,
  placeholder,
  label,
  options,
  defaultValue,
  required,
}: SelectFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      <div
        style={{
          display: "flex",
          marginBottom: "5px",
        }}
      >
        <p>{label ? label : null}</p>
        <p style={{ color: "red" }}>{`${required ? "*" : ""}`}</p>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select
            size={size}
            onChange={onChange}
            options={options}
            value={value}
            style={{
              width: "100%",
            }}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
        )}
      />
    </>
  );
};

export default FormSelectField;
