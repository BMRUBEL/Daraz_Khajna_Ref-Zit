"use client";

import Loading from "@/app/loading";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormImageUpload from "@/components/Forms/FormImageUpload";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleMenusQuery,

} from "@/redux/api/securityApi/menusApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
// import FormImageUpload from './FormImageUpload';

const ViewMenusPage = ({ params }: any) => {
  const options = [
    { value: "", label: "" },

  ];

  const [uploadedFile, setUploadedFile] = useState(null);

  const [imagePath, setImagePath] = useState<string | null>(null);
  // state
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data = [], isLoading } = useGetSingleMenusQuery(id, {});
  const sourceId: any = data?.transSrcTypeId;
  // console.log(sourceId);


  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      trnsSourceTypeId: data.result?.trnsSourceTypeId,
      trnsTypeName: data.result?.trnsTypeName,
      trnsTypeNameBn: data.result?.trnsTypeNameBn,
      active: data.result?.active,
      seqNo: data.result?.seqNo,
    });
  }, [data]);

  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = () => { };
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // setSelectedRowKeys(newSelectedRowKeys);
  };
  // const handleImageUpload = (filePath: string) => {
  //   setImagePath(filePath);
  // };

  const handleImageUpload = (file) => {
    // Handle image upload logic here
    console.log('File uploaded:', file);

    // Set the uploaded file to state
    setUploadedFile(file);
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="Menus" lastName="View" link="/super_admin/security/menus" />
      <div
        style={{
          padding: "20px",
          marginTop: "11px",
          backgroundColor: "#fff6f6e6",
          borderRadius: "10px",
          border: "1px solid #e9e8e8",
          boxSizing: "border-box",
        }}
      >
        <Form submitHandler={onSubmit} defaultValues={defaultValue}>
          <div
            style={{
              padding: "0px",
              marginTop: "12px",
            }}
          >
            {/* <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsSourceTypeName"
                  label="Source Type Name:  "
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeName"
                  label="Trans Type Name:"
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeNameBn"
                  label="Trans Type Name BN:"
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="seqNo"
                  label="Seq No:"
                  required
                  disable
                />
              </Col>
            </Row> */}
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeName"
                  label="Menu Name:"
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeNameBn"
                  label="Menu Name BN: "
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  label="Parent Menu:  "
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  label="Sub Menu:  "
                  required
                  disable

                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  label="Route Name:  "
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="number"
                  name="seqNo"
                  label="Sequence No: "
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormCheckbox
                  label="Is New Tab"
                  name="isVirtualLocation"
                  options={options}
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormRadioSelect
                  label="Active Status"
                  name="active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "InActive" },
                  ]}
                  disable
                />

              </Col>
              {/* <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormImageUpload
                  name="compCode"
                  label="Icon: "
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",

                  }}
                  onImageUpload={handleImageUpload}
                  
                />
              </Col> */}

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: '20px',
                }}
              >
                <FormImageUpload
                  name="compCode"
                  label="Icon: "
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  onImageUpload={handleImageUpload}
                />

                {/* Display the uploaded image */}
                {/* {uploadedFile && (
                  <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt="Uploaded Icon"
                    style={{ width: '100%', marginTop: '10px' }}
                  />
                )} */}
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "0px 40px",
              alignItems: "center",
            }}
          >
            <Link href={`/super_admin/security/menus`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/security/menus/edit/${id}`}
                >
                  Go to edit
                </DarazCommonRedirectButton>
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </div>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewMenusPage;
