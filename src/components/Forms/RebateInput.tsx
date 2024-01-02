"use client";

import { getErrorMessageByPropertyName } from "@/utils/schema-validator";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import DebateableModal from "../Modal/DebateableModal";
import { useAppSelector } from "@/redux/hook";

interface IInput {
  name: string;
  type?: string;
  size?: "large" | "small";
  value?: string | string[] | undefined;
  id?: string;
  placeholder?: string;
  validation?: object;
  label?: string;
  required?: boolean;
  disable?: boolean;
}
const RebateInput = ({
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
}: IInput) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const isDebateAble = useAppSelector((state) => state.receive.isDebateAble);

  const [open, setOpen] = useState(false);
  const errorMessage = getErrorMessageByPropertyName(errors, name);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e);
    setOpen(false);
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
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div
            style={{
              position: "relative",
              color:"black"
            }}
          >
            <Input
              type={type}
              size={size}
              placeholder={isDebateAble ? "REBATEABLE" : "NON REBATEABLE"}
              // @ts-ignore
            //  value={value}
              {...field}
              disabled={disable}
              style={{
                color:"black"

              }}
              className="custom-input"

            />
            {disable && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                }}
              >
                <Button
                  onClick={showModal}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    width: "35px",
                    backgroundColor: "#5bc0de",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    borderRadius: "0px",
                  }}
                >
                  <CheckOutlined />
                </Button>
              </div>
            )}
            <DebateableModal
              open={open}
              handleOk={handleOk}
              handleCancel={handleCancel}
            />
          </div>
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

export default RebateInput;
