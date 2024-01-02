"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleMasterGroupQuery,
} from "@/redux/api/companyApi/masterGroupApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewMasterGroup = ({ params }: any) => {
  // state

  const id = params.slug as string;

  const { data, isLoading } = useGetSingleMasterGroupQuery(id);
  const itemMasterData = data?.result;

  console.log(itemMasterData, "Item Master Data")

  if (!itemMasterData) {
    return <Loading />;
  }
  const {
    prodTypeName,
    itmMstrGrpName,
    itmMstrGrpNameBn,
    itmMstrGrpPrefix,
    itemMstrGrpDes,
    itemMstrGrpDesBn,
    active
  } = itemMasterData;


  if (isLoading) {
    return <Loading />;
  }


  const onSubmit = () => { };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="Master Group" lastName="View" link={`/super_admin/company-setting/items/master-group`} />
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
        <Form submitHandler={onSubmit}>
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
                // justifyContent: "space-evenly",
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
                    color: "black",
                  }}
                  type="text"
                  name=""
                  value={prodTypeName}
                  label="Product Type:"
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
                    color: "black",
                  }}
                  type="text"
                  name=""
                  value={itmMstrGrpPrefix}
                  label="Master Group Prefix:"
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
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name=""
                  value={itmMstrGrpName}
                  label="Master Group Name:  "
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
                  name=""
                  value={itmMstrGrpNameBn}
                  label="Master Group Name Bn:"
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
                  name=""
                  value={itemMstrGrpDes}
                  label="Master Group Description:"
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
                  name=""
                  value={itemMstrGrpDesBn}
                  label="Master Group Description Bn:"
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
                <FormRadioSelect
                  label="Status: "
                  name="active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "InActive" },
                  ]}
                  defaultValue={active}
                  disable
                />
              </Col>

            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              // padding: "0px 40px",
              alignItems: "center",
            }}
          >
            <Link href={`/super_admin/company-setting/items/master-group`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/company-setting/items/master-group/edit/${id}`}
                >
                  Edit
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

export default ViewMasterGroup;
