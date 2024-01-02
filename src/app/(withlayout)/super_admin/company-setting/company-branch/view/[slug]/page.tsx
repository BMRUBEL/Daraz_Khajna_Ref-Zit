/* eslint-disable react-hooks/rules-of-hooks */
"use client";


import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import Loading from "@/app/loading";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import {
  useGetSingleCompanyBranchInfoQuery
} from "@/redux/api/companyApi/companyBranchInfoApi";
import { Button, Col, Row } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";




const ViewCustomerPage = ({ params }: any) => {

  // state

  const [defValue, setDefValue] = useState({});

  const id = params.slug;
  const { data, isLoading } = useGetSingleCompanyBranchInfoQuery(id);
  const companyData = data?.result;
  const bankDetailsData = data?.result?.bankDetails;
  const addressesData = data?.result?.addressDetails;



  console.log("Address data", addressesData);
  console.log("Bank Data", bankDetailsData);





  useEffect(() => {
    if (data) {

      setDefValue({
        //Master
        companyId: companyData?.companyId,
        companyName: companyData?.companyName,
        companyNameBn: companyData?.companyNameBn,
        branchUnitName: companyData?.branchUnitName,
        branchUnitNameBn: companyData?.branchUnitNameBn,
        branchUnitBinNumber: companyData?.branchUnitBinNumber,
        branchUnitBinNumberBn: companyData?.branchUnitBinNumberBn,
        branchUnitShortName: companyData?.branchUnitShortName,
        branchUnitShortNameBn: companyData?.branchUnitShortNameBn,
        branchUnitVatRegistrationType: companyData?.branchUnitVatRegistrationType,
        active: companyData?.active ? true : false,
        branchUnitCustomOfficeArea: companyData?.branchUnitCustomOfficeArea,
        branchUnitCustomOfficeAreaBn: companyData?.branchUnitCustomOfficeAreaBn,
        branchUnitPhoneNumber: companyData?.branchUnitPhoneNumber,
        branchUnitEmailAddress: companyData?.branchUnitEmailAddress,
      });


    }
  }, [data, companyData]);


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
            {
              bankDetailsData && bankDetailsData.length > 0 && addressesData && addressesData.length > 0 || bankDetailsData && bankDetailsData.length > 0 || addressesData && addressesData.length > 0 ? (
                <>
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
                          name="companyName"
                          label="Company Name: "
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
                          name="branchUnitName"
                          label="Branch Name: "
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
                          name="branchUnitNameBn"
                          size="large"
                          label="Branch Name Bn:"
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
                          name="branchUnitShortName"
                          size="large"
                          label="Branch Short Name:"
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
                          name="branchUnitVatRegistrationType"
                          size="large"
                          label="VAT Registration Type:"
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
                          name="branchUnitBinNumber"
                          size="large"
                          label="Branch Bin Number:"
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
                          name="branchUnitBinNumberBn"
                          size="large"
                          label="Bin Number Bn:"
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
                          name="branchUnitPhoneNumber"
                          size="large"
                          label="Branch Phone Number:"
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
                          name="branchUnitEmailAddress"
                          size="large"
                          label="Email Address:"
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
                          name="branchUnitCustomOfficeArea"
                          size="large"
                          label="Custom Office Area:"
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
                          name="branchUnitCustomOfficeAreaBn"
                          size="large"
                          label="Custom Office Area Bn:"
                          disable
                        />
                      </Col>
                    </Row>
                  </div>
                  <div>
                    {/* Bank Info child  start */}
                    {
                      bankDetailsData.length > 0 && (
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
                                            value={item?.bankBanchName}
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
                                            value={item?.companyAccountNumber}
                                            disable
                                          />
                                        </td>
                                        <td>

                                          <FormInput

                                            name=""
                                            value={item?.companyAccountNumberBn}
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
                      )
                    }
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
                                    <th className="px-2 py-2">Postal Code</th>
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
                                          value={item?.divisionName}
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
                                          value={item?.postalCode}
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
                  </div>
                </>
              ) : (
                <>
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
                          name="companyName"
                          label="Company Name: "
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
                          name="branchUnitName"
                          label="Branch Name: "
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
                          name="branchUnitNameBn"
                          size="large"
                          label="Branch Name Bn:"
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
                          name="branchUnitShortName"
                          size="large"
                          label="Branch Short Name:"
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
                          name="branchUnitVatRegistrationType"
                          size="large"
                          label="VAT Registration Type:"
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
                          name="branchUnitBinNumber"
                          size="large"
                          label="Branch Bin Number:"
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
                          name="branchUnitBinNumberBn"
                          size="large"
                          label="Bin Number Bn:"
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
                          name="branchUnitPhoneNumber"
                          size="large"
                          label="Branch Phone Number:"
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
                          name="branchUnitEmailAddress"
                          size="large"
                          label="Email Address:"
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
                          name="branchUnitCustomOfficeArea"
                          size="large"
                          label="Custom Office Area:"
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
                          name="branchUnitCustomOfficeAreaBn"
                          size="large"
                          label="Custom Office Area Bn:"
                          disable
                        />
                      </Col>
                    </Row>
                  </div>
                </>)
            }
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/company-setting/company-branch`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
              <Link href={`/super_admin/company-setting/company-branch/edit/${id}`}>
                <DarazCommonButton>Edit</DarazCommonButton>
              </Link>

            </div>
          </Form>
        </div>
      </div >
    </div >
  );
};

export default ViewCustomerPage;
