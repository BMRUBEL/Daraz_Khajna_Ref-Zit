"use client";

import Loading from "@/app/loading";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleStoreDetailsQuery,

} from "@/redux/api/companyApi/storeDetailsApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewTransactionPage = ({ params }: any) => {
  // state
  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleStoreDetailsQuery(id, {});
  const sourceId: any = data?.transSrcTypeId;
  console.log("single data", sourceId);

  useEffect(() => {
    setDefaultValue({
      branchId: data.result?.branchId,
      slCode: data.result?.slCode,
      slName: data.result?.slName,
      slNameBn: data.result?.slNameBn,
      slAddress: data.result?.slAddress,
      slAddressBn: data.result?.slAddressBn,
      slType: data.result?.slType,
      isDefaultLocation: data.result?.isDefaultLocation,
      isVirtualLocation: data.result?.isVirtualLocation,
      isSalesPoint: data.result?.isSalesPoint,

    });
  }, [data]);

  const options = [
    { value: "", label: "" },

    // Add more options as needed
  ];
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
      <UMBreadCrumb pageName="Store Location" lastName="View" />
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
                justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
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
                    color:"black"
                  }}
                  name="branchId"
                  label="Branch Name: "
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
                    color:"black"
                  }}
                  type="text"
                  name="slCode"
                  label="Store Location Code: "
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
                    color:"black"
                  }}
                  type="text"
                  name="slName"
                  label="Store Lcoation Name: "
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
                    color:"black"
                  }}
                  type="text"
                  name="slNameBn"
                  label="Store Lcoation Name BN: "
                  required
                  disable
                />
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
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
                    textAlign: "left",
                  }}
                  type="text"
                  name="stroeShortName"
                  label="Store Short Name: "
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
                  name="stroeShortNameBn"
                  label="Store Short Name Bn: "
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
                    color:"black"
                  }}
                  type="text"
                  name="slAddress"
                  label="Address: "
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
                    color:"black"
                  }}
                  type="text"
                  name="slAddressBn"
                  label="Address Bn: "
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
                    color:"black"
                  }}
                  name="slType"
                  label="Store Type:   "
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
                    textAlign: "left",
                  }}
                  name="employee"
                  label="Employee:  "
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
                {/* <FormCheckbox
               name=""   
                  options={[
                    {
                      value: "isDefaultLocation",
                      label: "Is Default Location",
                    },
                  ]}
                  checked={defaultValue?.isDefaultLocation}
                  isViewPage={true}
                 disable
                /> */}
                 <FormCheckbox
                  label="Is Default Location"
                  name="isDefaultLocation"
                  isViewPage={true}
                  options={options}
                  disable={true}
                  checked={true}
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
                 
                  label="Is Virtual Location"
                  name="isVirtualLocation"
                  isViewPage={true}
                  options={options}
                  disable={true}
                  checked={defaultValue?.isVirtualLocation}
                 
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
                //   name=""
                //   options={[
                //     {
                //       value: "isSalesPoint",
                //       label: "Is Sales Point",
                //     },
                //   ]}
                //   checked={defaultValue?.isSalesPoint}
                //   isViewPage={true}
                // disable
                
                label="Is Sales Point"
                name="isSalesPoint"
                isViewPage={true}
                options={options}
                disable={true}
                checked={defaultValue?.isSalesPoint}
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
            <Link
              href={`/super_admin/company-setting/company-store/store-location`}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/company-setting/company-store/store-location/edit/${id}`}
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
