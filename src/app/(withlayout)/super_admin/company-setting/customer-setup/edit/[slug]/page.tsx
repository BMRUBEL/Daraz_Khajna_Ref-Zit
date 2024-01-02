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
  useCustomerSetupDropDownQuery,
  useGetSingleDivisionQuery,
  useGetSingleDistrictQuery,
  useGetSingleUpazilaQuery,
  useUpdateCustomerSetupMutation,
  useGetSingleCustomerSetupQuery,
} from "@/redux/api/companyApi/customerInfoApi";
import { Button, Col, Row, Select, message } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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






const UpdateCustomerPage = ({ params }: any) => {

  //get all options
  const { data, isLoading } = useCustomerSetupDropDownQuery({});

  //Update
  const [updateCustomer] = useUpdateCustomerSetupMutation();


  const [defValue, setDefValue] = useState({});
  const id = params.slug;
  const { data: singleData } = useGetSingleCustomerSetupQuery(id);
  const customerData = singleData?.result;
  const bankDetailsData = singleData?.result?.bankDetails;
  const addressesData = singleData?.result?.addresses;
  const contactInfoData = singleData?.result?.contactInfos;


  const [rows, setRows] = useState([]);
  const [addressRows, setAddressRows] = useState([]);

  useEffect(() => {
    // Check if bankDetailsData exists before updating state
    if (bankDetailsData) {
      setRows([...bankDetailsData]);
    }

    // Check if addressesData exists before updating state
    if (addressesData) {
      setAddressRows([...addressesData]);
    }
  }, [bankDetailsData, addressesData]);

  useEffect(() => {
    console.log('Component rerendered:', rows);
  }, [rows]);



  console.log("Master details data", customerData)
  console.log("bank info data", rows)
  console.log("bank Address data", addressRows)


  useEffect(() => {
    if (singleData) {
      setDefValue({
        //Master
        companyId: parseInt(customerData?.companyId),
        vatRegId: parseInt(customerData?.vatRegId),
        customerTypeId: parseInt(customerData?.customerTypeId),
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
        createdAt: customerData?.createdAt,
        updatedAt: customerData?.updatedAt,
        createdBy: customerData?.createdBy,
        updatedBy: customerData?.updatedBy,
        contactPerson: contactInfoData?.contactPerson,
      });
    }
  }, [singleData, customerData, contactInfoData]);




  //Bank Info
  const [rowData, setRowData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  // Flag to track whether to show the empty row
  const [showEmptyRow, setShowEmptyRow] = useState(false);

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
    setShowEmptyRow(true);
  };


  //Address Info
  const [addressRowData, setRowAddressData] = useState({});
  const [selectedAddressRows, setSelectedAddressRows] = useState([]);

  //Add Bank Address Row
  const addBankAddressRow = () => {
    setAddressRows([...addressRows, addressRowData]);
    setRowAddressData({
      addressTypeId: 1, // Provide a default value based on your data type
      holdingNo: "",
      roadNo: "",
      upazilaId: 1,
      districtId: 1,
      policeStationId: 1,
      countryId: 1,
      // postalCodeId: 0,
    });
  };


  //Bank Info child
  // const toggleSelect = (index) => {

  //   const selectedIndex = selectedRows.indexOf(index);
  //   if (selectedIndex === -1) {
  //     setSelectedRows([...selectedRows, index]);
  //   } else {
  //     const updatedSelectedRows = [...selectedRows];
  //     updatedSelectedRows.splice(selectedIndex, 1);
  //     setSelectedRows(updatedSelectedRows);
  //   }
  // };

  const toggleSelect = (index) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = new Set(prevSelectedRows);

      if (updatedSelectedRows.has(index)) {
        updatedSelectedRows.delete(index);
      } else {
        updatedSelectedRows.add(index);
      }

      return [...updatedSelectedRows];
    });
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



  //Bank info row delete
  const deleteSelectedRows = () => {
    console.log("Selected Rows:", selectedRows);
    const updatedRows = rows.filter(
      (row, index) => !selectedRows.includes(index)
    );
    console.log("Updated Rows:", updatedRows);
    setRows(updatedRows);
    setSelectedRows([]);
  };


  //Bank address row delete

  const deleteSelectedAddressRows = () => {
    const updatedRows = addressRows.filter(
      (row, index) => !selectedAddressRows.includes(index)
    );
    setAddressRows(updatedRows);
    setSelectedAddressRows([]);
  };




  //Check Edit Previous Value
  const editPreviousValue = (previousValue, newValue) => {
    console.log(`Editing previous value: ${previousValue} to ${newValue}`);
  };


  // get bank branch  data 

  const [bankId, setBankId] = useState("");
  const { data: bankBranch } = useGetSingleBankQuery(bankId);

  console.log(bankBranch, "Bank branch");


  const branchOptions =
    bankBranch?.result?.bankBranchInfos?.map((options: any) => ({
      label: options?.bankBranchName,
      value: options?.id,
    })) || [];


  //Initially showing selected Bank Branch

  // const initialItem = {

  //   bankBranchId: null,
  //   bankBranchName: "Default Branch Name", // Set the default branch name
  // };

  // const [item, setItem] = useState(initialItem);


  //selectbank
  const handleSelectChange = (value: any, index: any) => {
    setBankId(value);

    // Find the selected bank option
    const selectedBankOption = banksOptions?.find((option) => option.value === value) || {};

    // Get the bank name from the selected option, or use a default if not found
    const selectedBankName = selectedBankOption.label || 'Unknown Bank';

    // Find the associated branch name based on the selected bankId
    const associatedBranch = bankBranch?.result?.bankBranchInfos?.find(
      (branch) => branch.bankId === value
    );

    // Get the branch name from the associated branch, or use a default if not found
    const selectedBranchName = associatedBranch?.branchNameBn || 'Unknown Branch';

    // Update the rows state
    const updatedRows = rows.map((row, i) =>
      i === index
        ? { ...row, bankId: value, bankName: selectedBankName, branchName: selectedBranchName }
        : row
    );

    // Log the updated rows for debugging
    console.log('Updated rows:', updatedRows);

    const previousValue = rows[index].bankId;
    if (previousValue) {
      // Call the imported function
      editPreviousValue(previousValue, value);
    }

    setRows(updatedRows);
  };




  //Bank Address Country

  const [countryId, setCountryId] = useState("");
  // get division data

  const handleSelectChangeCountry = (value: any, index: any) => {
    setCountryId(value);

    // Find the selected country option
    const selectedCountryOption = countryOptions?.find((option) => option.value === value) || {};

    // Get the country name from the selected option, or use a default if not found
    const selecteCountryName = selectedCountryOption.label || 'Unknown Country';

    // Find the associated country name based on the selected countryId
    const associatedDivision = divisionData?.result?.country?.find(
      (division) => division.countryId === value
    );

    // Get the division name from the associated division, or use a default if not found
    const selectedDivisionName = associatedDivision?.countryName || 'Unknown Division';

    // Update the addressRows state
    const updatedRows = addressRows.map((row, i) =>
      i === index
        ? { ...row, countryId: value, countryName: selecteCountryName, divisionName: selectedDivisionName }
        : row
    );

    // Log the updated rows for debugging
    console.log('Updated Addressrows country:', updatedRows);


    const previousValue = addressRows[index].countryId;
    // const updatedRows = [...addressRows];
    // updatedRows[index].countryId = value;
    setAddressRows(updatedRows);
  };



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


  const handleSelectChangeDivision = (value: any, index: any) => {
    setDivisionId(value);

    // Find the selected Divison option
    const selectedDivisionOption = divisionOptions?.find((option) => option.value === value) || {};

    // Get the division name from the selected option, or use a default if not found
    const selecteDivisionName = selectedDivisionOption.label || 'Unknown Division';

    // Find the associated district name based on the selected divionId
    const associatedDistrict = districtData?.result?.districts?.find(
      (district) => district.divisionId === value
    );

    // Get the district name from the associated division, or use a default if not found
    const selectedDistrictName = associatedDistrict?.nameBn || 'Unknown District';

    // Update the addressRows state
    const updatedRows = addressRows.map((row, i) =>
      i === index
        ? { ...row, divisionId: value, divisionName: selecteDivisionName, districtName: selectedDistrictName }
        : row
    );

    // Log the updated rows for debugging
    console.log('Updated Addressrows Division:', updatedRows);


    const previousValue = addressRows[index].divisionId;
    setAddressRows(updatedRows);

  };


  //Division State
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

  //Upazila
  const [districtId, setDistrictId] = useState("");

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


  const handleSelectChangeDistrict = (value: any, index: any) => {
    setDistrictId(value);

    // Find the selected District option
    const selectedDistrictOption = districtOptions?.find((option) => option.value === value) || {};

    // Get the district name from the selected option, or use a default if not found
    const selecteDistrictName = selectedDistrictOption.label || 'Unknown District';

    // Find the associated Upazila name based on the selected upazilaId
    const associatedUpazila = upazilaData?.result?.upazilas?.find(
      (upazila) => upazila.districtId === value
    );

    // Get the upazila name from the associated upazila, or use a default if not found
    const selectedUpazilaName = associatedUpazila?.nameBn || 'Unknown Upazila';

    // Update the addressRows state
    const updatedRows = addressRows.map((row, i) =>
      i === index
        ? { ...row, districtId: value, districtName: selecteDistrictName, upazilaName: selectedUpazilaName }
        : row
    );

    // Log the updated rows for debugging
    console.log('Updated Addressrows District:', updatedRows);


    const previousValue = addressRows[index].districtId;
    // const updatedRows = [...addressRows];
    // updatedRows[index].divisionId = value;
    setAddressRows(updatedRows);


  };





  //Master Table drop down
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
    values.customerPhoneNumber = values.customerPhoneNumber;
    (values.registrationStatus = true),
      (values.registrationStatus = values.registrationStatus ? true : false);
    (values.active = true), (values.active = values.active ? true : false);
    values.emailAddress = values.emailAddress;
    values.countryId = 1;

    values.contactInfos = { contactPerson: values.contactPerson };

    values.bankDetails = [...rows];
    values.addresses = [...addressRows];

    try {
      console.log("Submitted Data ", values);

      setLoading(true);

      const res = await updateCustomer({
        id,
        body: values,
      }).unwrap();

      if (res) {
        message.success("Customer Updated Successfully!");
        router.push(`/super_admin/company-setting/customer-setup/view/${id}`);
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
                    name="customerPhoneNumber"
                    size="large"
                    label="Phone Number:"
                    placeholder="Enter Phone Number..."
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
                    required
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
                            Customer Account Number Bn
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((item: any, index: any) => (
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
                                  console.log("Selected bank", value)
                                  handleSelectChange(value, index);
                                }}
                                onSearch={onSearch}
                                options={banksOptions}
                                value={item?.bankName}

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
                                onChange={(selectedBranchId) => {


                                  console.log("Selected Branch ID:", selectedBranchId);
                                  console.log("Current item:", item);

                                  setRows((prevRows) => {
                                    const updatedRows = [...prevRows];
                                    updatedRows[index] = {
                                      ...updatedRows[index],
                                      bankBranchId: selectedBranchId,
                                    };
                                    return updatedRows;
                                  });
                                }}
                                onSearch={onSearch}
                                options={branchOptions}
                                // key={item?.bankBranchId} // Add a key prop based on the state
                                value={item?.bankBranchId}
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
                                onChange={(selectedAccountTypeId) => {
                                  setRows((prevRows) => {
                                    const updatedRows = [...prevRows];
                                    updatedRows[index] = {
                                      ...updatedRows[index],
                                      bankAccountTypeId: selectedAccountTypeId,
                                    };
                                    return updatedRows;
                                  });
                                }}
                                onSearch={onSearch}
                                options={bankAccountTypeOptions}
                                value={item?.bankAccountTypeId}
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
                                  updatedRows[index] = {
                                    ...updatedRows[index], customerAccountNumber:
                                      e.target.value,
                                  }
                                  setRows(updatedRows);
                                }}
                                required
                                value={item?.customerAccountNumber}
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
                                  updatedRows[index] = {
                                    ...updatedRows[index], customerAccountNumberBn:
                                      e.target.value,
                                  }
                                  setRows(updatedRows);
                                }}
                                required
                                value={item?.customerAccountNumberBn}
                              />
                            </td>
                          </tr>
                        ))}

                        {/* Empty row to be shown when Add Row is clicked */}
                        {showEmptyRow && (
                          <tr>
                            {/* ... Render your empty row fields */}
                          </tr>
                        )}

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
                          <th className="px-2 py-2 ">Road </th>
                          <th className="px-2 py-2 ">Holding</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addressRows.map((item: any, index: any) => (
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
                                onChange={(selectedAddressTypeId) => {
                                  setAddressRows((prevRows) => {
                                    const updatedRows = [...prevRows];
                                    updatedRows[index] = {
                                      ...updatedRows[index],
                                      addressTypeId: parseInt(selectedAddressTypeId), // Convert e to a number
                                    };
                                    return updatedRows;
                                  });
                                }}
                                onSearch={onSearch}
                                options={addressTypeOptions}
                                value={item?.addressTypeId}
                              />

                            </td>
                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                showSearch
                                placeholder="Select Country..."
                                optionFilterProp="childrenaddress"
                                onChange={(value) => {
                                  handleSelectChangeCountry(value, index);
                                }}
                                options={countryOptions}
                                value={item?.countryName}
                              />
                            </td>



                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                showSearch
                                placeholder="Select Division..."
                                optionFilterProp="childrenaddress"
                                onChange={(value) => {
                                  handleSelectChangeDivision(value, index);
                                }}
                                options={divisionOptions}
                                value={item?.districtName}
                              />
                            </td>
                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                showSearch
                                placeholder="Select District..."
                                optionFilterProp="childrenaddress"
                                onChange={(value) => {
                                  handleSelectChangeDistrict(value, index);
                                }}
                                options={districtOptions}
                                value={item?.districtName}
                              />
                            </td>
                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                showSearch
                                placeholder="Select Upazila..."
                                optionFilterProp="childrenaddress"
                                onChange={(e) => {
                                  const updatedRows = [...addressRows];
                                  updatedRows[index] = {
                                    ...updatedRows[index],
                                    upazilaId: e,
                                  }

                                  setAddressRows(updatedRows);
                                }}
                                options={upazilaOptions}
                                value={item?.upazillaName}
                              />
                            </td>

                            <td>
                              <Select
                                style={{
                                  width: "100%",
                                }}
                                showSearch
                                placeholder="Select Police Station..."
                                optionFilterProp="childrenaddress"
                                onChange={(e) => {
                                  const updatedRows = [...addressRows];
                                  updatedRows[index] = {
                                    ...updatedRows[index],
                                    policeStationId: e,
                                  }

                                  setAddressRows(updatedRows);
                                }}
                                options={upazilaOptions}
                                value={item?.policeStationId}
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
                                  updatedRows[index] = {
                                    ...updatedRows[index],
                                    roadNo: e.target.value,
                                  }
                                  setAddressRows(updatedRows);
                                }}
                                required
                                value={item?.roadNo}
                              />
                            </td>
                            <td>
                              <input
                                style={{
                                  width: "100%",
                                }}
                                type="text"
                                placeholder="Enter Holding..."
                                className="border-none w-full m-3 p-2 mb-4 focus:outline-none"
                                name="holdingNo"
                                onChange={(e) => {
                                  const updatedRows = [...addressRows];
                                  updatedRows[index] = {
                                    ...updatedRows[index],
                                    holdingNo: e.target.value,
                                  }

                                  setAddressRows(updatedRows);
                                }}
                                required
                                value={item?.holdingNo}
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

export default UpdateCustomerPage;
