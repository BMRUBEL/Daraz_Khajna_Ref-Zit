import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

type CustomUploadProps = {
    name: string;
    style?: React.CSSProperties;
    beforeUpload: (file: File) => boolean;
};

const CustomUpload: React.FC<CustomUploadProps> = ({ name, style, beforeUpload }) => {
    const props = {
        name,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        headers: {
            authorization: 'authorization-text',
        },
        beforeUpload,
        showUploadList: false,
    };

    return (
        <Upload {...props} style={{
            width: "100%",
        }}>
            <Button style={style}>
                <p className="ant-upload-text">Choose File</p>
                <p className="ant-upload-hint">No choosen file</p>
            </Button>
        </Upload>
    );
};

export default CustomUpload;
