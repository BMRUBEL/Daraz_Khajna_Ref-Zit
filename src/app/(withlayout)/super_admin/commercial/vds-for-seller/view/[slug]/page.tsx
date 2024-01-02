"use client";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { Button, Col, Row, Table, message } from "antd";
import Link from "next/link";
import { BaseSyntheticEvent } from "react";
import * as yup from "yup";
import { useEffect, useState } from "react";

import { TableRowSelection } from "antd/es/table/interface";
import { useGetSingleVdsSellerQuery } from "@/redux/api/commercialApi/vdsSellerApi";
import DRZvdsForSellerTable from "@/components/ui/DRZvdsForSellerTable";
import Loading from "@/app/loading";
import dayjs from "dayjs";

const CreateVdsForSeller = ({ params }: any) => {
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data, isLoading } = useGetSingleVdsSellerQuery(id);

  const sellerData = data?.result;
  const childData = data?.result?.items;

  console.log("Api single data", data);

  useEffect(() => {
    if (data) {
      setDefaultValue({
        id: sellerData?.id,
        customerId: sellerData?.customerId,
        transactionDate: dayjs(sellerData?.transactionDate).format(
          "DD-MM-YYYY"
        ),
        vatMonthInfo: sellerData?.vatMonthInfo,
        certificateNo: sellerData?.certificateNo,
        certificateDate: dayjs(sellerData?.certificateDate).format(
          "DD-MM-YYYY"
        ),
        customerName: sellerData?.customerName,
        commissionerateName: sellerData?.commissionerateName,
        vatDepositeCode: sellerData?.vatDepositeCode,
        totalSellsAmount: sellerData?.totalSellsAmount,
        totalVatAmount: sellerData?.totalVatAmount,
        totalDeductedVatAmount: sellerData?.totalDeductedVatAmount,
        remarks: sellerData?.remarks,
      });
    }
  }, [data, sellerData]);

  const onSubmit = async () => {};

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="VDS Seller"
        lastName="View"
        link={"/super_admin/commercial/vds-for-seller"}
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
        <Form submitHandler={onSubmit} defaultValues={defaultValue}>
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="number"
                  name="id"
                  label="VDS Seller ID"
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
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  name="vatMonthInfo"
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
                  name="certificateNo"
                  label="Certificate No"
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
                  name="certificateDate"
                  label="Certificate Date"
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
                  type="text"
                  name="customerName"
                  label="Customer Name"
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
                  name="commissionerateName"
                  label="Commisionerate Name"
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
                  name="vatDepositeCode"
                  label="VAT Deposit Account Code"
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
                  name="totalSellsAmount"
                  label="Total Sells Amount"
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
                  name="totalVatAmount"
                  label="Total VAT Amount"
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
                  name="totalDeductedVatAmount"
                  label="Deducted VAT Amount"
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
                {/* <p className="text-xl font-semibold pb-4">Bank Info</p> */}
                <div className="relative overflow-x-auto sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-orange-thead text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-2 py-2">Challan No</th>
                        <th className="px-2 py-2 ">Challan Date</th>
                        <th className="px-2 py-2 ">Sells Amount </th>
                        <th className="px-2 py-2">VAT Amount</th>
                        <th className="px-2 py-2">Deducted VAT Amount </th>
                      </tr>
                    </thead>
                    <tbody>
                      {childData?.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <FormInput
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "black",
                              }}
                              name=""
                              value={item?.challanNo}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "black",
                              }}
                              name=""
                              value={
                                item && item.challanDate
                                  ? dayjs(item.challanDate).format("DD-MM-YYYY")
                                  : ""
                              }
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "black",
                              }}
                              name=""
                              value={item?.sellsAmount}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "black",
                              }}
                              name=""
                              value={item?.vatAmount}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{
                                width: "100%",
                                textAlign: "left",
                                color: "black",
                              }}
                              name=""
                              value={item?.deductedVatAmount}
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
                <Link href={`/super_admin/commercial/vds-for-seller`}>
                  {" "}
                  <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                </Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateVdsForSeller;
