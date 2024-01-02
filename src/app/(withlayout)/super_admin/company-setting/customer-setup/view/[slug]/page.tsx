/* eslint-disable react-hooks/rules-of-hooks */
"use client";


import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import Loading from "@/app/loading";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import {
  useGetSingleCustomerSetupQuery
} from "@/redux/api/companyApi/customerInfoApi";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";




const ViewCustomerPage = ({ params }: any) => {

  // state

  const [defValue, setDefValue] = useState({});

  const id = params.slug;
  const { data, isLoading } = useGetSingleCustomerSetupQuery(id);
  const customerData = data?.result;
  const bankDetailsData = data?.result?.bankDetails;
  const addressesData = data?.result?.addresses;
  const contactInfoData = data?.result?.contactInfos;


  console.log("Address data", addressesData);
  console.log("Bank Data", bankDetailsData);





  useEffect(() => {
    if (data) {

      setDefValue({
        //Master
        companyId: customerData?.companyId,
        vatRegId: customerData?.vatRegId,
        customerTypeId: customerData?.customerTypeId,
        customerName: customerData?.customerName,
        customerNameBn: customerData?.customerNameBn,
        customerBinNumber: customerData?.customerBinNumber,
        customerBinNumberBn: customerData?.customerBinNumberBn,
        customerPhoneNumber: customerData?.customerPhoneNumber,
        registrationStatus: customerData?.registrationStatus ? true : false,
        vatRegTypeName: customerData?.vatRegTypeName,
        active: customerData?.active ? true : false,
        emailAddress: customerData?.emailAddress,
        emailVerifiedAt: customerData?.emailVerifiedAt,
        countryId: customerData?.countryId,
        createdAt: customerData?.createdAt,
        updatedAt: customerData?.updatedAt,
        createdBy: customerData?.createdBy,
        updatedBy: customerData?.updatedBy,
        contactPerson: contactInfoData?.contactPerson,
      });


    }
  }, [data, customerData, contactInfoData]);


  // submit handler
  const onSubmit = async () => {

  };

  if (isLoading) {
    return <Loading />;
  }
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
          <Form
            submitHandler={onSubmit}
            defaultValues={defValue}
          >
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
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <FormInput
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"
                    name="vatRegTypeName"
                    label="VAT Regi Type: "
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
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"
                    name="customerTypeId"
                    type="name"
                    label="Customer Type: "
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="customerName"
                    size="large"
                    label="Customer Name:"
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="customerNameBn"
                    size="large"
                    label="Customer Name Bn:"
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="customerBinNumber"
                    size="large"
                    label="BIN/NID/Email :"
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="customerBinNumberBn"
                    size="large"
                    label="BIN/NID/Email BN:"
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="customerPhoneNumber"
                    size="large"
                    label="Phone Number:"
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
                  <FormInput
                    type="text"
                    name="emailAddress"
                    size="large"
                    label="Email:"
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="contactPerson"
                    size="large"
                    label="Contact Person Name:"
                    disable
                  />
                </Col>
              </Row>
            </div>

            {/* Bank Info child  start */}
            {bankDetailsData && bankDetailsData.length > 0 && (
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
                    <p className="text-xl font-semibold pb-4">Bank Info</p>
                    <div className="relative overflow-x-auto  sm:rounded-lg">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="bg-orange-thead   text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            {/* <th className="px-2 py-2">
                <input
                  type="checkbox"
                  checked={selectedRows.length === rows.length}
                  onChange={toggleSelectAll}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
              </th> */}
                            <th className="px-2 py-2">Bank</th>
                            <th className="px-2 py-2 ">Bank Branch</th>
                            <th className="px-2 py-2 ">Bank Account Type </th>
                            <th className="px-2 py-2">Customer Account Number</th>
                            <th className="px-2 py-2">
                              Customer Account Number Bn{" "}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {bankDetailsData && bankDetailsData.map((item: any, index: number) => (
                            <tr key={index}>


                              <td>
                                <FormInput

                                  name=""
                                  value={item?.bankName}
                                  disable
                                />
                              </td>
                              <td>

                                <FormInput

                                  name=""
                                  value={item?.bankBranchName}
                                  disable
                                />
                              </td>
                              <td>

                                <FormInput

                                  name=""
                                  value={item?.bankAccountTypeName}
                                  disable
                                />
                              </td>
                              <td>

                                <FormInput

                                  name=""
                                  value={item?.customerAccountNumber}
                                  disable
                                />
                              </td>
                              <td>

                                <FormInput

                                  name=""
                                  value={item?.customerAccountNumberBn}
                                  disable
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Col>
                  {/* Bank Info child end  */}
                </Row>
              </div>
            )}


            {/* Bank Address child  start */}
            {addressesData && addressesData.length > 0 && (
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
                    <p className="text-xl font-semibold pb-4">Address Details</p>
                    <div className="relative overflow-x-auto  sm:rounded-lg">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="bg-orange-thead  text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>

                            <th className="px-2 py-2">Type Of Address</th>
                            <th className="px-2 py-2">Country</th>
                            <th className="px-2 py-2">Division</th>
                            <th className="px-2 py-2">District</th>
                            <th className="px-2 py-2">Upazila </th>
                            <th className="px-2 py-2">Police Station </th>
                            {/* <th className="px-2 py-2">Postal Code</th> */}
                            <th className="px-2 py-2 ">Road </th>
                            <th className="px-2 py-2 ">Holding</th>
                          </tr>
                        </thead>
                        <tbody>
                          {addressesData && addressesData.map((item: any, index: number) => (
                            <tr key={index}>

                              <td>
                                <FormInput
                                  name=""
                                  value={item?.addressTypeName}
                                  disable
                                />
                              </td>
                              <td>
                                <FormInput
                                  name=""
                                  value={item?.countryName}
                                  disable
                                />
                              </td>

                              <td>
                                <FormInput
                                  name=""
                                  value={item?.districtName}
                                  disable
                                />
                              </td>
                              <td>
                                <FormInput
                                  name=""
                                  value={item?.districtName}
                                  disable
                                />
                              </td>
                              <td>
                                <FormInput
                                  name=""
                                  value={item?.upazillaName}
                                  disable
                                />

                              </td>
                              <td>
                                <FormInput
                                  name=""
                                  value={item?.policeStationName}
                                  disable
                                />

                              </td>

                              <td>
                                <FormInput
                                  name=""
                                  value={item?.roadNo}
                                  disable
                                />
                              </td>
                              <td>
                                <FormInput
                                  name=""
                                  value={item?.holdingNo}
                                  disable
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </Col>
                  {/* Bank Address child end  */}
                </Row>
              </div>
            )}


            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/company-setting/customer-setup`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
              <Link href={`/super_admin/company-setting/customer-setup/edit/${id}`}>
                <DarazCommonButton>Edit</DarazCommonButton>
              </Link>

            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ViewCustomerPage;
