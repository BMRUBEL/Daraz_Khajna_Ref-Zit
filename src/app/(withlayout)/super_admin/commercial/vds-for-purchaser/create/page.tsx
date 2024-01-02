/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, Select, Table, message } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { BaseSyntheticEvent } from "react";
import * as yup from "yup";
import { useState, useEffect } from "react";

import FormCheckbox from "@/components/Forms/DarazCheckBox";
import Loading from "@/app/loading";
import {
  useVdsPurchaserDropDownQuery,
  useAddVdsPurchaseMutation,
  useVdsPurchaserDateQuery,
  useVdsPurchaseDropDownChildQuery,
} from "@/redux/api/commercialApi/vdsPurchaserApi";
import { useRouter } from "next/navigation";
import { amount } from "../../../../../../utils/amountFormat";
import dayjs, { Dayjs } from "dayjs";
import { useForm, FormProvider } from "react-hook-form";
import { vdsPurchaseSchema } from "@/schemas/commercial/vdsPurchase";

interface RowDataType {
  // id: number;
  receiveMasterId: number;
  vatAmount: number;
  deductedVatAmount: number;
  receiveAmount: number;
  challanDate: string; // Assuming effectiveDate is a string or null
}

const VdsPurchaser = () => {
  const [createVdsPurchaser] = useAddVdsPurchaseMutation();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [selectedChallan, setSelectedChallan] = useState<number | null>(null);
  const [sellerIdEnable, setSellerIdEnable] = useState<boolean>(true);
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
      // id: 1,
      receiveMasterId: 1,
      challanDate: "",
      vatAmount: 0,
      deductedVatAmount: 0,
      receiveAmount: 0,
    },
  ]);
  const [selectedChallans, setSelectedChallans] = useState<
    Array<number | null>
  >(Array(rows.length).fill(null));

  const [rowData, setRowData] = useState<RowDataType>({
    // id: 1,
    receiveMasterId: 1,
    challanDate: "",
    vatAmount: 0.0,
    deductedVatAmount: 0.0,
    receiveAmount: 0.0,
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // Function to handle adding rows
  const addVdsSellerRow = () => {
    // Check if rows and challanOptions are defined
    if (rows && challanOptions) {
      // Check the condition for allowing the creation of a new row
      if (rows.length < challanOptions.length) {
        const newRow = {
          // id: 1,
          receiveMasterId: 1,
          challanDate: "",
          receiveAmount: 0.0,
          vatAmount: 0.0,
          deductedVatAmount: 0.0,
        };

        // Reset relevant state variables
        setSelectedChallan(null); // Assuming you want to reset selectedChallan
        setSelectedChallanNos(new Set()); // Reset selectedChallanNos
        setSelectedIssueMasterIds(new Set()); // Reset selectedIssueMasterIds

        // Clear the deletedChallanNos set
        setDeletedChallanNos(new Set());

        setRows([...rows, newRow]);
      } else {
        // Handle the case when the condition is not met
        message.error("Cannot add more rows. Limit reached.");
      }
    } else {
      // Handle the case when rows or challanOptions are not defined
      message.error("Rows or challanOptions is not defined.");
    }
  };

  // Total Issue amount
  const totalPurchaseAmount = rows.reduce(
    (sum, row) => sum + row.receiveAmount,
    0
  );
  //Total Vat amount
  const totalVatAmount = rows.reduce((sum, row) => sum + row.vatAmount, 0);

  // Total Deducted amount
  const totalDeductedVatAmount = rows.reduce(
    (sum, row) => sum + row.deductedVatAmount,
    0
  );

  // const toggleSelect = (index: number) => {
  //   const selectedIndex = selectedRows.indexOf(index);
  //   if (selectedIndex === -1) {
  //     setSelectedRows([...selectedRows, index]);
  //   } else {
  //     const updatedSelectedRows = [...selectedRows];
  //     updatedSelectedRows.splice(selectedIndex, 1);
  //     setSelectedRows(updatedSelectedRows);
  //   }
  // };

  const toggleSelect = (index: number) => {
    console.log("Before toggle:", selectedRows);

    const selectedIndex = selectedRows.indexOf(index);
    if (selectedIndex === -1) {
      setSelectedRows([...selectedRows, index]);
      console.log("After toggle (select):", [...selectedRows, index]);
    } else {
      const updatedSelectedRows = [...selectedRows];
      updatedSelectedRows.splice(selectedIndex, 1);
      setSelectedRows(updatedSelectedRows);
      console.log("After toggle (deselect):", updatedSelectedRows);
    }
  };

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

  // const deleteSelectedRows = () => {
  //   const updatedRows = rows.filter(
  //     (row, index) => !selectedRows.includes(index)
  //   );
  //   setRows(updatedRows);
  //   setSelectedRows([]);
  // };

  const { data, isLoading } = useVdsPurchaserDropDownQuery({});

  const supplierNames = data?.result?.supplierType;

  const supplierNameOptions =
    supplierNames &&
    supplierNames.map((vdssupplier: any) => {
      return {
        label: vdssupplier?.name,
        value: parseInt(vdssupplier?.id),
      };
    });

  const [selectedDate, setSelectedDate] = useState<any>(
    dayjs().format("YYYY-MM-DD")
  );

  //Sending same date pattern as api
  const handleDateChange = (value: any) => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    console.log("Selected Date:", formattedDate);
    setSelectedDate(formattedDate);
    setTrasactionDate(value ? value.format("YYYY-MM-DD") : "");
  };

  const { data: vdsDate } = useVdsPurchaserDateQuery(selectedDate);

  const [trasactionDate, setTrasactionDate] = useState("");

  const vatMonthData = vdsDate?.result?.vatMonth;
  const names = vatMonthData
    ? vatMonthData.map((item: { name: string }) => item.name).join(", ")
    : "";

  //Dependent Drop Down call
  const [id, setId] = useState("");

  const { data: chalanData } = useVdsPurchaseDropDownChildQuery(id);

  //Chalan Drop Down
  console.log(chalanData, "ChalanData");

  const handleSelectChange = (value: any, index: any) => {
    setId(value);
    const updatedRows: RowDataType[] = [...rows];

    if (!updatedRows[index]) {
      updatedRows[index] = {
        id: value,
        receiveMasterId: 0,
        vatAmount: 0,
        deductedVatAmount: 0,
        receiveAmount: 0,
        challanDate: "",
      };
    } else {
      updatedRows[index].id = value;
    }

    setRows(updatedRows);
    setSellerIdEnable(true); // Enable customerId when a new row is created
  };

  const handleSelectChangeChallan = (value: any, index: any) => {
    // Check if the challanNo has already been selected for another row
    if (selectedChallans.includes(value)) {
      console.log(
        `ChallanNo ${value} has already been selected for another row.`
      );
      message.error("Challan No has already been Selected for another row");
      return;
    }

    // Check if the challanNo has already been selected for the current row
    if (selectedChallans[index] === value) {
      console.log(`ChallanNo ${value} has already been selected for this row.`);
      message.error("Challan No has already been Selected for this row");
      return;
    }

    console.log(`Selected Challan: ${value}, Index: ${index}`);

    const selectedChildItem =
      chalanData?.result?.c1receiveMasterResponseDtos.find(
        (item: any) => item.receiveMasterId === value
      );

    if (selectedChildItem) {
      const formattedChallanDate = new Date(
        selectedChildItem.challanDate
      ).toLocaleDateString();
      console.log(`Formatted Challan Date: ${formattedChallanDate}`);

      const updatedRows = [...rows];
      updatedRows[index].receiveMasterId = selectedChildItem?.receiveMasterId;
      updatedRows[index].challanDate = formattedChallanDate;
      updatedRows[index].vatAmount = selectedChildItem?.vatAmount;
      updatedRows[index].receiveAmount = selectedChildItem?.receiveAmount;

      setRows(updatedRows);
      setSellerIdEnable(false);

      // Update the selectedChallans array
      setSelectedChallans((prevChallans) => {
        const newChallans = [...prevChallans];
        newChallans[index] = value;
        return newChallans;
      });

      // Add the selected receiveMasterId to the set
      setSelectedIssueMasterIds((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(selectedChildItem.receiveMasterId);
        return newSet;
      });
    }
  };

  // Function to handle deleting rows
  const deleteSelectedRows = () => {
    console.log("Before deletion - rows:", rows);
    console.log("Before deletion - selectedRows:", selectedRows);

    // Remove the deleted rows' issueMasterIds from the set
    const deletedIssueMasterIds = selectedRows.map(
      (index) => rows[index]?.receiveMasterId
    );

    // Filter out rows with matching receiveMasterIds
    const updatedRows = rows.filter(
      (row) => !deletedIssueMasterIds.includes(row?.receiveMasterId)
    );

    console.log("After deletion - updatedRows:", updatedRows);

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
      setSellerIdEnable(true);
    } else {
      // Disable customerId when rows are deleted
      setSellerIdEnable(false);
    }

    // Clear selected rows
    setSelectedRows([]);
    // Reset selectedChallan when rows are deleted
    setSelectedChallan(null);

    console.log("After deletion - final state:");
    console.log("Rows:", updatedRows);
    console.log("SelectedChallanNos:", selectedChallanNos);
    console.log("SelectedIssueMasterIds:", selectedIssueMasterIds);
    console.log("DeletedChallanNos:", deletedChallanNos);
    console.log("SelectedChallans:", selectedChallans);
    console.log("SellerIdEnable:", sellerIdEnable);
    console.log("SelectedChallan:", selectedChallan);

    // Update selectedRows to remove indices that are now out of bounds
    const updatedSelectedRows = selectedRows.filter(
      (index) => index < updatedRows.length
    );
    setSelectedRows(updatedSelectedRows);

    console.log("After deletion - updated selectedRows:", updatedSelectedRows);
  };

  useEffect(() => {
    const challanDataOptions =
      chalanData &&
      chalanData?.result?.c1receiveMasterResponseDtos?.map(
        (vdspurchaser: any) => {
          console.log(" VDS Purchase Data ..", vdspurchaser);
          // Check if challanDate is defined and not null
          const formattedChallanDate = vdspurchaser?.challanDate
            ? new Date(vdspurchaser?.challanDate).toISOString().split("T")[0]
            : null;
          return {
            label: vdspurchaser?.challanNo,
            value: parseInt(vdspurchaser?.receiveMasterId),
            challanDate: formattedChallanDate,
            vatAmount: vdspurchaser?.vatAmount,
            receiveAmount: vdspurchaser?.receiveAmount,
          };
        }
      );
    setChallanOptions(challanDataOptions);
  }, [chalanData]);

  const [publishDate, setPublishDate] = useState(dayjs().format("YYYY-MM-DD"));

  const selectPublishDate = (value: Dayjs | null) => {
    setPublishDate(value ? value.format("YYYY-MM-DD") : "");
  };

  //submit Handler

  const onSubmit = async (values: any) => {
    values.storeId = 8;
    values.branchId = 95;
    values.vmId = vatMonthData
      ?.map((item: { id: number }) => item.id)
      .join(", ");
    values.transactionDate = dayjs(selectedDate).format("YYYY-MM-DD");
    values.publishedDate = dayjs(publishDate).format("YYYY-MM-DD");
    values.totalDeductedVatAmount = totalDeductedVatAmount;
    values.totalVatAmount = totalVatAmount;
    values.totalPurchaseAmount = totalPurchaseAmount;
    values.vdsPurchaseChild6D2RequestDtos = [...rows];

    try {
      console.log("Submitted Data", values);
      setLoading(true);
      const res = await createVdsPurchaser(values);

      if ("data" in res && res.data && res.data.result) {
        message.success("Purchase Created Successfully!");
        router.push(
          `/super_admin/commercial/vds-for-purchaser/view/${res?.data?.result?.id}`
        );
        setLoading(false);
      } else {
        // Handle API errors or validation errors
        message.error(
          "Failed to update purchase. Please check the data and try again."
        );
      }
    } catch (err: any) {
      console.error(err.message);
      // Handle other errors (e.g., network issues)
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleResetChildRows = () => {
    // Reset the child rows to their initial state
    setChallanOptions([]);
    setSelectedChallan(null);
    setRows([createEmptyRow()]);
    setSellerIdEnable(true);
    setSelectedChallans([]);
  };

  const methods = useForm({
    resolver: yupResolver(vdsPurchaseSchema),
  });

  const { handleSubmit, reset } = methods;

  const handleReset = () => {
    reset(); // Reset the form to its default state
    handleResetChildRows();
  };

  // Helper function to create an empty row
  const createEmptyRow = () => ({
    // Initialize properties for empty row
    receiveMasterId: 1,
    challanDate: "",
    vatAmount: 0,
    deductedVatAmount: 0,
    receiveAmount: 0,
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

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="VDS Purchase"
        lastName="Insert"
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ padding: "0px", marginTop: "12px" }}>
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
                    label="VDS Purchaser ID"
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
                  <FormDatePicker
                    name=""
                    value={trasactionDate ? dayjs(trasactionDate) : null}
                    label="Transaction Date:"
                    size="large"
                    onChange={handleDateChange}
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
                    name="vmId"
                    value={names}
                    label="VAT Month"
                    placeholder="VAT Month"
                    required
                    readOnly
                    disable
                  />
                  {selectedDate && vatMonthData === undefined && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                      Transaction Date hasn't any VAT Month!
                    </div>
                  )}
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{ marginBottom: "20px" }}
                >
                  <DRZSelectField
                    style={{ width: "100%", textAlign: "left" ,color: "black"}}
                    name="supplierId"
                    options={supplierNameOptions}
                    label="Supplier Name"
                    placeholder="Select Supplier"
                    disable={!sellerIdEnable} // Disable if a challanNo is selected
                    onChange={(value: any, index: any) =>
                      handleSelectChange(value, index)
                    }
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
                    style={{ width: "100%", textAlign: "left" }}
                    type="text"
                    name=""
                    label="Certificate No:"
                    placeholder="<<<New>>>"
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
                    value={publishDate ? dayjs(publishDate) : null}
                    onChange={(value) => selectPublishDate(value)}
                    label="Published Date:"
                    size="large"
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
                    name="totalPurchaseAmount"
                    label="Total Purchase Amount"
                    value={`${amount(totalPurchaseAmount)}`}
                    required
                    readOnly={true}
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
                    value={`${amount(totalVatAmount)}`}
                    required
                    readOnly={true}
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
                    name="totalDeductedVatAmount"
                    label="Deducted VAT Amount"
                    value={`${amount(totalDeductedVatAmount)}`}
                    required
                    readOnly={true}
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
                    label="Remarks:"
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
                  {/* form child  start */}

                  <div className="relative overflow-x-auto sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="bg-orange-thead text-sm text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                          <th className="px-2 py-2">Challan Date</th>
                          <th
                            className="px-2 py-2"
                            style={{
                              width: "15%",
                            }}
                          >
                            Receive Amount
                          </th>
                          <th
                            className="px-2 py-2"
                            style={{
                              width: "20%",
                            }}
                          >
                            VAT Amount
                          </th>
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
                                style={{
                                  width: "100%",
                                }}
                                name=""
                                placeholder="Select Challan"
                                // optionFilterProp="children"
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
                                name="receiveAmount"
                                value={row?.receiveAmount?.toString()}
                                onChange={(e) => {
                                  const updatedRows = [...rows];
                                  updatedRows[index].receiveAmount = parseFloat(
                                    e.target.value
                                  );
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
                                value={row?.vatAmount?.toString()}
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
                  {/* form child end  */}
                </Col>
              </Row>

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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <Link href={`/super_admin/commercial/vds-for-purchaser`}>
                    {" "}
                    <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                  </Link>
                  <button
                    className={`text-white py-2 px-4 rounded shadow-md hover:shadow-lg hover:bg-[#363434] bg-[#b9aba4] cursor-pointer focus:outline-none font-medium text-sm text-center border-none`}
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <DarazCommonButton>Save</DarazCommonButton>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default VdsPurchaser;
