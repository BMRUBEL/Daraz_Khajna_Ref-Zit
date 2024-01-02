"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { Col, Row } from "antd";
import Link from "next/link";
import { useGetSingleTreasuryChallanQuery } from "@/redux/api/commercialApi/treasuryChallanApi";
import Loading from "@/app/loading";
import dayjs from "dayjs";



const ViewTreasuryChallan = ({ params }: any) => {


  const id = params.slug as string;
  const { data, isLoading } = useGetSingleTreasuryChallanQuery(id);
  const treasurychallandata = data?.result;

  // console.log(data, "Treasury Data")

  if (!treasurychallandata) {
    return <Loading />;
  }

  //I have destructured the data , And this is coming form API Query
  const {
    transactionDate,
    vatMonthName,
    bankName,
    bankBranchName,
    treasuryChallanDate,
    treasuryChallanNo,
    nameOfCommissionerate,
    tcAcctItemName,
    tcAcctCodeName,
    tcAmount,
    remarks } = treasurychallandata;

  // Format the transactionDate using dayjs
  const formattedTransactionDate = dayjs(transactionDate).format("MMM D, YYYY");
  const formattedTreasuryChallanDate = dayjs(treasuryChallanDate).format("MMM D, YYYY");

  if (isLoading) {
    return <Loading />;
  }


  const onSubmit = () => { };

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Treasury Challan"
        lastName="View"
        link={"/super_admin/commercial/treasury-challan"}
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
                  name=""
                  label="Transaction ID:"
                  value={id}
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
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  name=""
                  label="Transaction Date:"
                  // size="large"
                  value={formattedTransactionDate}
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
                  name=""
                  label="VAT Month:  "
                  value={vatMonthName}
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
                  name=""
                  label="Bank Name/MFS:  "
                  value={bankName}
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
                  name=""
                  label="Bank Branch Name:  "
                  value={bankBranchName}
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
                  name=""
                  label="Treasury Challan Date:"
                  value={formattedTreasuryChallanDate}
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
                  name=""
                  label="Treasury Challan No:"
                  value={treasuryChallanNo}
                  disable
                  required
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
                  name=""
                  label="Name Of Commisionerate: "
                  value={nameOfCommissionerate}
                  disable
                  required
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
                  name=""
                  label="VAT Code Details:"
                  value={tcAcctItemName}

                  disable
                  required
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
                  name=""
                  label="VAT Code"
                  value={tcAcctCodeName}
                  disable
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="number"
                  name=""
                  label="Treasury Amount: "
                  value={tcAmount}
                  disable
                  required
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
                  name=""
                  label="Remarks: "
                  value={remarks}
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
              <Link href={`/super_admin/commercial/treasury-challan`}>
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

export default ViewTreasuryChallan;
