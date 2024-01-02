"use client";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { Button, Col, InputNumber, Row, Select, Table, message } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  useAddVdsSellerMutation,
  useVdsSellerDropDownChildQuery,
  useVdsSellerDropDownQuery,
  useVdsSellerDateQuery,
} from "@/redux/api/commercialApi/vdsSellerApi";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { amount } from "../../../../../../utils/amountFormat";
import { yupResolver } from "@hookform/resolvers/yup";
import { vdsSellerSchema } from "@/schemas/commercial/vdsSeller";
import { useForm, FormProvider } from "react-hook-form";
// import dayjs from "dayjs";
import Input from "antd/es/input/Input";
import * as Yup from "yup";
import dayjs, { Dayjs } from "dayjs";

interface RowDataType {
  issueMasterId: number;
  vatAmount: number;
  deductedVatAmount: number;
  totalAmountLocalCurr: number;
  challanDate: string; // Assuming effectiveDate is a string or null
}

const CreateVdsForSeller = () => {
  const [selectedChallan, setSelectedChallan] = useState<number | null>(null);
  const [customerIdEnabled, setCustomerIdEnabled] = useState<boolean>(true);
  const [selectedChallanNos, setSelectedChallanNos] = useState<Set<number>>(
    new Set()
  );
  const [selectedIssueMasterIds, setSelectedIssueMasterIds] = useState(
    new Set()
  );
  const [challanOptions, setChallanOptions] = useState([]);
  const [deletedChallanNos, setDeletedChallanNos] = useState<Set<number>>(
    new Set()
  );

  const [rows, setRows] = useState([
    {
      issueMasterId: 0,
      challanDate:"",
      totalAmountLocalCurr: 0.0,
      vatAmount: 0.0,
      deductedVatAmount: 0.0,
    },
  ]);

  const [selectedChallans, setSelectedChallans] = useState<
    Array<number | null>
  >(Array(rows.length).fill(null));

  const [createVdsSeller] = useAddVdsSellerMutation();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Function to handle adding rows
  const addVdsSellerRow = () => {
    // Check if rows and challanOptions are defined
    if (rows && challanOptions) {
      // Check the condition for allowing the creation of a new row
      if (rows.length < challanOptions.length) {
        const newRow = {
          issueMasterId: 0,
          challanDate: dayjs().format("DD-MM-YYYY"),
          totalAmountLocalCurr: 0.0,
          vatAmount: 0.0,
          deductedVatAmount: 0.0,
        };

        // Reset relevant state variables
        setSelectedChallan(null);
        setSelectedChallanNos(new Set());
        setSelectedIssueMasterIds(new Set());
        setDeletedChallanNos(new Set());

        setRows([...rows, newRow]);
      } else {
        // Handle the case when the condition is not met
        message.error("Cannot add more rows!");
      }
    } else {
      // Handle the case when rows or challanOptions are not defined
      message.error("Rows or challanOptions is not defined.");
    }
  };

  // Total Issue amount
  const totalIssueAmount = rows.reduce(
    (sum, row) => sum + row.totalAmountLocalCurr,
    0
  );
  //Total Vat amount
  const totalVatAmount = rows.reduce((sum, row) => sum + row.vatAmount, 0);

  // Total Deducted amount
  const totalDeductedVatAmount = rows.reduce(
    (sum, row) => sum + row.deductedVatAmount,
    0
  );

  //toggle
  const toggleSelect = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
    }
  };

  //Toggle All
  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([]);
    } else {
      const allIndices: number[] = [];
      for (let i = 0; i < rows.length; i++) {
        allIndices.push(i);
      }
      setSelectedRows(allIndices);
    }
  };

  //Dependent Drop Down call
  const [id, setId] = useState("");

  const { data: chalanData } = useVdsSellerDropDownChildQuery(id);

  //Chalan Drop Down
  console.log(chalanData, "ChalanData");

  const { data, isLoading } = useVdsSellerDropDownQuery({});
  // console.log(datasource, "Seller Drop Down");

  const customers: any = data?.result?.customers;
  const commisioneRates: any = data?.result?.commissionerate;
  const tcAccCodes: any = data?.result?.vatDeposit;

  const [selectedDate, setSelectedDate] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );
  const { data: vdsDate, error: vdsError } =
    useVdsSellerDateQuery(selectedDate);
  const [trasactionDate, setTrasactionDate] = useState("");

  //Sending same date pattern as api
  const handleDateChange = (value: Dayjs | null) => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Selected Date:", formattedDate);
    setSelectedDate(formattedDate);
    setTrasactionDate(value ? value.format("YYYY-MM-DD") : "");
  };

  const vatMonthData = vdsDate?.result?.vatMonth;
  const names = vatMonthData
    ? vatMonthData.map((item: { name: string }) => item.name).join(", ")
    : "";

  console.log("Selected Date:", selectedDate);
  console.log("VAT Month Data:", vatMonthData);

  const handleSelectChange = (value: any, index: any) => {
    setId(value);
    const updatedRows: RowDataType[] = [...rows];

    if (!updatedRows[index]) {
      updatedRows[index] = {
        id: value,
        issueMasterId: 0,
        vatAmount: 0,
        deductedVatAmount: 0,
        totalAmountLocalCurr: 0,
        challanDate: dayjs().format("DD-MM-YYYY"),
      };
    } else {
      updatedRows[index].id = value;
    }

    setRows(updatedRows);
    setCustomerIdEnabled(true); // Enable customerId when a new row is created
  };

  useEffect(() => {
    // Reset selectedChallanNos when the component mounts or when initializing rows
    setSelectedChallanNos(new Set());
  }, []);

  //Handle Function

  const handleSelectChangeChallan = (value: any, index: any) => {
    // Check if the challanNo has already been selected for the current row
    if (selectedChallans[index] === value) {
      console.log(`ChallanNo ${value} has already been selected for this row.`);
      message.error("Challan No has already been Selected for this row");
      return;
    }

    console.log("Selected Challans:", selectedChallans);
    console.log("Deleted Challans:", deletedChallanNos);

    // Check if the challanNo has already been selected for another row
    if (selectedChallans.includes(value) && !deletedChallanNos.has(value)) {
      console.log(
        `ChallanNo ${value} has already been selected for another row.`
      );
      message.error("Challan No has already been Selected for another row");
      return;
    }
    console.log(`Selected Challan: ${value}, Index: ${index}`);

    const selectedChildItem =
      chalanData?.result?.vdsSellerChildRequestDtos.find(
        (item: any) => item.issueMasterId === value
      );

    if (selectedChildItem) {
      const formattedChallanDate = new Date(
        selectedChildItem.challanDate
      ).toLocaleDateString();
      console.log(`Formatted Challan Date: ${formattedChallanDate}`);

      const updatedRows = [...rows];
      console.log(updatedRows, "updated rows");
      updatedRows[index].issueMasterId = selectedChildItem?.issueMasterId;
      updatedRows[index].challanDate = formattedChallanDate;
      updatedRows[index].vatAmount = selectedChildItem?.vatAmount;
      updatedRows[index].totalAmountLocalCurr =
        selectedChildItem?.totalAmountLocalCurr;

      setRows(updatedRows);
      setCustomerIdEnabled(false);

      // Update the selectedChallans array
      setSelectedChallans((prevChallans) => {
        const newChallans = [...prevChallans];
        newChallans[index] = value;
        return newChallans;
      });

      // Add the selected issueMasterId to the set
      setSelectedIssueMasterIds((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(value);
        return newSet;
      });
    }
    console.log("After logic:", selectedChallans);
  };

  // Function to handle deleting rows
  const deleteSelectedRows = () => {
    const updatedRows = rows.filter(
      (row, index) => !selectedRows.includes(index)
    );

    // Extract the issueMasterIds of the deleted rows
    const deletedIssueMasterIds = selectedRows.map(
      (index) => rows[index]?.issueMasterId
    );

    // Remove the deleted issueMasterIds from the selectedChallans array
    setSelectedChallans((prevChallans) =>
      prevChallans.filter(
        (challanId) => !deletedIssueMasterIds.includes(challanId)
      )
    );

    // Update the rows state
    setRows(updatedRows);

    // Remove the deleted issueMasterIds from the selectedChallanNos set
    setSelectedChallanNos((prevSet) => {
      const newSet = new Set(prevSet);
      deletedIssueMasterIds.forEach((id) => newSet.delete(id));
      return newSet;
    });

    // Update the selectedIssueMasterIds set
    setSelectedIssueMasterIds(
      (prevSet) =>
        new Set(
          [...prevSet].filter((id) => !deletedIssueMasterIds.includes(id))
        )
    );

    // Add the deleted issueMasterIds to the deletedChallanNos set
    setDeletedChallanNos((prevSet) => {
      const newSet = new Set(prevSet);
      deletedIssueMasterIds.forEach((id) => newSet.add(id));
      return newSet;
    });

    // Reset selectedChallans when all rows are deleted
    if (updatedRows.length === 0) {
      setSelectedChallans([]);
      // Enable customerId when all rows are deleted
      setCustomerIdEnabled(true);
    } else {
      // Disable customerId when rows are deleted
      setCustomerIdEnabled(false);
    }

    // Clear selected rows
    setSelectedRows([]);
  };

  const disabledOptions = (option: any) => {
    return selectedChallanNos.has(option.value);
  };

  useEffect(() => {
    const challanDataOptions =
      chalanData &&
      chalanData?.result?.vdsSellerChildRequestDtos?.map((vdsseller: any) => {
        console.log(" VDS Purchase Data ..", vdsseller);

        // Check if challanDate is defined and not null
        const formattedChallanDate = vdsseller?.challanDate
          ? new Date(vdsseller?.challanDate).toISOString().split("T")[0]
          : null;

        return {
          label: vdsseller?.challanNumber,
          value: parseInt(vdsseller?.issueMasterId),
          challanDate: formattedChallanDate,
          vatAmount: vdsseller?.vatAmount,
          totalAmountLocalCurr: vdsseller?.totalAmountLocalCurr,
        };
      });

    setChallanOptions(challanDataOptions);
  }, [chalanData, rows]);

  //Customer Name Drop down
  const customerNameOptions =
    customers &&
    customers.map((vdsseller: any) => {
      return {
        label: vdsseller?.name,
        value: parseInt(vdsseller?.id),
      };
    });

  //Commisionearte Name Drop down
  const commisionerRateNameOptions =
    commisioneRates &&
    commisioneRates.map((vdsseller: any) => {
      return {
        label: vdsseller?.name,
        value: parseInt(vdsseller?.id),
      };
    });

  //VAT Deposit Account Code Drop Down
  const vatDepositAccountCodeOptions =
    tcAccCodes &&
    tcAccCodes.map((vdsseller: any) => {
      return {
        label: vdsseller?.name,
        value: parseInt(vdsseller?.id),
      };
    });

  const [publishDate, setPublishDate] = useState(dayjs().format("YYYY-MM-DD"));

  const selectPublishDate = (value: Dayjs | null) => {
    setPublishDate(value ? value.format("YYYY-MM-DD") : "");
  };

  // submit handler
  const onSubmit = async (values: any) => {
    values.storeId = 8;
    values.branchId = 95;
    values.vmId = vatMonthData
      ?.map((item: { id: number }) => item.id)
      .join(", ");
    values.transactionDate = dayjs(selectedDate).format("YYYY-MM-DD");
    values.publishedDate = dayjs(publishDate).format("YYYY-MM-DD");
    values.totalIssueAmount = totalIssueAmount;
    values.totalVatAmount = totalVatAmount;
    values.totalDeductedVatAmount = totalDeductedVatAmount;

    values.vdsSellerChildRequestDtos = [...rows];

    // Check if there is at least one non-empty row among filled rows (other than the default row)
    const nonEmptyRows = values.vdsSellerChildRequestDtos
      .slice(-1)
      .filter(
        (row: any) =>
          row.issueMasterId !== 0 ||
          row.challanDate !== dayjs().format("DD-MM-YYYY") ||
          row.totalAmountLocalCurr !== 0.0 ||
          row.vatAmount !== 0.0 ||
          row.deductedVatAmount !== 0.0
      );

    if (nonEmptyRows.length === 0) {
      message.error(
        "Please fill in at least one row with valid data before submitting"
      );
      return;
    }

    try {
      console.log("on submit");
      setLoading(true);
      const res = await createVdsSeller(values);

      if (res) {
        if (res.data && res.data.code === 400 && res.data.error) {
          res.data.error.forEach((error: { key: string; value: string }) => {
            const fieldName = error.key;
            const errorMessage = error.value;
            message.error(`${fieldName} field: ${errorMessage}`);
          });
        } else if (res.data && res.data.result) {
          message.success("VDS Seller Created  successfully!");
          router.push(
            `/super_admin/commercial/vds-for-seller/view/${res?.data?.result?.id}`
          );
          setLoading(false);
        } else {
          message.error("Error!! Insert Failed");
        }
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
    // handleReset();
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleResetChildRows = () => {
    // Reset the child rows to their initial state
    setChallanOptions([]);
    setSelectedChallan(null);
    setRows([createEmptyRow()]);
    setCustomerIdEnabled(true);
    setSelectedChallans([]);
  };

  const methods = useForm({
    resolver: yupResolver(vdsSellerSchema),
  });

  const { handleSubmit, reset } = methods;

  const handleReset = () => {
    reset(); // Reset the form to its default state
    handleResetChildRows();
  };

  // Helper function to create an empty row
  const createEmptyRow = () => ({
    // Initialize properties for empty row
    issueMasterId: 0,
    challanDate: "",
    totalAmountLocalCurr: 0,
    vatAmount: 0,
    deductedVatAmount: 0,
  });

  //Remarks Functions

  const [remarks, setRemarks] = useState("");

  const handleChange = (e: any) => {
    const newValue = e.target.value;

    if (newValue.length < 50) {
      setRemarks(newValue);
    } else {
      message.error("Remarks cannot exceed 50 characters");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="VDS Seller"
        lastName="Create"
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: "0px", marginTop: "12px" }}>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  <FormInput
                    type="text"
                    name=""
                    label="VDS Seller ID"
                    value="***</NEW/>***"
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
                  <FormDatePicker
                    name=""
                    value={trasactionDate ? dayjs(trasactionDate) : null}
                    label="Transaction Date:"
                    onChange={(value) => handleDateChange(value)}
                    required
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  {
                    <>
                      <FormInput
                        style={{ width: "100%", textAlign: "left" , color: "black" }}
                        name="vmId"
                        value={names}
                        label="VAT Month"
                        placeholder="VAT Month"
                        required
                        disable
                      />
                      {selectedDate && vatMonthData === undefined && (
                        <div style={{ color: "red", marginBottom: "10px" }}>
                          Transaction Date hasn't any VAT Month!
                        </div>
                      )}
                    </>
                  }
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  <FormInput
                    style={{ width: "100%", textAlign: "left" }}
                    type="text"
                    name="certificateNo"
                    label="Certificate No"
                    required
                    placeholder="Enter Certificate No"
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  <FormDatePicker
                    name=""
                    value={publishDate ? dayjs(publishDate) : null}
                    onChange={(value) => selectPublishDate(value)}
                    label="Certificate Date"
                    required
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  <DRZSelectField
                    style={{ width: "100%", textAlign: "left" }}
                    name="customerId"
                    options={customerNameOptions}
                    label="Customer Name"
                    placeholder="Select Customer..."
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}
                    disable={!customerIdEnabled} // Disable if a challanNo is selected
                    onChange={(value: any, index: any) =>
                      handleSelectChange(value, index)
                    }
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  <DRZSelectField
                    style={{ width: "100%", textAlign: "left" }}
                    name="commisionerateId"
                    options={commisionerRateNameOptions}
                    label="Commisionerate Name"
                    placeholder="Select Commisionerate..."
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  <DRZSelectField
                    style={{ width: "100%", textAlign: "left" }}
                    name="tcAcctCodeId"
                    options={vatDepositAccountCodeOptions}
                    label="VAT Diposit Account Code"
                    placeholder="Select Code..."
                    required
                    onSearch={onSearch}
                    filterOption={filterOption}
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
                    name="totalIssueAmount"
                    value={`${amount(totalIssueAmount)}`}
                    label="Total Issue Amount"
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
                    value={`${amount(totalVatAmount)}`}
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
                    value={`${amount(totalDeductedVatAmount)}`}
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
                    style={{ width: "100%", textAlign: "left" }}
                    label="Remark:"
                    type="text"
                    name="remarks"
                    value={remarks}
                    onChange={handleChange}
                    placeholder="Remarks...."
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
                            <input
                              type="checkbox"
                              checked={selectedRows.length === rows.length}
                              onChange={toggleSelectAll}
                              className="form-checkbox h-5 w-5 text-indigo-600"
                            />
                          </th>
                          <th className="px-2 py-2">Challan No</th>
                          <th className="px-2 py-2 ">Challan Date</th>
                          <th className="px-2 py-2 ">Sell Amount </th>
                          <th className="px-2 py-2">VAT Amount</th>
                          <th className="px-2 py-2">Deducted VAT Amount</th>
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
                              <DRZSelectField
                                style={{ width: "100%" }}
                                placeholder="Select Challan"
                                // name={`tableData[${index}].challanNumber`}
                                name=""
                                onChange={(value) =>
                                  handleSelectChangeChallan(value, index)
                                }
                                options={challanOptions}
                                onSearch={onSearch}
                                filterOption={filterOption}
                              />
                            </td>

                            <td>
                              <FormInput
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  color: "black",
                                }}
                                type="text"
                                name=""
                                placeholder="DD-MM-YYYY"
                                value={
                                  row.challanDate &&
                                  dayjs(row.challanDate).isValid()
                                    ? dayjs(row.challanDate).format(
                                        "DD-MM-YYYY"
                                      )
                                    : undefined
                                }
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index].challanDate =
                                    e.target.value;
                                  setRows(updatedRows);
                                }}
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
                                type="number"
                                name="totalAmountLocalCurr"
                                value={row.totalAmountLocalCurr.toString()}
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index].totalAmountLocalCurr =
                                    parseFloat(e.target.value);
                                  setRows(updatedRows);
                                }}
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
                                type="number"
                                name="vatAmount"
                                value={row.vatAmount.toString()}
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index].vatAmount = parseFloat(
                                    e.target.value
                                  );
                                  setRows(updatedRows);
                                }}
                                disable
                              />
                            </td>

                            <td>
                              <input
                                type="number"
                                style={{
                                  width: "100%",
                                  textAlign: "left",
                                  padding: "6px",
                                  borderRadius: "5px",
                                  borderColor: "1px solid #ccc!important",
                                }}
                                name="deductedVatAmount"
                                placeholder="0.0"
                                value={
                                  row.deductedVatAmount === null
                                    ? ""
                                    : row.deductedVatAmount?.toString()
                                }
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  const newValue = e.target.value.trim();

                                  if (newValue === "") {
                                    updatedRows[index].deductedVatAmount = null;
                                  } else {
                                    const parsedValue = parseFloat(newValue);

                                    if (
                                      !isNaN(parsedValue) &&
                                      parsedValue >= 0 &&
                                      parsedValue <= row.vatAmount
                                    ) {
                                      updatedRows[index].deductedVatAmount =
                                        parsedValue;
                                    } else {
                                      updatedRows[index].deductedVatAmount >= 0;
                                      setErrorMessages((prevMessages) => {
                                        const newMessages = [...prevMessages];
                                        newMessages[index] =
                                          "You have entered an invalid value!";
                                        return newMessages;
                                      });

                                      message.error(
                                        "You have entered an invalid value!"
                                      );
                                    }
                                  }

                                  setRows(updatedRows);
                                }}
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
                        onClick={addVdsSellerRow}
                        style={{
                          background: "#02BBDB",
                          color: "white",
                        }}
                        disabled={!(challanOptions && rows)}
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
              </Row>
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
                <button
                  className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#363434] bg-[#b9aba4] cursor-pointer focus:outline-none font-medium text-sm text-center border-none`}
                  onClick={handleReset}
                >
                  Reset
                </button>
                <DarazCommonButton type="submit">Save</DarazCommonButton>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CreateVdsForSeller;
