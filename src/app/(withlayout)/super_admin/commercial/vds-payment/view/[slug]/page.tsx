"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { Col, Row, Table } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { BaseSyntheticEvent } from "react";
import { useEffect, useState } from "react";
import { useGetSingleVdsPaymentQuery } from "@/redux/api/commercialApi/vdsPaymentApi";
import dayjs from "dayjs";

const VdsPymentView = ({ params }: any) => {

  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;
  const { data, isLoading } = useGetSingleVdsPaymentQuery(id);

  const paymentData = data?.result;
  const childData = data?.result?.items;

  useEffect(() => {
    setDefaultValue({
      id: paymentData?.id,
      branchId: paymentData?.branchId,
      storeId: paymentData?.storeId,
      storeName: paymentData?.storeName,
      transactionDate: dayjs(paymentData?.transactionDate).format("DD-MM-YYYY"),
      vatMontId: paymentData?.vatMontId,
      vatMonth: paymentData?.vatMonth,
      tcMasterId: paymentData?.tcMasterId,
      bankId: paymentData?.bankId,
      bankName: paymentData?.bankName,
      bankBrunchId: paymentData?.bankBrunchId,
      bankBrunchName: paymentData?.bankBrunchName,
      commissionerateId: paymentData?.commissionerateId,
      commissionerateName: paymentData?.commissionerateName,
      tcAcctCodeId: paymentData?.tcAcctCodeId,
      vatCode: paymentData?.vatCode,
      tcAcctCodeItemId: paymentData?.tcAcctCodeItemId,
      vatCodeDetails: paymentData?.vatCodeDetails,
      treasuryChallanNo: paymentData?.treasuryChallanNo,
      treasuryChallanDate: dayjs(paymentData?.treasuryChallanDate).format("DD-MM-YYYY"),
      totalPayableVatAmt: paymentData?.totalPayableVatAmt,
      totalFineAmt: paymentData?.totalFineAmt,
      totalPayableAmt: paymentData?.totalPayableAmt,
      remarks: paymentData?.remarks,
    });
  }, [data, paymentData]);


  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb pageName="VDS For Payment" lastName="View" />
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
          defaultValues={defaultValue}
          submitHandler={function (
            data: any,
            event?: BaseSyntheticEvent<object, any, any> | undefined
          ): unknown {
            throw new Error("Function not implemented.");
          }}
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
                  label="VDS Payment ID"
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
                  // size="small"
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
                  name="vatMonth"
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
                  name="bankName"
                  label="Bank/MFS Name  "
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
                  name="bankBrunchName"
                  label="Bank Branch Name  "
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
                  name="treasuryChallanDate"
                  label="Treasury Challan Date "
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
                  name="treasuryChallanNo"
                  label="Treasury Challan No."
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
                  name="commissionerateName"
                  label="Name of Commission Rate"
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
                  name="vatCode"
                  label="Vat Code"
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
                  name="vatCodeDetails"
                  label="Vat Code Details"
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
                  name="totalPayableVatAmt"
                  label="Total Payable VAT Amount"
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
                  name="totalFineAmt"
                  label="Total Fine Amount"
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
                  name="totalPayableAmt"
                  label="Total Treasury Amount"
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
              marginBottom: "10px",
              padding: "20px",
              marginTop: "11px",
              backgroundColor: "#fff6f6e6",
              borderRadius: "10px",
              border: "1px solid #e9e8e8",
              boxSizing: "border-box",
            }}
          >
            <Row style={{}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {" "}
              <Col
                className="gutter-row"
                span={24}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                  <div className="relative overflow-x-auto  sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-orange-thead   text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                       
                        <th className="px-2 py-2">SL</th>
                        <th className="px-2 py-2">Certificate No</th>
                        <th className="px-2 py-2 ">Publish Date</th>
                        <th className="px-2 py-2 ">Payable Vat Amount </th>
                        <th className="px-2 py-2">Fine Amount</th>
                        <th className="px-2 py-2">Total Payble Tc Amount(C=a+b) </th>
                      </tr>
                    </thead>
                    <tbody>
                      {childData?.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            {index+1}
                          </td>
                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left", color: "black" }}
                              name=""
                              value={item?.certificateNo}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left", color: "black" }}
                              name=""
                              value={
                                item && item.publishedDate
                                  ? dayjs(item.publishedDate).format("DD-MM-YYYY")
                                  : ""
                              }
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left", color: "black" }}
                              name=""
                              value={item?.payableVatAmt}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left", color: "black" }}
                              name=""
                              value={item?.fineAmt}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left", color: "black" }}
                              name=""
                              value={item?.payableAmt}
                              disable
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>
            </Row>

            <div
              style={{
                // display: "flex",
                alignItems: "right",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/commercial/vds-payment`}>
                  {" "}
                  <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                </Link>
                
                <DarazCommonButton>Save</DarazCommonButton>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default VdsPymentView;
