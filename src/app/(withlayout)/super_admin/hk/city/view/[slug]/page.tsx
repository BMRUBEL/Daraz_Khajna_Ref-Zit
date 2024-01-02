"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleCityQuery,
  } from "@/redux/api/housekeepingApi/cityApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewCityPage = ({ params }: any) => {
  // state
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data = [], isLoading } = useGetSingleCityQuery(id, {});
  const sourceId: any = data?.transSrcTypeId;
  // console.log(sourceId);


  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      active: data.result?.active, 
      countryId: data.result?.countryId,
      countryNameBn: data.result?.countryNameBn,
      name: data.result?.name,
      nameBn: data.result?.nameBn,
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
     
       <UMBreadCrumb pageName="City " lastName="View"  link="/super_admin/hk/city"/>
 
      
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
                // justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
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
                  name="countryNameBn"
                  label="Country:  "
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
                  name="name"
                  label="City Name:"
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
                  name="nameBn"
                  label="City Name BN: "
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
                  type="number"
                  name="seqNo"
                  label="Seq No: "
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
                <FormRadioSelect
                  label="Status: "
                  name="active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "InActive" },
                  ]}
                  disable
                  
                />
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
            <Link href={`/super_admin/hk/city`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/hk/city/edit/${id}`}
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

export default ViewCityPage;
