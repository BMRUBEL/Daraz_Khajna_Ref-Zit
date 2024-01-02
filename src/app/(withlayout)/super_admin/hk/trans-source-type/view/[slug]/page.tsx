"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useGetSingleTransactionsourceQuery } from "@/redux/api/housekeepingApi/transactionSourceTypeApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewTransactionPage = ({ params }: any) => {
  // state
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data = [], isLoading } = useGetSingleTransactionsourceQuery(id, {});
  // const sourceId: any = data?.tranSourceTypeId;
  // console.log(sourceId);

  const onSubmit = () => { };

  useEffect(() => {
    setDefaultValue({
      active: data.result?.active,
      id: data.result?.id,
      tranSourceTypeId: data.result?.tranSourceTypeId,
      tranSourceTypeName: data.result?.tranSourceTypeName,
      tranSourceTypeNameBN: data.result?.tranSourceTypeNameBN,
      seqNo: data.result?.seqNo,
    });
  }, [data]);

  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
     
        <UMBreadCrumb pageName="Transaction Source Type" lastName="View" link={`/super_admin/hk/trans-source-type`} />
 

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
                  name="tranSourceTypeName"
                  label="Source Type Name:"
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
                  name="tranSourceTypeNameBN"
                  label="Source Type Name BN:"
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
            <Link href={`/super_admin/hk/trans-source-type`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/hk/trans-source-type/edit/${id}`}
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
