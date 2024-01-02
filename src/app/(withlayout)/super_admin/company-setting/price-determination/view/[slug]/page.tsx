/* eslint-disable react/jsx-no-undef */
"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetSingleReceiveQuery } from "@/redux/api/receive/receiveApi";
import dayjs from "dayjs";
import React from "react";

const ReceiveViewPage = ({ params }: any) => {
  // state
  const [hideItem, setHideItem] = useState<boolean>(false);
  const [defValue, setDefValue] = useState({});

  const id = params.slug;
  const { data, error, isLoading, refetch } = useGetSingleReceiveQuery(id);
  const receiveData = data?.result;
  const itemsData = data?.result?.items;
  console.log(itemsData);
  console.log(
    "🚀 ~ file: page.tsx:29 ~ ReceiveViewPage ~ itemsData:",
    itemsData
  );
  useEffect(() => {
    if (data) {
      setDefValue({
        issueMasterId: receiveData?.issueMasterId,
        receiveDate: dayjs(receiveData?.receiveDate).format(
          "MMM D, YYYY hh:mm A"
        ),
        tranSourceTypeName: receiveData?.tranSourceTypeName,
        tranTypeName: receiveData?.tranTypeName,
        tranSubTypeName: receiveData?.tranSubTypeName,
        prodTypeName: receiveData?.prodTypeName,
        isRebateable: receiveData?.isRebateable
          ? "Rebateable"
          : "NON-Rebateable",
        fiscalYearInfo: receiveData?.fiscalYearInfo,
        vatMonthInfo: receiveData?.vatMonthInfo,
        supplierName: receiveData?.supplierName,
        supplierBinNumber: receiveData?.supplierBinNumber,
        challanTypeName: receiveData?.challanTypeName,
        challanNumber: receiveData?.challanNumber,
        challanDate: dayjs(receiveData?.challanDate).format(
          "MMM D, YYYY hh:mm A"
        ),
        paymodeName: receiveData?.paymodeName,
        paymentInstitutionId: receiveData?.paymentInstitutionId,
        payInstrumentNo: receiveData?.paymentInstrumentNo,
        payInstrumentDate: receiveData?.payInstrumentDate,
        // payInstrumentNo: receiveData?.payInstrumentNo,
        totalVatAmount: receiveData?.totalVatAmount,
        currencyShortCode: receiveData?.currencyShortCode,
        recvAmtWithtaxTransCurr: receiveData?.recvAmtWithtaxTransCurr,
        isVdsApplicable: receiveData?.isVdsApplicable
          ? "Required"
          : "Not Required",
        remarks: receiveData?.remarks,
      });
    }
  }, [data, receiveData]);

  // start child dynamic table
  const [rows, setRows] = useState([]);

  const [rowData, setRowData] = useState({});
  const onSubmit = () => { };
  // if (isLoading) {
  //   return <Loading />;
  // }
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb lastName="Home" pageName="Receive" />
      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        <div style={{}}>
          <Form submitHandler={onSubmit} defaultValues={defValue}>
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
              <div
                className="bd-highlight"
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >

              </div>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="issueMasterId"
                    size="large"
                    label="Price Determination No:"
                    required
                    // placeholder="<<</New Item/>>"
                    disable
                    style={{
                      color: "black",
                    }}
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
                    type="text"
                    name="receiveDate"
                    label="Price Determination Name:"
                    size="large"
                    disable
                    style={{
                      color: "black",
                    }}

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
                    label="Item Name:"
                    type="text"
                    name="prodTypeNameBn"
                    size="large"
                    disable
                    style={{
                      color: "black",
                    }}
                  // defaultValue={vatMonth?.name}
                  />
                </Col>


                <>
                  <Col
                    className="gutter-row"
                    span={6}
                    style={{
                      marginBottom: "20px",
                    }}
                  >
                    <FormInput
                      type="text"
                      size="large"
                      disable
                      name="supplierBinNumber"
                      label="Calculation Qty:"
                      style={{
                        color: "black",
                      }}

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
                      type="text"
                      size="large"
                      disable
                      name="challanTypeName"
                      label="IOC Qty:"
                      style={{
                        color: "black",
                      }}
                    // defaultValue={vatMonth?.name}
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
                      type="text"
                      size="large"
                      disable
                      name="challanNumber"
                      label="UOM"
                      style={{
                        color: "black",
                      }}
                    // defaultValue={vatMonth?.name}
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
                      type="text"
                      size="large"
                      disable
                      name="challanDate"
                      label="Date of Submission:"
                      style={{
                        color: "black",
                      }}
                    // defaultValue={vatMonth?.name}
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
                      type="text"
                      size="large"
                      disable
                      name="challanDate"
                      label="Approved by NBR:"
                      style={{
                        color: "black",
                      }}
                    // defaultValue={vatMonth?.name}
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
                      type="text"
                      size="large"
                      disable
                      name="challanDate"
                      label="Effective From:"
                      style={{
                        color: "black",
                      }}
                    // defaultValue={vatMonth?.name}
                    />
                  </Col>
                </>
              </Row>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <div className="grid grid-rows-2 grid-flow-col gap 4">
                  <div style={{}}>
                    <p className="text-lg font-medium">Item Info </p>
                    {/* Info Child Start */}
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
                      <Row
                        style={{
                          padding: "0px 0px",
                        }}
                        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                      >
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

                                  <th className="px-2 py-2" style={{
                                    width: "10%",
                                  }} >
                                    Item Name
                                  </th>

                                  <th
                                    className="px-2 py-2"
                                    style={{
                                      width: "10%",
                                    }}
                                  >
                                    Cons With Wastage Qty
                                  </th>
                                  <th
                                    className="px-2 py-2"
                                    style={{
                                      width: "10%",
                                    }}
                                  >
                                    Wastage Qty
                                  </th>
                                  <th
                                    className="px-2 py-2"
                                    style={{
                                      width: "10%",
                                    }}
                                  >
                                    IOC Unit Cons
                                  </th>

                                  <th className="px-2 py-2" >
                                    UOM
                                  </th>
                                  <th className="px-2 py-2">Take (TK) </th>
                                  <th className="px-2 py-2">Total Cost (Tk)</th>
                                  <th className="px-2 py-2">IOC Unit Cost (TK)</th>

                                </tr>
                              </thead>
                              <tbody>
                                {itemsData?.map((item: any, index: number) => (
                                  <tr key={index}>

                                    <td>
                                      <FormInput

                                        name=""
                                        value={item?.itemDisplayName}
                                        disable
                                      />
                                    </td>

                                    <td>
                                      <FormInput

                                        name=""
                                        value={item?.recvQuantity}
                                        disable
                                      />
                                    </td>
                                    <td>
                                      <FormInput

                                        name=""
                                        value={item?.recvQuantity}
                                        disable
                                      />
                                    </td>
                                    <td>
                                      <FormInput

                                        name=""
                                        value={item?.recvQuantity}
                                        disable
                                      />
                                    </td>
                                    <td>
                                      <FormInput

                                        name=""
                                        value={item?.uomShortCode}
                                        disable
                                      />
                                    </td>
                                    <td>
                                      <FormInput

                                        name=""
                                        value={item?.itmReceiveRate}
                                        disable
                                      />
                                    </td>

                                    <td><FormInput

                                      name=""
                                      value={item?.itemValueWotaxTransCurr}
                                      disable
                                    /></td>
                                    <td>
                                      <FormInput

                                        name=""
                                        value={item?.itemAssessableValueTransCurr}
                                        disable
                                      />
                                    </td>

                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {/* Item Info form child end  */}
                        </Col>
                      </Row>
                    </div>
                    {/* End Info child*/}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div style={{}}>
                      <p className="text-lg font-medium">Input Service</p>
                      {/* Info Child Start */}
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
                        <Row
                          style={{
                            padding: "0px 0px",
                          }}
                          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        >
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

                                    <th className="px-2 py-2">
                                      Input Service
                                    </th>
                                    <th className="px-2 py-2">Amount(TK)</th>
                                    <th className="px-2 py-2">IOC Unit Amount(TK)</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  {itemsData?.map((item: any, index: number) => (
                                    <tr key={index}>

                                      <td>
                                        <FormInput

                                          name=""
                                          value={item?.itemDisplayName}
                                          disable
                                        />
                                      </td>
                                      <td>

                                        <FormInput

                                          name=""
                                          value={item?.itemAssessableValueTransCurr}
                                          disable
                                        />
                                      </td>
                                      <td>
                                        <FormInput

                                          name=""
                                          value={item?.itemAssessableValueTransCurr}
                                          disable
                                        />
                                      </td>

                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {/* form child end  */}
                          </Col>
                        </Row>


                      </div>
                      {/* End Info child*/}
                    </div>
                    <div style={{}}>
                      <p className="text-lg font-medium">Value Added Service</p>
                      {/* Info Child Start */}
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
                        <Row
                          style={{
                            padding: "0px 0px",
                          }}
                          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                        >
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
                                <thead className="bg-orange-thead text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>

                                    <th className="px-2 py-2">
                                      Value Added Service
                                    </th>
                                    <th className="px-2 py-2">Amount(TK)</th>
                                    <th className="px-2 py-2">IOC Unit Amount(TK)</th>

                                  </tr>
                                </thead>
                                <tbody>
                                  {itemsData?.map((item: any, index: number) => (
                                    <tr key={index}>

                                      <td>
                                        <FormInput

                                          name=""
                                          value={item?.vatPaymentMethodName}
                                          disable
                                        />
                                      </td>
                                      <td>
                                        <FormInput

                                          name=""
                                          value={item?.itmReceiveRate}
                                          disable
                                        />
                                      </td>
                                      <td>
                                        <FormInput

                                          name=""
                                          value={item?.itemValueWotaxTransCurr}
                                          disable
                                        />
                                      </td>

                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {/* form child end  */}
                          </Col>
                        </Row>


                      </div>
                      {/* End Info child*/}
                    </div>
                  </div>
                </div>
              </div>
              {/* Summary Table */}
              <div style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "35px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
                overflowX: "auto",  // Enable horizontal scrolling

              }} className="flex flex-col space-y-20">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs md:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                      <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs md:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">Calculation</th>
                      <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs md:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">IOC</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {itemsData?.map((item: any, index: number) => (
                      <React.Fragment key={index}>
                        {/* First set of rows */}
                        <tr>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">Total Closing RM (TK)</td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">{item?.totalAmtTransCurr}</td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">{item?.sdAmount}</td>
                        </tr>
                        <tr>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">Total Overhead Cost (TK)</td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">{item?.totalAmtLocalCurr}</td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">{item?.sdAmount}</td>
                        </tr>
                        <tr>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">Total Monthly Cost (TK)</td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">{item?.totalAmtLocalCurr}</td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">{item?.sdAmount}</td>
                        </tr>
                        {/* Separator Row after every three rows */}
                        <tr>
                          <td colSpan={3} className="border-t"></td>
                        </tr>
                        {/* Second set of rows */}
                        <tr>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">Total Cost-Calculation (TK)</td>
                          <td className="px-6 py-4 whitespace-nowrap"></td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">{item?.totalAmtLocalCurr}</td>
                        </tr>
                        <tr>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">Total Cost-IOC(TK)</td>
                          <td className="px-6 py-4 whitespace-nowrap"></td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">{item?.itemValueWotaxTransCurr}</td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </tbody>

                </table>
                <div className="mt-4">
                  <FormInput
                    type="text"
                    name="remarks"
                    size="large"
                    label="Remarks:"
                    required

                    disable
                  />
                </div>

              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/company-setting/price-determination`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>

            </div>
          </Form>
        </div>
      </div >
    </div >
  );
};

export default ReceiveViewPage;
