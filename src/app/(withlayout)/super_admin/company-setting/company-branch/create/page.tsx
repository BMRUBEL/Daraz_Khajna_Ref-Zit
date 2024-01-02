/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { CaretDownOutlined, DeleteOutlined, EyeOutlined, PlusCircleOutlined, RightOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import {
  useGetSingleBankQuery,
  useAddCompanyBranchInfoMutation,
  useCompanyBranchInfoDropDownQuery,
  useGetSingleDivisionQuery,
  useGetSingleDistrictQuery,
  useGetSingleUpazilaQuery,
  useCompanyBranchInfoQuery
} from "@/redux/api/companyApi/companyBranchInfoApi";
import { Button, Col, Row, Select, message, Collapse } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import React, { ReactNode } from 'react';



interface AddressRowData {
  addressTypeId: number;
  holdingNo: string;
  roadNo: string;
  upazilaId: number;
  districtId: number;
  policeStationId: number;
  countryId: number;
  postalCode: string;
}

interface CustomPanelHeaderProps {
  headerText: string;
}

const CreateCompanyBranch = () => {


  const { Panel } = Collapse;


  // query
  const query: Record<string, any> = {

  };
  // get department data
  const { data: companyBranchData } = useCompanyBranchInfoQuery({
    ...query,

  });

  const storeData = companyBranchData?.result?.content;


  // start child bank info dynamic table
  const [rows, setRows] = useState([
    {
      bankId: 1,
      bankBranchId: 1,
      bankAccountTypeId: 1,
      companyAccountNumber: "1234567890",
      companyAccountNumberBn: "১২৩৪৫৬৭৮৯০",
    },
  ]);

  console.log(rows, 'rows');
  //Bank Info
  const [rowData, setRowData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  //Add Bank Info Row

  const addBankInfoRow = () => {
    setRows([...rows, rowData]);
    setRowData({
      bankId: 1,
      bankBranchId: 1,
      bankAccountTypeId: 1,
      companyAccountNumber: "1234567890",
      companyAccountNumberBn: "১২৩৪৫৬৭৮৯০",
    });
  };

  // start child bank address dynamic table
  const [addressRows, setAddressRows] = useState([
    {
      addressTypeId: 0, // Provide a default value based on your data type
      holdingNo: "",
      roadNo: "",
      upazilaId: 0,
      districtId: 0,
      policeStationId: 0,
      countryId: 0,
      postalCode: "",
    },
  ]);

  //Address Info
  const [addressRowData, setRowAddressData] = useState({});
  const [selectedAddressRows, setSelectedAddressRows] = useState([]);

  //Add Bank Address Row
  const addBankAddressRow = () => {
    setAddressRows([...addressRows, addressRowData]);
    setRowAddressData({
      addressTypeId: 0, // Provide a default value based on your data type
      holdingNo: "",
      roadNo: "",
      upazilaId: 0,
      districtId: 0,
      policeStationId: 0,
      countryId: 0,
      postalCode: "",
    });
  };

  //Bank Info Child
  const toggleSelect = (index) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  //Bank Info
  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...Array(rows.length).keys()]);
    }
  };

  //Bank address Child
  const toggleSelectAddress = (index) => {
    const selectedIndex = selectedAddressRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedAddressRows([...selectedAddressRows, index]);
    } else {
      const updatedSelectedRows = [...selectedAddressRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedAddressRows(updatedSelectedRows);
    }
  };

  //Bank Address
  const toggleSelectAllAddress = () => {
    if (selectedAddressRows.length === addressRows.length) {
      setSelectedAddressRows([]);
    } else {
      setSelectedAddressRows([...Array(addressRows.length).keys()]);
    }
  };

  //bank info row delete
  const deleteSelectedRows = () => {
    const updatedRows = rows.filter(
      (row, index) => !selectedRows.includes(index)
    );
    setRows(updatedRows);
    setSelectedRows([]);
  };

  //bank address row delete

  const deleteSelectedAddressRows = () => {
    const updatedRows = addressRows.filter(
      (row, index) => !selectedAddressRows.includes(index)
    );
    setAddressRows(updatedRows);
    setSelectedAddressRows([]);
  };




  //save
  const [createCompanyBranch] = useAddCompanyBranchInfoMutation();

  //get all options
  const { data, isLoading } = useCompanyBranchInfoDropDownQuery({});


  // get bank branch  data

  const [bankId, setBankId] = useState("");

  const { data: bankBranch } = useGetSingleBankQuery(bankId);

  // Use state to store the mapped options
  const [branchOptions, setBranchOptions] = useState([]);

  useEffect(() => {

    // Update branchOptions when bankBranch changes
    if (bankBranch && bankBranch.result && bankBranch.result?.bankBranchInfos) {
      const mappedOptions = bankBranch.result.bankBranchInfos.map((options: any) => ({
        label: options?.bankBranchNameBn,
        value: options?.id,
      }));

      // Update the state with the mapped options
      setBranchOptions(mappedOptions);
    }
  }, [bankId, bankBranch]);


  const handleSelectChange = (value: any, index: any) => {
    setBankId(value);
    const updatedRows = [...rows];
    updatedRows[index].bankId = value;

    setRows(updatedRows);
  };



  //Bank Address Child data Api call
  //Country

  const [countryId, setCountryId] = useState("");
  // get division data
  const { data: divisionData } = useGetSingleDivisionQuery(countryId);

  // console.log(divisionData, "Division");

  const divisionOptions =
    divisionData &&
    divisionData?.result?.division.map((options: any) => {
      return {
        label: options?.nameBn,
        value: options?.id,
      };
    });

  //bank address division
  const handleSelectChangeCountry = (value: any, index: any) => {
    setCountryId(value);
    const updatedRows = [...addressRows];
    updatedRows[index].countryId = value;
    setAddressRows(updatedRows);
  };

  //District
  const [divisionId, setDivisionId] = useState("");
  // get division data
  const { data: districtData } = useGetSingleDistrictQuery(divisionId);

  // console.log(districtData, "District");

  const districtOptions =
    districtData &&
    districtData?.result?.districts.map((options: any) => {
      return {
        label: options?.nameBn,
        value: options?.id,
      };
    });

  const handleSelectChangeDistrict = (value: any, index: any) => {
    setDivisionId(value);

  };

  //Upazila
  const [districtId, setDistrictId] = useState("");
  // get division data
  const { data: upazilaData } = useGetSingleUpazilaQuery(districtId);

  // console.log(upazilaData, "Upazila");

  const upazilaOptions =
    upazilaData &&
    upazilaData?.result?.upazilas.map((options: any) => {
      return {
        label: options?.nameBn,
        value: options?.id,
      };
    });

    const polisstationOptions =
    upazilaData &&
    upazilaData?.result?.policeStations.map((options: any) => {
      return {
        label: options?.nameBn,
        value: options?.id,
      };
    });

  const handleSelectChangeUpazila = (value: any, index: any) => {
    setDistrictId(value);
    const updatedRows = [...addressRows];
    updatedRows[index].districtId = value;
    setAddressRows(updatedRows);
  };

  //@ts-ignore
  const country: any = data?.result?.country;
  const companyType: any = data?.result?.company;
  const bankAccountType: any = data?.result?.bankAccountType;
  const bankInfo: any = data?.result?.banks;
  const addressType: any = data?.result?.addressType;
  const vatRegType: any = data?.result?.vatRegistrationType;

  const countryOptions =
    country &&
    country?.map((options: any) => {
      return {
        label: options?.name,
        value: options?.id,
      };
    });

  const companyTypeOptions =
    companyType &&
    companyType?.map((options: any) => {
      return {
        label: options?.name,
        value: options?.id,
      };
    });
  const bankAccountTypeOptions =
    bankAccountType &&
    bankAccountType?.map((options: any) => {
      return {
        label: options?.name,
        value: options?.id,
      };
    });

  const vatRegistrationTypeOptions =
    vatRegType &&
    vatRegType?.map((options: any) => {
      return {
        label: options?.name,
        value: options?.id,
      };
    });

  const addressTypeOptions =
    addressType &&
    addressType?.map((options: any) => {
      return {
        label: options?.name,
        value: options?.id,
      };
    });

  const banksOptions =
    bankInfo &&
    bankInfo?.map((bank: any) => {
      return {
        label: bank?.namebn,
        value: bank?.id,
      };
    });

  // const handleCheckboxChange = (checked) => {
  //   // Handle checkbox change if needed
  //   console.log('Checkbox checked:', checked);
  // };

  const options = [
    { value: "", label: "" },

    // Add more options as needed
  ];

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // submit handler
  const onSubmit = async (values: any) => {

    values.companyId = 1;
    values.branchUnitName = values.branchUnitName;
    values.branchUnitNameBn = values.branchUnitNameBn;
    values.branchUnitBinNumber = values.branchUnitBinNumber;
    values.branchUnitBinNumberBn = values.branchUnitBinNumberBn;
    values.branchUnitShortName = values.branchUnitShortName;
    values.branchUnitShortNameBn = "Zit";
    values.branchUnitVatRegistrationType = values.branchUnitVatRegistrationType;
    values.branchUnitCustomOfficeArea = values.branchUnitCustomOfficeArea;
    values.branchUnitCustomOfficeAreaBn = values.branchUnitCustomOfficeAreaBn;
    values.branchUnitPhoneNumber = values.branchUnitPhoneNumber;
    values.branchUnitEmailAddress = values.branchUnitEmailAddress;
    (values.active = true), (values.active = values.active ? true : false);

    //Child
    values.bankDetails = [...rows];
    values.addressDetails = [...addressRows];
    // values.economicActivities = [economicActivitiesData]
    // values.economicActivityAreas = [economicActivityAreasData]
    // values.classificationCodes = [...classificationCodesData]

    try {
      console.log("Submitted Data", values);
      setLoading(true);
      const res = await createCompanyBranch(values);
      if (res) {
        message.success("Company Created Successfully!");
        router.push(`/super_admin/company-setting/company-branch/view/${res?.data?.result?.id}`);
        setLoading(false);
      }


    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(rows, "child bank info data");
  // table children

  console.log(addressRows, "child bank address data");
  // table children

  //Accordion function

  const CustomExpandIcon = (props: any) => {
    const rotate = props.isActive ? 180 : 0;
    return (
      <CaretDownOutlined
        rotate={rotate}
        style={{ transition: 'transform 0.3s', fontSize: '20px', color: '#ff5100' }}
      />
    );
  };

  const CustomPanelHeader: React.FC<CustomPanelHeaderProps> = ({ headerText }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ margin: 0, flex: 1 }}>{headerText}</h3>

    </div>
  );


  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="Insert" />
      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        <div style={{}}>
          <Form
            submitHandler={onSubmit}
          // resolver={yupResolver(createCustomerSchema)}
          >
            {/* Branch Information*/}
            <div
              style={{
                // marginBottom: "10px",
                padding: "20px",
                marginTop: "11px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
              }}
            >
              <p className="text-xl font-semibold pb-4">Branch Information</p>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    // marginBottom: "20px",
                  }}
                >
                  <DRZSelectField
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"
                    name="companyId"
                    options={companyTypeOptions}
                    label="Company Name: "
                    placeholder="Select Company"
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}
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
                    name="branchUnitName"
                    size="large"
                    label="Branch Name:"
                    placeholder="Branch Unit Name..."
                    required
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
                    placeholder="Branch Unit Name Bn..."
                    required
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
                    placeholder="Enter Branch Short Name..."
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
                  <DRZSelectField
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"
                    name="branchUnitVatRegistrationType"
                    options={vatRegistrationTypeOptions}
                    label="VAT Regi Type: "
                    placeholder="Select"
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}
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
                    placeholder="Enter Branch Unit Bin Number..."
                    required
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
                    placeholder="Enter Bin Number Bn..."
                    required
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
                    label="Branch Phone Number :"
                    placeholder="Enter Branch Phone Number..."
                    required
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
                    label="Email:"
                    placeholder="Enter Email Address..."
                    required
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
                    placeholder="Enter Custom Office Area..."
                    required
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
                    placeholder="Enter Custom Office Area Bn..."
                  />
                </Col>
                {/* <Col
                  className="gutter-row"
                  // span={6}
                  style={{
                  alignItems: "normal"
                  }}
                  aria-required
                >
                  <FormCheckbox
                    name="active"
                    label="Rebateable"
                    options={options}
                    isViewPage={true}
                    
                  />
                </Col> */}
              </Row>
            </div>

            {/* Legal Documentation */}
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
                    // marginBottom: "20px",
                  }}
                  aria-required
                >
                  <Collapse defaultActiveKey={['2']} accordion expandIconPosition="right" expandIcon={CustomExpandIcon} style={{}}>
                    <Panel header={<CustomPanelHeader headerText="Legal Document" />} key="1">
                      <div className="relative overflow-x-auto  sm:rounded-lg">
                        <p className="text-sm font-medium pb-4">Document List</p>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="bg-orange-thead text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th className="px-2 py-2 max-w-xs" style={{ width: "10%", alignItems: "center" }}>
                                S/L
                              </th>
                              <th className="px-2 py-2">Doc Name</th>
                              <th className="px-2 py-2 ">Doc Type</th>
                              <th className="px-2 py-2 ">Issue Date </th>
                              <th className="px-2 py-2 ">Expiry Date </th>
                              <th className="px-2 py-2 ">Action </th>
                            </tr>
                          </thead>
                          <tbody>
                            {storeData && storeData.map((item: any, index: any) => (
                              <tr key={index}>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.id}
                                    // disable
                                    readOnly={true}
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.branchUnitName}
                                    readOnly={true}
                                  />
                                </td>

                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.branchUnitNameBn}
                                    readOnly={true}
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.createdAt}
                                    readOnly={true}
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.updatedAt}
                                    readOnly={true}
                                  />
                                </td>
                                <td>
                                  <Link href={`/super_admin/company-setting/company-branch/view/${item?.id}`}>
                                    <Button
                                      style={{
                                        fontSize: "13px",
                                        padding: "0px 7px 5px 7px",
                                        borderRadius: "0px",
                                        height: "28px",
                                        alignItems: "center"
                                      }}
                                      className="bg-[#FF5100]"
                                      onClick={() => console.log(item?.id)}
                                      type="primary"
                                    >
                                      <EyeOutlined />
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </Panel>
                  </Collapse>
                </Col>
                {/* Bank Info child end  */}
              </Row>
            </div>


            {/* Bank Info child  start */}
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
                    // marginBottom: "20px",
                  }}
                  aria-required
                >
                  <Collapse defaultActiveKey={['1']} accordion expandIconPosition="right" expandIcon={CustomExpandIcon} style={{}}>
                    <Panel header={<CustomPanelHeader headerText="Bank Information" />} key="1">
                      <div className="relative overflow-x-auto  sm:rounded-lg">
                        <p className="text-sm font-medium pb-4">Bank Info</p>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="bg-orange-thead   text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th className="px-2 py-2">
                                <input
                                  type="checkbox"
                                  checked={selectedRows.length === rows.length}
                                  onChange={toggleSelectAll}
                                  className="form-checkbox h-5 w-5 text-indigo-600"
                                />
                              </th>
                              <th className="px-2 py-2">Bank</th>
                              <th className="px-2 py-2 ">Bank Branch</th>
                              <th className="px-2 py-2 ">Bank Account Type </th>
                              <th className="px-2 py-2">Company Account Number</th>
                              <th className="px-2 py-2">
                                Company Account Number Bn{" "}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={selectedRows.includes(index)}
                                    onChange={() => toggleSelect(index)}
                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                  />
                                </td>
                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Bank"
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                      handleSelectChange(value, index);
                                    }}
                                    onSearch={onSearch}
                                    options={banksOptions}
                                  />
                                </td>

                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Bank Branch"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      const updatedRows = [...rows];
                                      updatedRows[index].bankBranchId = e;
                                      setRows(updatedRows);
                                    }}
                                    onSearch={onSearch}
                                    options={branchOptions}
                                  />
                                </td>
                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Account Type"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      const updatedRows = [...rows];
                                      updatedRows[index].bankAccountTypeId = e;
                                      setRows(updatedRows);
                                    }}
                                    onSearch={onSearch}
                                    options={bankAccountTypeOptions}
                                  />
                                </td>
                                <td>
                                  <input
                                    style={{
                                      width: "100%",
                                    }}
                                    type="text"
                                    placeholder="Enter Company Account Number..."
                                    className="border-none mt-3 w-full p-2 mb-4 focus:outline-none"
                                    name="companyAccountNumber"
                                    onChange={(e) => {
                                      const updatedRows = [...rows];
                                      updatedRows[index].companyAccountNumber =
                                        e.target.value;
                                      setRows(updatedRows);
                                    }}
                                    required
                                  />
                                </td>

                                <td>
                                  <input
                                    style={{
                                      width: "100%",
                                    }}
                                    type="text"
                                    placeholder="Enter Company Account Number Bn..."
                                    className="border-none mt-3 w-full p-2 mb-4 focus:outline-none"
                                    name="companyAccountNumberBn"
                                    onChange={(e) => {
                                      const updatedRows = [...rows];
                                      updatedRows[index].companyAccountNumberBn =
                                        e.target.value;
                                      setRows(updatedRows);
                                    }}
                                    required
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",

                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <Button
                            shape="circle"
                            icon={<PlusCircleOutlined />}
                            onClick={addBankInfoRow}
                            style={{
                              background: "#02BBDB",
                              color: "white",
                            }}
                          />{" "}
                          <Button
                            type="primary"
                            className="ms-3"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={deleteSelectedRows}
                          />{" "}
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </Col>
                {/* Bank Info child end  */}
              </Row>
            </div>
            {/* Bank Address child  start */}
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
                    // marginBottom: "20px",
                  }}
                  aria-required
                >
                  <Collapse accordion expandIconPosition="right" expandIcon={CustomExpandIcon} style={{}} >
                    <Panel header={<CustomPanelHeader headerText="Address Information" />} key="2">
                      <div className="relative overflow-x-auto  sm:rounded-lg">
                        <p className="text-sm font-medium pb-4">Address Info</p>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="bg-orange-thead   text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th className="px-2 py-2">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedAddressRows.length ===
                                    addressRows.length
                                  }
                                  onChange={toggleSelectAllAddress}
                                  className="form-checkbox h-5 w-5 text-indigo-600"
                                />
                              </th>
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
                            {addressRows.map((row, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="checkbox"
                                    checked={selectedAddressRows.includes(index)}
                                    onChange={() => toggleSelectAddress(index)}
                                    className="form-checkbox h-5 w-5 text-indigo-600"
                                  />
                                </td>
                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Type of Address"
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      const updatedRows = [...addressRows];
                                      updatedRows[index].addressTypeId = e;
                                      setAddressRows(updatedRows);
                                    }}
                                    onSearch={onSearch}
                                    options={addressTypeOptions}
                                  />
                                </td>
                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Country..."
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                      handleSelectChangeCountry(value, index);
                                    }}
                                    options={countryOptions}
                                  />
                                </td>



                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Division..."
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                      handleSelectChangeDistrict(value, index);
                                    }}
                                    options={divisionOptions}
                                  />
                                </td>
                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select District..."
                                    optionFilterProp="children"
                                    onChange={(value) => {
                                      handleSelectChangeUpazila(value, index);
                                    }}
                                    options={districtOptions}
                                  />
                                </td>
                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Upazila..."
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      const updatedRows = [...addressRows];
                                      updatedRows[index].upazilaId = e;
                                      setAddressRows(updatedRows);
                                    }}
                                    options={upazilaOptions}
                                  />
                                </td>

                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Police Station..."
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      const updatedRows = [...addressRows];
                                      updatedRows[index].policeStationId = e;
                                      setAddressRows(updatedRows);
                                    }}
                                    options={polisstationOptions}
                                  />
                                </td>
                                <td>
                                  <Select
                                    style={{
                                      width: "100%",
                                    }}
                                    showSearch
                                    placeholder="Select Postal Code..."
                                    optionFilterProp="children"
                                    onChange={(e) => {
                                      const updatedRows = [...addressRows];
                                      updatedRows[index].postalCode = e;
                                      setAddressRows(updatedRows);
                                    }}
                                    options={polisstationOptions}
                                  />
                                </td>

                                <td>
                                  <input
                                    style={{
                                      width: "100%",
                                    }}
                                    type="text"
                                    placeholder="Enter Road..."
                                    className="border-none mt-3 w-full p-2 mb-4 focus:outline-none"
                                    name="roadNo"
                                    onChange={(e) => {
                                      const updatedRows = [...addressRows];
                                      updatedRows[index].roadNo = e.target.value;
                                      setAddressRows(updatedRows);
                                    }}
                                    required
                                  />
                                </td>
                                <td>
                                  <input
                                    style={{
                                      width: "100%",
                                    }}
                                    type="number"
                                    placeholder="Enter Holding..."
                                    className="border-none w-full m-3 p-2 mb-4 focus:outline-none"
                                    name="holdingNo"
                                    onChange={(e) => {
                                      const updatedRows = [...addressRows];
                                      updatedRows[index].holdingNo = e.target.value;
                                      setAddressRows(updatedRows);
                                    }}
                                    required
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",

                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <Button
                            shape="circle"
                            icon={<PlusCircleOutlined />}
                            onClick={addBankAddressRow}
                            style={{
                              background: "#02BBDB",
                              color: "white",
                            }}
                          />{" "}
                          <Button
                            type="primary"
                            className="ms-3"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={deleteSelectedAddressRows}
                          />{" "}
                        </div>
                      </div>
                    </Panel>
                  </Collapse>
                </Col>
                {/* Bank Address child end  */}
              </Row>
            </div>

            {/* List of Store You wish to Bring under central registration */}
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
                    // marginBottom: "20px",
                  }}
                  aria-required
                >
                  <Collapse defaultActiveKey={['1']} accordion expandIconPosition="right" expandIcon={CustomExpandIcon} style={{}}>
                    <Panel header={<CustomPanelHeader headerText="List of Store You Wish To Bring Under Central Registration" />} key="3">
                      <div className="relative overflow-x-auto  sm:rounded-lg">
                        <p className="text-sm font-medium pb-4">Store Info</p>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                          <thead className="bg-orange-thead text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                              <th className="px-2 py-2 max-w-xs" style={{ width: "10%", alignItems: "center" }}>
                                SL
                              </th>
                              <th className="px-2 py-2">Store/Hub Name</th>
                              <th className="px-2 py-2 ">Store/Hub Name Bn</th>
                              <th className="px-2 py-2 ">Address </th>
                            </tr>
                          </thead>
                          <tbody>
                            {storeData && storeData.map((item: any, index: any) => (
                              <tr key={index}>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.id}
                                    // disable
                                    readOnly={true}
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.branchUnitName}
                                    readOnly={true}
                                  />
                                </td>

                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.branchUnitNameBn}
                                    readOnly={true}
                                  />
                                </td>
                                <td>
                                  <FormInput
                                    name=""
                                    value={item?.branchUnitEmailAddress}
                                    readOnly={true}
                                  />
                                </td>

                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                    </Panel>
                  </Collapse>
                </Col>
                {/* Bank Info child end  */}
              </Row>
            </div>


            {/* Close and Save Buttons */}
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
              <DarazCommonButton>Save</DarazCommonButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateCompanyBranch;
