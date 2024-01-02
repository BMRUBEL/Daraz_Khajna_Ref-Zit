"use client";

import { DatePicker, DatePickerProps, Input, Select } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";

type UMDatePickerProps = {
  onChange?: (valOne: Dayjs | null, valTwo: string) => void;
  name: string;
  style?: any;
  value?: Dayjs;
  label?: string;
  size?: "large" | "small";
  required?: boolean;
  disable?: boolean;
  placeholder?: string;
  showTime?: boolean; // New prop for enabling time selection
  format?: string; // New prop for specifying date and time format
};

const FormDatePicker = ({
  name,
  label,
  onChange,
  size,
  style,
  required,
  disable,
  placeholder,
  showTime = false, // Default to false if not provided
  format = "DD-MM-YYYY",
}: UMDatePickerProps) => {
  const { control, setValue } = useFormContext();

  const handleOnChange: DatePickerProps["onChange"] = (date, dateString) => {
    onChange ? onChange(date, dateString) : null;
    setValue(name, dateString);
  };

  // Set the initial date to the current date only if the field is empty
  const currentDate = dayjs();
  const initialDateValue = currentDate.format(format);

  return (
    <div>
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
        render={({ field }) => (
          <DatePicker
            // value={field.value ? dayjs(field.value) : null}
            defaultValue={
              field.value
                ? dayjs(field.value, format)
                : dayjs(initialDateValue, format)
            }
            size={size}
            onChange={handleOnChange}
            placeholder={placeholder}
            style={{
              textAlign: "left",
              width: "100%",
              ...(style ? style : ""),
            }}
            disabled={disable}
            showTime={showTime} // Pass the showTime prop
            format={format} // Pass the format prop
          />
        )}
      />
    </div>
  );
};

export default FormDatePicker;
