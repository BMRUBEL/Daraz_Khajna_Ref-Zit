/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { Col, Row } from "antd";

import Link from "next/link";
import { BaseSyntheticEvent } from "react";

import { useEffect, useState } from "react";
import DRZvdsForPurchaserTableInForm from "@/components/ui/DRZvdsForPurchaserTableinForm";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import Loading from "@/app/loading";
import { useGetSingleVdsPurchaseQuery } from "@/redux/api/commercialApi/vdsPurchaserApi";

import dayjs from "dayjs";
import DarazCommonPaymentButton from "@/components/ui/DarazCommonPaymentButton";
import Checkbox from "antd/es/checkbox/Checkbox";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";

const ViewVdsPurchaser = ({ params }: any) => {
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data, isLoading } = useGetSingleVdsPurchaseQuery(id);

  const purchaserData = data?.result;
  const childData = data?.result?.items;

  console.log("Api single data", purchaserData);

  //Validate Treasury Date
  const treasuryChallanDateValue = purchaserData?.treasuryChallanDate;
  const isValidDate = dayjs(treasuryChallanDateValue).isValid();

  //Validate Treasury Date
  const treasuryChallanNumber = purchaserData?.treasuryChallanNo;
  const isValidChallanNo =
    treasuryChallanNumber !== null && treasuryChallanNumber !== undefined;

  //Validate Transaction Date
  const transactionDateValue = purchaserData?.transactionDate;
  const isValidTranDate = dayjs(transactionDateValue).isValid();

  //Validate Publish Date
  const publishDateValue = purchaserData?.transactionDate;
  const isValidPublishDate = dayjs(publishDateValue).isValid();

  useEffect(() => {
    if (data) {
      setDefaultValue({
        id: purchaserData?.id,
        customerId: purchaserData?.customerId,
        transactionDate: isValidTranDate
          ? dayjs(purchaserData?.transactionDate).format("DD-MM-YYYY")
          : "--",
        vatMonthInfo: purchaserData?.vatMonthInfo,
        certificateNo: purchaserData?.certificateNo,
        treasuryChallanNo: isValidChallanNo ? treasuryChallanNumber : "--",
        treasuryChallanDate: isValidDate
          ? dayjs(treasuryChallanDateValue).format("DD-MM-YYYY")
          : "--",
        publishedDate: isValidPublishDate
          ? dayjs(purchaserData?.publishedDate).format("DD-MM-YYYY")
          : "--",
        supplierName: purchaserData?.supplierName,
        commissionerateName: purchaserData?.commissionerateName,
        vatDepositeCode: purchaserData?.vatDepositeCode,
        totalPurchaseAmount: purchaserData?.totalPurchaseAmount,
        totalVatAmount: purchaserData?.totalVatAmount,
        paidAmount: purchaserData?.paidAmount,
        totalDeductedVatAmount: purchaserData?.totalDeductedVatAmount,
        remark: purchaserData?.remark,
        isPaid: purchaserData?.isPaid,
      });
    }
  }, [
    data,
    purchaserData,
    isValidTranDate,
    isValidPublishDate,
    isValidChallanNo,
    isValidDate,
    treasuryChallanDateValue,
    treasuryChallanNumber,
  ]);

  const onSubmit = async () => {};

  // console.log(vatMonthOptions, "options");
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="VDS Purchase"
        lastName="View"
        link={"/super_admin/commercial/vds-for-purchaser"}
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
          <div style={{ padding: "0px", marginTop: "12px", color: "black" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="id"
                  label="VDS Purchaser ID"
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
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  name="transactionDate"
                  label="Transaction Date:"
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
                  name="supplierName"
                  label="Supplier Name"
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
                  name="publishedDate"
                  label="Published Date"
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
                  name="treasuryChallanNo"
                  label="Treasury Challan No"
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
                  name="treasuryChallanDate"
                  label="Treasury Challan Date"
                  required
                  disable
                  placeholder="11-07-23"
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
                  name="totalPurchaseAmount"
                  label="Total Purchase Amount"
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
                  label="Total Deducted VAT Amount"
                  required
                  disable
                />
              </Col>
              <Col className="gutter-row" span={6} style={{}}>
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="paidAmount"
                  label="Paid Amount"
                  required
                  disable
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginTop: "20px" }}
              >
                <Checkbox checked={purchaserData?.isPaid} disabled>
                  Is Paid
                </Checkbox>
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                  type="text"
                  name="remark"
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
                <div className="relative overflow-x-auto  sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-orange-thead text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th className="px-2 py-2">Challan No</th>
                        <th className="px-2 py-2 ">Challan Date</th>
                        <th className="px-2 py-2 ">Receive Amount</th>
                        <th className="px-2 py-2">VAT Amount</th>
                        <th className="px-2 py-2">Deducted VAT Amount </th>
                      </tr>
                    </thead>
                    <tbody>
                      {childData?.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <FormInput
                              style={{ textAlign: "left", color: "black" }}
                              name=""
                              value={item?.challanNo}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ textAlign: "left", color: "black" }}
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
                              style={{ textAlign: "left", color: "black" }}
                              name=""
                              value={item?.receiveAmount}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ textAlign: "left", color: "black" }}
                              name=""
                              value={item?.vatAmount}
                              disable
                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ textAlign: "left", color: "black" }}
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
                <Link href={`/super_admin/commercial/vds-for-purchaser`}>
                  <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                </Link>

                <DarazCommonPaymentButton
                  to={`/super_admin/commercial/vds-payment/create`}
                >
                  Pay Now
                </DarazCommonPaymentButton>
                <DarazCommonAddButton
                  to={`/super_admin/commercial/vds-for-purchaser/create`}
                >
                  Create New
                </DarazCommonAddButton>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewVdsPurchaser;
