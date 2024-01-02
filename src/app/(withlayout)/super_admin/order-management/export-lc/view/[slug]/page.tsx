"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  EyeOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import { Button, Col, Row, message } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetSingleReceiveQuery } from "@/redux/api/OrderManagementApi/exportLcApi";
import dayjs from "dayjs";


const ExportLcView = ({ params }: any) => {
  // state
  const [hideItem, setHideItem] = useState<boolean>(false);
  const [defValue, setDefValue] = useState({});

  const id = params.slug;
  const { data, error, isLoading, refetch } = useGetSingleReceiveQuery(id);
  const receiveData = data?.result;
  const itemsData = data?.result?.items;
  console.log(itemsData);
  console.log(
    "🚀 ~ file: page.tsx:29 ~ ExportLcView ~ itemsData:",
    itemsData
  );
  useEffect(() => {
    if (data) {
      setDefValue({
        issueMasterId: receiveData?.issueMasterId,
        receiveDate: dayjs(receiveData?.receiveDate).format(
          "MMM D, YYYY"
        ),
        tranSourceTypeName: receiveData?.tranSourceTypeName,
        tranTypeName: receiveData?.tranTypeName,
        tranSubTypeName: receiveData?.tranSubTypeName,
        prodTypeName: receiveData?.prodTypeName,
        supplierNameBn: receiveData?.supplierNameBn,
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
          "MMM D, YYYY"
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
      <UMBreadCrumb pageName="View" />
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
                {hideItem ? (
                  <Button
                    onClick={() => setHideItem(!hideItem)}
                    shape="round"
                    icon={<MinusCircleOutlined />}
                    size="middle"
                    style={{
                      background: "#02BBDB",
                      color: "white",
                    }}
                  />
                ) : (
                  <Button
                    onClick={() => setHideItem(!hideItem)}
                    type="primary"
                    shape="round"
                    icon={<EyeOutlined />}
                    size="middle"
                    style={{
                      background: "#02BBDB",
                      color: "white",
                    }}
                  />
                )}
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
                    name="supplierBinNumber"
                    size="large"
                    label="Export LC ID:"
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="supplierBinNumber"
                    size="large"
                    label="Export LC No:"
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
                    label="LC Date:"
                    size="large"
                    disable
                    style={{
                      color: "black",
                    }}
                  // defaultValue={receiveData?.receiveDate}
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
                    label="Customer:"
                    type="text"
                    name="tranSourceTypeName"
                    size="large"
                    disable
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    size="large"
                    disable
                    name="tranTypeName"
                    label="Company: "
                    style={{
                      color: "black",
                    }}
                  // defaultValue={vatMonth?.name}
                  />
                </Col>
                {!hideItem && (
                  <>
                    {" "}
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
                        name="tranSubTypeName"
                        label="Opening Bank"
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
                        name="prodTypeNameBn"
                        label="Lien Bank"
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
                        name="receiveDate"
                        label="Lien Date:"
                        size="large"
                        disable
                        style={{
                          color: "black",
                        }}
                      // defaultValue={receiveData?.receiveDate}
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
                        name="currencyShortCode"
                        label="Currency"
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
                        name="receiveDate"
                        label="Ship Date:"
                        size="large"
                        disable
                        style={{
                          color: "black",
                        }}
                      // defaultValue={receiveData?.receiveDate}
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
                        name="supplierNameBn"
                        label="LC For"
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
                        name="paymentInstitutionId"
                        label="MaxImportLimit %"
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
                        name="receiveDate"
                        label="Expiry Date:"
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
                    >
                      <FormInput
                        type="text"
                        size="large"
                        disable
                        name="recvAmtWithtaxTransCurr"
                        label="Export LC Amt"
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
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="remarks"
                        size="large"
                        label="Remarks:"
                        disable
                        placeholder="Remarks"
                        style={{
                          color: "black",
                        }}
                      />
                    </Col>
                  </>
                )}
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
                  {/* form child  start */}

                  <div className="relative overflow-x-auto  sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="bg-orange-thead   text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th

                            className="px-2 py-2 w-[8%]"
                          >
                            SL No
                          </th>
                          <th className="px-2 py-2 w-[15%]">
                            Item
                          </th>

                          <th
                            className="px-2 py-2"
                            style={{
                              width: "10%",
                            }}
                          >
                            Qty
                          </th>
                          <th
                            className="px-2 py-2"
                            style={{
                              width: "10%",
                            }}
                          >
                            Rate
                          </th>
                          <th className="px-2 py-2">Amount</th>

                        </tr>
                      </thead>
                      <tbody>
                        {itemsData?.map((item: any, index: number) => (
                          <tr className="p-4"  key={index}>
                            <td className="text-center">{index + 1}</td>

                            <td style={{width: "20%"}}>
                              <FormInput
                                name=""
                                value={item?.itemDisplayName}
                                disable
                              />
                            </td>
                            <td style={{width: "20%"}}>
                            <FormInput
                                name=""
                                value={item?.recvQuantity}
                                disable
                              />
                              </td>
                            <td style={{width: "20%"}}>
                            <FormInput
                                name=""
                                value={item?.itmReceiveRate}
                                disable
                              />
                              </td>
                            <td style={{width: "20%"}}>
                            <FormInput
                                name=""
                                value={item?.totalAmtLocalCurr}
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

              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <Link href={`/super_admin/order-management/export-lc`}>
                    {" "}
                    <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                  </Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ExportLcView;
