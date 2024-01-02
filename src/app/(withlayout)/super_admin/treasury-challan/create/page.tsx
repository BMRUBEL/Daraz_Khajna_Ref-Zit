/* eslint-disable react/no-unescaped-entities */
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
import { Button, Col, Input, Row } from "antd";
import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react";
import * as yup from 'yup';

const CreateDuePenaltySurcharge = () => {

  const [isPaidChecked, setIsPaidChecked] = useState(true);

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
      <UMBreadCrumb pageName="treasury-chlallan" lastName="Insert" />
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
              <FormDatePicker
                    name="treasuryChallanDate"
                    label="Treasury Challan Date:"
                    size="large"
                    required
                  />
              </Col>


              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="tresuryChallanno"
                  label="Treasury Challan No"
                  placeholder="00001"
                  required
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="nameOfCommisionarate"
                  options={sampleOptions}
                  label="Name Of Commisionararte"
                  required
                  placeholder="--Select Name--"
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="vatCode"
                  options={sampleOptions}
                  label="VAT Code"
                  required
                  placeholder="--Select Code--"
                />
              </Col>


              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="vatCodeDetails"
                  label="VAT Code Details "
                  required
                  disable
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="treasuryAmount"
                  label="Treasury Amount "
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

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={6} style={{ marginTop: "20px" }}>
            <input 
              type="checkbox" 
              id="paidCheckbox" 
              checked={isPaidChecked} 
              onChange={(e) => setIsPaidChecked(e.target.checked)} 
            />
            <label htmlFor="paidCheckbox" style={{ marginLeft: "10px", fontWeight: "bold" }}>
              Paid
            </label>
            </Col>
            <Col className="gutter-row" span={6} style={{ marginTop: "10px" }}>

            <Button 
              disabled={!isPaidChecked} 
              style={{
                
                backgroundColor: isPaidChecked ? "#1890ff" : "gray",
                cursor: isPaidChecked ? "pointer" : "not-allowed"
              }}
            >
              Make Payment
            </Button>
            </Col>
            <Col className="gutter-row" span={24} style={{ marginTop: "20px" }}>

            <p style={{ color: "red", marginTop: "30px" }}>
              *** If you click on the paid checkbox, the "Make Payment" button will be enabled. ***
            </p>
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
