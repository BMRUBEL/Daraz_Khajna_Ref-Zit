/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import {
  useGetSingleBankQuery,
  useAddCustomerSetupMutation,
  useCustomerSetupDropDownQuery,
  useGetSingleDivisionQuery,
  useGetSingleDistrictQuery,
  useGetSingleUpazilaQuery,
  useGetSinglePoliceStationQuery
} from "@/redux/api/companyApi/customerInfoApi";
import { Button, Col, Row, Select, message } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCustomerSchema } from "@/schemas/company/createCustomerSchema";

interface AddressRowData {
  addressTypeId: number;
  holdingNo: string;
  roadNo: string;
  upazilaId: number;
  districtId: number;
  policeStationId: number;
  countryId: number;
  // postalCodeId: number;
}


const CreateCustomerPage = () => {


  // start child bank info dynamic table
  const [rows, setRows] = useState([
    {
      bankId: 1,
      bankBranchId: 1,
      bankAccountTypeId: 1,
      customerAccountNumber: "1234567890",
      customerAccountNumberBn: "১২৩৪৫৬৭৮৯০",
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
      customerAccountNumber: "1234567890",
      customerAccountNumberBn: "১২৩৪৫৬৭৮৯০",
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
      // postalCodeId: 0,
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
      // postalCodeId: 0,
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
  const [createCustomer] = useAddCustomerSetupMutation();

  //get all options
  const { data, isLoading } = useCustomerSetupDropDownQuery({});

  // get bank branch  data

  const [bankId, setBankId] = useState("");

  const { data: bankBranch } = useGetSingleBankQuery(bankId);

  // console.log(bankBranch, "branch");

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

//Police Station useGetSinglePoliceStationQuery

const policeStationOptions =
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
  const customerType: any = data?.result?.customerType;
  const bankAccountType: any = data?.result?.bankAccountType;
  const banks: any = data?.result?.banks;
  const addressType: any = data?.result?.addressType;
  const vatRegistrationType: any = data?.result?.vatRegistrationType;

  const countryOptions =
    country &&
    country?.map((options: any) => {
      return {
        label: options?.name,
        value: options?.id,
      };
    });

  const customerTypeOptions =
    customerType &&
    customerType?.map((options: any) => {
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
    vatRegistrationType &&
    vatRegistrationType?.map((options: any) => {
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
    banks &&
    banks?.map((bank: any) => {
      return {
        label: bank?.namebn,
        value: bank?.id,
      };
    });

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
    values.vatRegId = values.vatRegId;
    values.customerTypeId = values.customerTypeId;
    values.customerName = values.customerName;
    values.customerNameBn = values.customerNameBn;
    values.customerBinNumber = values.customerBinNumber;
    values.customerBinNumberBn = values.customerBinNumberBn;
    values.contactPersonPhone = values.contactPersonPhone;

    (values.registrationStatus = true),
    
      (values.registrationStatus = values.registrationStatus ? true : false);
    (values.active = true), (values.active = values.active ? true : false);
    values.emailAddress = values.emailAddress;
    values.countryId = 1;

    values.contactInfos = { contactPerson: values.contactPerson }
    values.bankDetails = [...rows];
    values.addresses = [...addressRows];

    try {
      console.log("Submitted Data",values);
      setLoading(true);
      const res = await createCustomer(values);
      if (res) {
        message.success("Customer Created Successfully!");
        router.push(`/super_admin/company-setting/customer-setup/view/${res?.data?.result?.id}`);
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
                  <DRZSelectField
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"
                    name="vatRegId"
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
                >
                  <DRZSelectField
                    style={{
                      width: "100%",
                      align: "left",
                    }}
                    size="large"

                    name="customerTypeId"
                    options={customerTypeOptions}
                    label="Customer Type: "
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
                    name="customerName"
                    size="large"
                    label="Customer Name:"
                    placeholder="Enter Customer Name..."
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
                    name="customerNameBn"
                    size="large"
                    label="Customer Name Bn:"
                    placeholder="Enter Customer Name Bn..."
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
                    name="customerBinNumber"
                    size="large"
                    label="BIN/NID/Email :"
                    placeholder="Enter Bin Number..."
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
                    name="customerBinNumberBn"
                    size="large"
                    label="BIN/NID/Email BN:"
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
                    name="contactPersonPhone"
                    size="large"
                    label="Phone Number:"
                    placeholder="Enter Phone Number..."
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
                    name="contactPerson"
                    size="large"
                    label="Contact Person Name:"
                    placeholder="Enter Contact Person Name"
                  />
                </Col>
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
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  <p className="text-xl font-semibold pb-4">Bank Info</p>
                  <div className="relative overflow-x-auto  sm:rounded-lg">
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
                          <th className="px-2 py-2">Customer Account Number</th>
                          <th className="px-2 py-2">
                            Customer Account Number Bn{" "}
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
                                placeholder="Enter Customer Account Number..."
                                className="border-none mt-3 w-full p-2 mb-4 focus:outline-none"
                                name="customerAccountNumber"
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index].customerAccountNumber =
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
                                placeholder="Enter Customer Account Number Bn..."
                                className="border-none mt-3 w-full p-2 mb-4 focus:outline-none"
                                name="customerAccountNumberBn"
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index].customerAccountNumberBn =
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
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  <p className="text-xl font-semibold pb-4">Address Details</p>
                  <div className="relative overflow-x-auto  sm:rounded-lg">
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
                          {/* <th className="px-2 py-2">Postal Code</th> */}
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
                                options={policeStationOptions}
                              />
                            </td>
                            {/* <td>
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                showSearch
                                placeholder="Select Postal Code..."
                                optionFilterProp="children"
                                onChange={(e) => {
                                  const updatedRows = [...addressRows];
                                  updatedRows[index].postalCodeId = e;
                                  setAddressRows(updatedRows);
                                }}
                                options={upazilaOptions}
                              />
                            </td> */}

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
                </Col>
                {/* Bank Address child end  */}
              </Row>
            </div>

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
              <DarazCommonButton>Save</DarazCommonButton>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateCustomerPage;
