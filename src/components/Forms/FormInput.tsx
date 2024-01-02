"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { Input, Upload, Button } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { UploadOutlined } from "@ant-design/icons";
import { instance as axiosInstance } from "../../helpers/axios/axiosInstance"; // Update with the correct path

interface IInput {
  name: string;
  type?: string ;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  disable?: boolean;
  style?: any;
  defaultValue?: any;
  readOnly?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  name,
  type,
  size,
  value,
  id,
  placeholder,
  validation,
  label,
  required,
  disable,
  style,
  defaultValue,
  readOnly,
  onChange,
}: IInput) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const handleFileChange = async (info:any) => {
    if (info.file.status === "done" || info.file.status === "error") {
      // Set the file value in the form context
      setValue(name, info.file.response?.data.url || null);
    }
  };

  const uploadProps = {
    name: "file",
    action: "/your-upload-api-endpoint", // Update with your actual upload endpoint
    headers: {
      authorization: `Bearer ${axiosInstance.defaults.headers.Authorization}`,
      // Add any other headers needed for file uploads
    },
    onChange: handleFileChange,
  };

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
      {type === "file" ? (
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} disabled={disable}>
            Click to Upload
          </Button>
        </Upload>
      ) : (
        <Controller
          control={control}
          name={name}
          render={({ field }) =>
            type === "password" ? (
              <Input.Password
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
              />
            ) : (
              <Input
                style={{
                  ...style,
                }}
                defaultValue={defaultValue || ""}
                type={type}
                size={size}
                placeholder={placeholder}
                {...field}
                value={value ? value : field.value}
                onChange={(event) => {
                  field.onChange(event);
                  if (onChange) {
                    onChange(event);
                  }
                }}
                disabled={disable}
                readOnly={readOnly ? readOnly : ""}
              />
            )
          }
        />
      )}
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

export default FormInput;
