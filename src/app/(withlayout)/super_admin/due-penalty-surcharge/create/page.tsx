"use client";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Input, Row } from "antd";
import Link from "next/link";
import { BaseSyntheticEvent } from "react";
import * as yup from 'yup';

const CreateDuePenaltySurcharge = () => {

  const sampleOptions = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" },
  ];

  const formSchema = yup.object().shape({
    transactionName: yup.string().required('Transaction Name is required'),
    transactionNameBn: yup.string().required('Transaction Name BN is required'),
    // ... any other validations
  });

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb pageName="due-penalty-surcharge" lastName="Insert" />
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
        <Form resolver={yupResolver(formSchema)} submitHandler={function (data: any, event?: BaseSyntheticEvent<object, any, any> | undefined): unknown {
          throw new Error("Function not implemented.");
        } }>
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>


            <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="transactionID"
                  label="Transaction ID:"
                  value={"***</NEW/>***"}
                  disable
                  placeholder="***</NEW/>***"
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
                  <FormDatePicker
                    name="transactiondate"
                    label="Transaction Date:"
                    size="large"
                    required
                  />
                </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="VATMonth"
                  options={sampleOptions}
                  label="VAT Month  "
                  placeholder="--Select VAT Month--"
                  required
                />
              </Col>
              
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="InterestonUnpaidVAT"
                  label="Interest on Unpaid VAT"
                  placeholder="Interest on Unpaid VAT"
                />
              </Col>


              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="InterestUnpaidVATSD"
                  label="Interest ON Unpaid VAT SD"
                  placeholder="Interest ON Unpaid VAT SD"
                  required
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="panaltyamount"
                  label="Panalty Amount "
                  placeholder="Panalty Amount"
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="payableExciseDuty"
                  label="Payable Excise Duty "
                  placeholder="Payable Excise Duty"
                />
              </Col>


              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="payableDevSurcharge"
                  label="Payabl Dev Surcharge "
                  placeholder="Payabl Dev Surcharge"
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="payableICTDevSurcharge"
                  label="Payabl ICT Dev Surcharge "
                  placeholder="Payabl ICT Dev Surcharge"
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="payablehealthcareSurcharge"
                  label="Payabl Health Care Surcharge "
                  placeholder="Payabl Health Care Surcharge"
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="payableEnvironmentSurcharge"
                  label="Payabl Environment Port Surcharge "
                  placeholder="Payabl Environment Port Surcharge"
                />
              </Col>


              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="remarks"
                  label="Remarks "
                  placeholder="Remarks...."
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
              <Link href={`/super_admin/due-penalty-surcharge`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
              <DarazCommonRedirectButton to="/super_admin/due-penalty-surcharge/create">Reset</DarazCommonRedirectButton>
              <DarazCommonButton>Save</DarazCommonButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateDuePenaltySurcharge;
