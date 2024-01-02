import { Checkbox } from "antd";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { useEffect } from "react";

type checkboxProps = {
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  label?: string;
  style?: any;
  disable?: boolean;
  initialValue?: boolean; // new prop to receive initial value from API
};

const FormCheckbox = ({
  name,
  options,
  required,
  label,
  style,
  disable,
  initialValue, // new prop to receive initial value from API
}: checkboxProps) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  useEffect(() => {
    // Set initial value from API response
    console.log("Initial Value for", name, ":", initialValue); // Add this line
    if (initialValue !== undefined) {
      setValue(name, initialValue);
    }
  }, [initialValue, setValue, name]);

  return (
    <>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          padding: "20px",
        }}
      >
        {options.map((option, i) => (
          <div key={i}>
            <Controller
              name={`${name}.${option.value}`}
              control={control}
              disabled={disable}
              // defaultValue={false} // Set a default value (false for checkboxes)
              render={({ field }) => (
                <Checkbox
                  style={{
                    ...style,
                    transform: "scale(1.5)",
                    fontSize: "12px",
                  }}
                  {...field}
                  key={option.value}
                  value={option.value}
                  // checked={field.value} // Use the 'checked' prop
                >
                  {option.label}
                </Checkbox>
              )}
            />
            <small
              style={{
                color: "red",
              }}
            >
              {errorMessage}
            </small>
          </div>
        ))}
        <p>{label ? label : null}</p>
      </div>
    </>
  );
};

export default FormCheckbox;
