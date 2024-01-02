"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useGetSingleDuePenaltySerchargeQuery } from "@/redux/api/commercialApi/duePenaltySerchargeApi";
import Loading from "@/app/loading";
import dayjs from "dayjs";


const ViewDuePenaltySurcharge = ({ params }: any) => {
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data, isLoading } = useGetSingleDuePenaltySerchargeQuery(id);

  const dueData = data?.result;

  useEffect(() => {
    setDefaultValue({

      id: parseInt(dueData?.id),
      transactionDate: dayjs(dueData?.transactionDate).format(
        "MMM D, YYYY"
      ),
      vatMonthName: dueData?.vatMonthName,
      intOnUnpaidVat: dueData?.intOnUnpaidVat,
      intOnUnpaidSd: dueData?.intOnUnpaidSd,
      penaltyAmount: dueData?.penaltyAmount,
      payableExciseDuty: dueData?.payableExciseDuty,
      payableDevSurcharge: dueData?.payableDevSurcharge,
      payableIctDevSurcharge: dueData?.payableIctDevSurcharge,
      payableHealthCareSurcharge: dueData?.payableHealthCareSurcharge,
      payableEnvProtSurcharge: dueData?.payableEnvProtSurcharge,
      remarks: dueData?.remarks,
    });
  }, [dueData]);

  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }



  const onSubmit = () => { };

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Due Penalty Surcharge"
        lastName="View"
        link={`/super_admin/commercial/due-penalty-surcharge`}
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
                  style={{ width: "100%", textAlign: "left", color: "black" }}
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
                  style={{ color: "black" }}
                  name="transactionDate"
                  label="Transaction Date:"
                  // size="large"

                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
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
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="intOnUnpaidVat"
                  label="Interest On Unpaid VAT"
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="intOnUnpaidSd"
                  label="Interest On Unpaid SD"
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="penaltyAmount"
                  label="Penalty Amount "
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="payableExciseDuty"
                  label="Payable Excise Duty "
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="payableDevSurcharge"
                  label="Payable Dev Surcharge "
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="payableIctDevSurcharge"
                  label="Payable ICT Dev Surcharge "
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="payableHealthCareSurcharge"
                  label="Payable Healthcare Surcharge "
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="payableEnvProtSurcharge"
                  label="Payable Environment Port Surcharge "
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
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
              <Link href={`/super_admin/commercial/due-penalty-surcharge`}>
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

export default ViewDuePenaltySurcharge;
