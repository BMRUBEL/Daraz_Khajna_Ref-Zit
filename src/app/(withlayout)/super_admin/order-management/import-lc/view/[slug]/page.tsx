"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Input, Row } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useGetSingleImportLcInformationQuery } from "@/redux/api/OrderManagementApi/importLcInformationApi";
import Loading from "@/app/loading";
import dayjs from "dayjs";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import FormCheckbox from "@/components/Forms/DarazCheckBox";




const ViewImportLC = ({ params }: any) => {
  const [defaultValue, setDefaultValue] = useState({});
  const id = params.slug as string;

  const { data, isLoading } = useGetSingleImportLcInformationQuery(id);

  const otherMasterData = data?.result;

  const childData = data?.result?.items;


  useEffect(() => {
    setDefaultValue({
      id: otherMasterData?.id,
      transactionDate: dayjs(otherMasterData?.transactionDate).format(
        "MMM D, YYYY"
      ),
      vatMonth: otherMasterData?.vatMonth,
      adjustmentType: otherMasterData?.adjustmentType,
      totalBilAmount: otherMasterData?.totalBilAmount,
      totalVatAmount: otherMasterData?.totalVatAmount,
      totalAdjustableAmount: otherMasterData?.totalAdjustableAmount,
      remark: otherMasterData?.remark,

    });
  }, [otherMasterData]);

  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }

  const options = [
    { value: "", label: "" },

    // Add more options as needed
  ];



  const onSubmit = () => { };

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Import LC Information"
        lastName="View"
        link={`/super_admin/order-management/import-lc`}
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
          {childData && childData.length > 0 ? (
            <>
              {/*Master Data*/}
              <div style={{ padding: "0px", marginTop: "12px" }}>
                {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    className="gutter-row"
                    span={6}
                    style={{ marginBottom: "20px" }}
                  >
                    <FormInput
                      style={{ width: "100%", textAlign: "left", color: "black" }}
                      type="text"
                      name="id"
                      label="Others Adjustment ID"

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
                      size="large"
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
                      name="vatMonth"
                      label="VAT Month  "
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
                      name="adjustmentType"
                      label="Adjustment Type"
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
                      name="totalBilAmount"
                      label="Total Bill Amount"
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
                      type="number"
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
                      type="number"
                      name="totalAdjustableAmount"
                      label="Total Rebate Amount"
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
                      name="remark"
                      label="Remarks "
                      disable
                    />
                  </Col>
                </Row> */}

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    className="gutter-row"
                    span={6}
                    style={{ marginBottom: "20px", textAlign: "left" }}
                  >
                    <FormInput
                      style={{ width: "100%", textAlign: "left" }}
                      type="number"
                      name=""
                      label="BB/Import LC ID"
                      placeholder="<<</New/>>>"
                      required
                      disable
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
                      label="Application Date:"
                    // size="large"

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
                    <FormRadioSelect
                      label=""
                      name="active"
                      options={[
                        { value: true, label: "Applied" },
                        { value: false, label: "Opened" },
                      ]}
                      disable
                    />

                  </Col>

                  <Col
                    className="gutter-row"
                    span={6}
                    style={{ marginBottom: "20px" }}
                  >
                    <FormInput
                      style={{ width: "100%", textAlign: "left" }}
                      name="adjustmentId"
                      // options={adjustmentOptions}
                      label="BB/Import LC No"
                      required
                      disable
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
                      label="BB/Import LC Date:"

                    />
                  </Col>


                  <Col
                    className="gutter-row"
                    span={6}
                    style={{ marginBottom: "20px" }}
                  >
                    <FormInput
                      style={{ width: "100%", textAlign: "left" }}
                      type="number"
                      name="totalBilAmount"
                      label="BB/Import LC Amount"
                      // value={`${amount(totalBilAmount)}`}
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
                      name="adjustmentId"
                      label="Opening Bank"
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
                      name="adjustmentId"
                      label="BBLC Currency"
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
                      name="adjustmentId"
                      label="Purpose"
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
                      label="LC Expiry Date:"
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
                      name="adjustmentId"
                      label="Advising Bank"
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
                      name="adjustmentId"
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
                      name="adjustmentId"
                      label="Export LC No"
                      required
                      disable
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
                      label="Export LC Date:"
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
                      style={{ width: "100%", textAlign: "left" }}
                      type="number"
                      name="totalVatAmount"
                      label="UP/UD No"
                      // value={`${amount(totalVatAmount)}`}
                      required
                      disable
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
                      label="UP/IP Date:"
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
                      style={{ width: "100%", textAlign: "left" }}
                      type="text"
                      name="remarks"
                      label="Remarks "
                      disable
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
                    <FormCheckbox
                      label="Is BBLC"
                      name="isVirtualLocation"
                      options={options}
                      disable={true}
                      checked={true}
                    />
                  </Col>

                </Row>
              </div>
              {/*Child Data*/}

              {childData.length > 0 && (
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
                      {/* <p className="text-xl font-semibold pb-4">Child Data</p> */}
                      <div className="relative overflow-x-auto  sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="bg-orange-thead   text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>

                              <th className="px-2 py-2"
                                style={{
                                  width: "15%",
                                  textAlign: "center"
                                }}>Item Name</th>

                              <th className="px-2 py-2"
                                style={{
                                  width: "15%",
                                  textAlign: "center"
                                }}

                              >Receive Qty </th>
                              <th className="px-2 py-2"
                                style={{
                                  width: "15%",
                                  textAlign: "center"
                                }}>Rate</th>
                              <th className="px-2 py-2"
                                style={{
                                  width: "15%",
                                  textAlign: "center"
                                }}>
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>

                            {childData?.map((item: any, index: number) => (
                              <tr key={index}>
                                <td>
                                  <FormInput

                                    name=""
                                    value={item?.otherAdjustDescription}
                                    disable
                                  />
                                </td>

                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.billAmount}
                                    disable
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.vatAmount}
                                    disable
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.vatAdjustableAmount}
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
                      <Link href={`/super_admin/order-management/import-lc`}>
                        {" "}
                        <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                      </Link>


                    </div>
                  </div>
                </div>
              )}


            </>
          ) : (
            <>
              {/*Master Data*/}
              < div style={{ padding: "0px", marginTop: "12px" }}>
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
                      label="Others Adjustment ID"

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
                      size="large"
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
                      name="vatMonth"
                      label="VAT Month  "
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
                      name="adjustmentType"
                      label="Adjustment Type"
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
                      name="totalBilAmount"
                      label="Total Bill Amount"
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
                      type="number"
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
                      type="number"
                      name="totalAdjustableAmount"
                      label="Total Rebate Amount"
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
                      name="remark"
                      label="Remarks "
                      disable
                    />
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Form>
      </div >
    </div >
  );
};

export default ViewImportLC;
