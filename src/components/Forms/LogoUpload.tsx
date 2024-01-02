/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface LogoInputProps {
  style?: React.CSSProperties;
  name?: string;
}

const LogoInput: React.FC<LogoInputProps> = ({ style, name }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const dummyRequest = ({ file, onSuccess }: any) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    } else {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
    return isImage;
  };

  return (
    <div>
      <Upload
       name={name}
        customRequest={dummyRequest}
        beforeUpload={beforeUpload}
        showUploadList={false}
        style={style}
      >
        <Button >{selectedFile ? selectedFile.name : "Select Logo"}</Button>
      </Upload>
      {selectedFile && (
        <div>
          {/* <p>Selected image: {selectedFile.name}</p>
          <img
            src={imagePreview}
            alt="Uploaded"
            style={{ maxWidth: "200px" }}
          /> */}
        </div>
      )}
    </div>
  );
};

export default LogoInput;
