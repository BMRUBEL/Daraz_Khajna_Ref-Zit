"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { Col, Row } from "antd";
import Link from "next/link";
import {  useState, useEffect } from "react";
import dayjs from "dayjs";
import { useGetSingleLastMonthColumQuery } from "@/redux/api/commercialApi/lastMonthColumApi";
import Loading from "@/app/loading";

const ViewLastMonthClosingBal = ({ params }: any) => {
  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleLastMonthColumQuery(id, {});

  useEffect(() => {
    setDefaultValue({
      id: data.result?.id,
      transactionDate: dayjs(data.result?.transactionDate).format("MMM D, YYYY"),
      vatMonthName: data.result?.vatMonthName,
      lastMonthClosingBalanceVat: data.result?.lastMonthClosingBalanceVat,
      lastMonthClosingBalanceSd: data.result?.lastMonthClosingBalanceSd,
      remarks: data.result?.remarks,
      
    });
  }, [data]);
  if (isLoading) {
    return <Loading />;
  }
  const onSubmit = () => {};
  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Last Month Closing Balance"
        lastName="View"
        link="/super_admin/commercial/last-month-closing-balance"
      />
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
        <Form
          submitHandler={onSubmit}
          defaultValues={defaultValue}
        >
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color:"black" }}
                  type="text"
                  name="id"
                  label="Transaction ID:"
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
                 style={{ width: "100%", textAlign: "left", color:"black" }}
                  name="transactionDate"
                  label="Transaction Date:"
                  // size="large"
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                   style={{ width: "100%", textAlign: "left", color:"black" }}
                  name="vatMonthName"
                  label="VAT Month  "
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                   style={{ width: "100%", textAlign: "left", color:"black" }}
                  type="text"
                  name="lastMonthClosingBalanceVat"
                  label="LMC VAT Amount"
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                   style={{ width: "100%", textAlign: "left", color:"black" }}
                  type="text"
                  name="lastMonthClosingBalanceSd"
                  label="LMC SD Amount"
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                   style={{ width: "100%", textAlign: "left", color:"black" }}
                  type="text"
                  name="remarks"
                  label="Remarks "
                  disable
                />
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/commercial/last-month-closing-balance`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewLastMonthClosingBal;
