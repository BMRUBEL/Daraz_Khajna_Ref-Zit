"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleUomInfoQuery} from "@/redux/api/housekeepingApi/uomInfoApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewTransactionPage = ({ params }: any) => {
  // state
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data = [], isLoading } = useGetSingleUomInfoQuery(id, {});
  const sourceId: any = data?.transSrcTypeId;
  // console.log(sourceId);


  useEffect(() => {
    setDefaultValue({
      active: data.result?.active,
      uomSetName: data.result?.uomSetName,
      uomShortCode: data.result?.uomShortCode,
      uomDesc: data.result?.uomDesc,
      uomLocalDesc: data.result?.uomLocalDesc,
      relativeFactor: parseInt(data.result?.relativeFactor),
      fractionAllow: data.result?.fractionAllow,
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
       
      <UMBreadCrumb pageName="Uom Info" lastName="View" link={`/super_admin/hk/uom-info`} />
     
     
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
                  name="uomSetName"
                  label="UOM Set Name:"
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
                  name="uomShortCode"
                  label="UOM Short Code:"
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
                  name="uomDesc"
                  label="UOM Desc:"
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
                  name="uomLocalDesc"
                  label="Local UOM Desc:  "
                  required
                  disable
                />
              </Col>
            
            </Row>
          </div>
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
                  name="relativeFactor"
                  label="Relative Factor:"
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
                   textAlign: "left",
                }}
                aria-required
              >
               <FormRadioSelect
                  label="Fraction Allow: "
                  name="fractionAllow"
                  options={[
                    { value: true, label: "Yes" },
                    { value: false, label: "No" },
                  ]}
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black", 
                   textAlign: "left",
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
            <Link href={`/super_admin/hk/uom-info`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/hk/uom-info/edit/${id}`}
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

export default ViewTransactionPage;