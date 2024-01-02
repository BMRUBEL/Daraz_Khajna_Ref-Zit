"use client";

import Loading from "@/app/loading";
import LegalDocChildTable from "@/components/ChildTable/CompanySetting/LegalDocChildTable";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleLegalDocumentsQuery,
} from "@/redux/api/companyApi/legalDocApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewLegalDocs = ({ params }: any) => {

  // state
  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;

  const { data = [], isLoading } = useGetSingleLegalDocumentsQuery(id, {});
  const sourceId: any = data?.transSrcTypeId;
  // console.log(sourceId);


  useEffect(() => {
    setDefaultValue({
      trnsSourceTypeName: data.result?.trnsSourceTypeId,
      trnsTypeName: data.result?.trnsTypeName,
      trnsTypeNameBn: data.result?.trnsTypeNameBn,
      seqNo: data.result?.seqNo,
    });
  }, [data]);

  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = () => {};

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="Legal Docs" lastName="View" />
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
            <Row
              style={{
                display: "flex",
                alignItems: "center",
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
                  type="text"
                  name="receiveNo"
                  size="large"
                  label="Doc No:"
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
                    textAlign: "left",
                  }}
                  type="text"
                  name="itemgroupPrefix"
                  label="Doc Name:"
                  disable
                  required
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
                    textAlign: "left",
                  }}
                  name="prodCatName"
                  label="Doc Type:"
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
                <FormDatePicker
                  name="receiveDate"
                  label="Upload Date:"
                  size="large"
                  required
                  style={{
                    width: "100%",
                  }}
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
                <FormDatePicker
                  name="receiveDate"
                  label="Expire Date:"
                  size="large"
                  required
                  style={{
                    width: "100%",
                  }}
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
                    textAlign: "left",
                  }}
                  type="file"
                  name="trnsTypeName"
                  label="Select File:"
                 disable
                  required
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
                    textAlign: "left",
                  }}
                  type="text"
                  name="itemDescription"
                  label="Remarks :"
                 disable
                 required
                />
              </Col>
            </Row>
          </div>
                <LegalDocChildTable/>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "0px 40px",
              alignItems: "center",
            }}
          >
            <Link href={`/super_admin/company-setting/legal-documents`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/company-setting/legal-documents/edit/${id}`}
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

export default ViewLegalDocs;
