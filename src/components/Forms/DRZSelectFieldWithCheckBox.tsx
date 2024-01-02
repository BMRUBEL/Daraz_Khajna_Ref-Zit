"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Checkbox, Select } from 'antd';
import { Controller, useFormContext } from 'react-hook-form';

type SelectOptions = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  options: SelectOptions[];
  name: string;
  size?: 'large' | 'small';
  value?: string | string[] | undefined;
  placeholder?: string;
  label?: string;
  defaultValue?: SelectOptions;
  required?: boolean;
  onSearch?: (value: string) => void;
  filterOption?: (input: string, option: { label: string; value: string }) => boolean;
  disable?: boolean;
  style?: React.CSSProperties;
  validation?: object;
  setSelected?: any;
  onChange?: (value: string | string[] | undefined) => void;
};

const DarazSelectWithCheckBox = ({
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
  onChange,
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
          display: 'flex',
          marginBottom: '5px',
        }}
      >
        <p>{label ? label : null}</p>
        <p style={{ color: 'red' }}>{`${required ? '*' : ''}`}</p>
      </div>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange: onControllerChange } }) => (
          <Select
            size={size}
            showSearch
            placeholder={placeholder}
            mode="multiple"
            optionFilterProp="children"
            onChange={(selectedValue) => {
              onControllerChange(selectedValue);
              if (onChange) {
                onChange(selectedValue);
              }
            }}
            onSearch={onSearch}
            filterOption={filterOption}
            options={options}
            value={value || []}
            style={{
              textAlign: 'left',
              ...(style ? style : ''),
            }}
            disabled={disable}
          >
            {options?.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                <Checkbox
                  checked={value?.includes(opt.value)}
                  onChange={() => {
                    const updatedValues = value?.includes(opt.value)
                      ? value.filter((v) => v !== opt.value)
                      : [...(value || []), opt.value];

                    onControllerChange(updatedValues);
                    if (onChange) {
                      onChange(updatedValues);
                    }
                  }}
                >
                  {opt.label}
                </Checkbox>
              </Select.Option>
            ))}
            {options?.length > 3 && (
              <Select.Option key="all" value="all">
                <Checkbox
                  checked={value?.length === options.length}
                  onChange={() => {
                    const allValues = value?.length === options.length ? [] : options.map((opt) => opt.value);
                    onControllerChange(allValues);
                    if (onChange) {
                      onChange(allValues);
                    }
                  }}
                >
                  Select All
                </Checkbox>
              </Select.Option>
            )}
          </Select>
        )}
      />
      <small
        style={{
          color: 'red',
        }}
      >
        {errorMessage}
      </small>
    </>
  );
};

export default DarazSelectWithCheckBox;