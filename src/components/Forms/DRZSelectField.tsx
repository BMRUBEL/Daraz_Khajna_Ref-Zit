"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";

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
  defaultValue?: SelectOptions;
  required?: boolean;
  onSearch?: (value: string) => void; // Update this line
  filterOption?: (
    input: string,
    option: { label: string; value: string }
  ) => boolean;
  disable?: boolean;
  style?: any;
  validation?: object;
  setSelected?:any;
  // onChange?: (value: string | string[] | undefined) => void;
  onChange?: any;
};

const DRZSelectField = ({
  name,
  size,
  value,
  placeholder,
  label,
  options,
  defaultValue,
  required,
  onSearch,
  filterOption,
  disable,
  style,
  validation,
  setSelected,
  onChange
}: SelectFieldProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = getErrorMessageByPropertyName(errors, name);
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
        render={({ field: { value, onChange:onControllerChange } }) => (
          <Select
            size={size}
            showSearch
            placeholder={placeholder !== undefined ? placeholder : undefined}
            optionFilterProp="children"
            onChange={(selectedValue)=>{
              onControllerChange(selectedValue);
              if(onChange){
                onChange(selectedValue)
              }
            }}
            onSearch={onSearch}
            // @ts-ignore
            filterOption={filterOption}
            options={options}
            value={value}
            style={{
              textAlign: "left",
              ...(style ? style : ""),
            }}
            disabled={disable}
            setSelected={value}
          />
        )}
      />
      <small
        style={{
          color: "red",
        }}
      >
        {errorMessage}
      </small>
    </>
  );
};

export default DRZSelectField;
