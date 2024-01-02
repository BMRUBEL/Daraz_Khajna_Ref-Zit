import React, { useState } from 'react';
import { Upload, Button, message, Image, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFormContext, Controller } from 'react-hook-form';
import axios from 'axios';

const { Dragger } = Upload;

type ImageUploadProps = {
    name: string;
    label?: string;
    style?: React.CSSProperties;
    onImageUpload: (filePath: string) => void;
};

const FormImageUpload = ({ name, label, style, onImageUpload }: ImageUploadProps) => {
    const { control } = useFormContext();
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        } else {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageUrl(reader.result as string);
            };

            uploadFile(file);
        }
        return isImage;
    };

    const handleRemoveImage = () => {
        setImageUrl(null);
    };

    const uploadFile = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            // Replace the actual server endpoint
            const response = await axios.post('http://localhost:3000/assets', formData);

            if (response.data.success) {
                const filePath = response.data.filePath;
                console.log('File uploaded successfully:', filePath);
                onImageUpload(filePath);
            } else {
                message.error('File upload failed');
            }
        } catch (error) {
            console.error('Error uploading file:', error.message);
            message.error('File upload failed');
        }
    };

    return (
        <div className={`flex flex-col w-full`}>
            {label ? <label>{label}</label> : null}

            <Controller
                control={control}
                name={name}
                render={({ field }) => (
                    <div>
                        {imageUrl ? (
                            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', width: '100%' }}>
                                <Image src={imageUrl} alt="Uploaded Image" style={{ marginRight: '8px', maxWidth: '100px', maxHeight: '100px' }} />
                                <Popconfirm title="Are you sure to delete this image?" onConfirm={handleRemoveImage} okText="Yes" cancelText="No">
                                    <Button icon={<DeleteOutlined />} type="danger" />
                                </Popconfirm>
                            </div>
                        ) : (
                            <Upload
                                style={{ ...style, width: '100%' }}
                                name={name}
                                multiple={false}
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                            >
                                <Button style={{
                                    width: "100%",
                                }}>
                                    Choose File
                                </Button>
                                
                            </Upload>
                        )}
                    </div>
                )}
            />
        </div>
    );
};

export default FormImageUpload;
