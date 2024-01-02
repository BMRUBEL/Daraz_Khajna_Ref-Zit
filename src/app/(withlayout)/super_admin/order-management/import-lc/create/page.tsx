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
  useImportLcInformationDropDownQuery,
  useAddImportLcInformationMutation,
  useImportLCDateQuery,
  useImportLcInformationChildDropDownQuery
} from "@/redux/api/OrderManagementApi/importLcInformationApi";
import { useRouter } from "next/navigation";
import { amount } from '../../../../../../utils/amountFormat';
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";



interface RowDataType {
  // id: number;
  otherAdjustId: number;
  vatAmount: number;
  vatAdjustableAmount: number;
  billAmount: number;

}

const ImportLC = () => {


  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [selectedChallan, setSelectedChallan] = useState<number | null>(null);
  const [sellerIdEnable, setSellerIdEnable] = useState<boolean>(true);
  const [selectedChallanNos, setSelectedChallanNos] = useState<Set<number>>(new Set());
  const [selectedIssueMasterIds, setSelectedIssueMasterIds] = useState(new Set());
  const [challanOptions, setChallanOptions] = useState([]);
  const [deletedChallanNos, setDeletedChallanNos] = useState<Set<number>>(new Set());


  const options = [
    { value: "", label: "" },

    // Add more options as needed
  ];

  const [rows, setRows] = useState([
    {
      // id: 1,
      otherAdjustId: 1,
      vatAmount: 0,
      vatAdjustableAmount: 0,
      billAmount: 0
    }
  ])
  const [selectedChallans, setSelectedChallans] = useState<Array<number | null>>(Array(rows.length).fill(null));

  const [rowData, setRowData] = useState<RowDataType>({
    // id: 1,
    otherAdjustId: 1,
    vatAmount: 0.0,
    vatAdjustableAmount: 0.0,
    billAmount: 0.0
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
          otherAdjustId: 1,
          billAmount: 0.0,
          vatAmount: 0.0,
          vatAdjustableAmount: 0.0,
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
  const totalBilAmount = rows.reduce(
    (sum, row) =>
      sum +
      row.billAmount,
    0
  );
  //Total Vat amount
  const totalVatAmount = rows.reduce((sum, row) => sum + row.vatAmount, 0);

  // Total Deducted amount
  const totalAdjustableAmount = rows.reduce((sum, row) => sum + row.vatAdjustableAmount, 0);





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


  const { data, isLoading } = useImportLcInformationDropDownQuery({});

  const adjestmentData = data?.result?.adjustmentType;

  const adjustmentOptions =
    adjestmentData && adjestmentData.map((adjestmenttype: any) => {
      return {
        label: adjestmenttype?.name,
        value: parseInt(adjestmenttype?.id),
      };
    });



  const [selectedDate, setSelectedDate] = useState<string>('');




  //Sending same date pattern as api
  const handleDateChange = (value: any) => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log('Selected Date:', formattedDate);
    setSelectedDate(formattedDate);
  };




  const { data: vdsDate } = useImportLCDateQuery(selectedDate);

  const vdsData = vdsDate?.result?.vatMonth;

  console.log(vdsData, "VAT Month ID selected")


  //Dependent Drop Down call
  const [id, setId] = useState("");

  const { data: adjustableData } = useImportLcInformationChildDropDownQuery({});

  //Chalan Drop Down
  console.log(adjustableData, "Adjustable Description")



  const handaleSelectItem = (value: any, index: any) => {
    // Check if the challanNo has already been selected for another row
    if (selectedChallans.includes(value)) {
      console.log(`Item ${value} has already been selected for another row.`);
      message.error("Item has already been Selected for another row");
      return;
    }

    // Check if the challanNo has already been selected for the current row
    if (selectedChallans[index] === value) {
      console.log(`Item ${value} has already been selected for this row.`);
      message.error("Item has already been Selected for this row");
      return;
    }

    console.log(`Selected Challan: ${value}, Index: ${index}`);

    const selectedChildItem = adjustableData?.result?.adjustableType.find(
      (item: any) => item.id === value
    );

    if (selectedChildItem) {

      const updatedRows = [...rows];
      // updatedRows[index].otherAdjustId = selectedChildItem?.otherAdjustId;
      // updatedRows[index].vatAmount = selectedChildItem?.vatAmount;
      // updatedRows[index].billAmount = selectedChildItem?.billAmount;
      // updatedRows[index].vatAdjustableAmount = selectedChildItem?.vatAdjustableAmount;

      setRows(updatedRows);
      setSellerIdEnable(false);

      // Update the selectedChallans array
      setSelectedChallans((prevChallans) => {
        const newChallans = [...prevChallans];
        newChallans[index] = value;
        return newChallans;
      });

      // Add the selected otherAdjustId to the set
      setSelectedIssueMasterIds((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(selectedChildItem.otherAdjustId);
        return newSet;
      });
    }
  };

  // Function to handle deleting rows
  const deleteSelectedRows = () => {
    const updatedRows = rows.filter((row, index) => !selectedRows.includes(index));

    // Remove the deleted rows' issueMasterIds from the set
    const deletedIssueMasterIds = selectedRows.map((index) => rows[index]?.otherAdjustId);

    // Update the rows state
    setRows(updatedRows);

    // Remove the deleted issueMasterIds from the selectedChallanNos set
    setSelectedChallanNos((prevSet) => {
      const newSet = new Set(prevSet);
      deletedIssueMasterIds.forEach((id) => newSet.delete(id));
      return newSet;
    });

    // Update the selectedIssueMasterIds set
    setSelectedIssueMasterIds((prevSet) =>
      new Set([...prevSet].filter((id) => !deletedIssueMasterIds.includes(id)))
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
  };



  useEffect(() => {
    const challanDataOptions =
      adjustableData &&
      adjustableData?.result?.adjustableType?.map((otheradjustment: any) => {
        console.log(" VDS Purchase Data ..", otheradjustment)

        return {
          label: otheradjustment?.adjustmentDescription,
          value: parseInt(otheradjustment?.id),
          adjustmentDescriptionBn: otheradjustment?.adjustmentDescriptionBn,

        };

      });
    setChallanOptions(challanDataOptions);

  }, [adjustableData]);

  const [createAdjustment] = useAddImportLcInformationMutation();

  //submit Handler

  const onSubmit = async (values: any) => {

    values.storeId = 8;
    values.vmId = vdsData?.map((item: { id: number }) => item.id).join(', ');
    values.totalBilAmount = totalBilAmount
    values.totalVatAmount = totalVatAmount
    values.totalAdjustableAmount = totalAdjustableAmount
    values.vdsOtherChildRequestDtos = [...rows];


    try {
      console.log("Submitted Data", values);
      setLoading(true);
      const res = await createAdjustment(values);

      if ('data' in res && res.data && res.data.result) {
        message.success("Purchase Created Successfully!");
        router.push(`/super_admin/commercial/others-adjustment/view/${res?.data?.result?.id}`);
        setLoading(false);
      } else {
        // Handle API errors or validation errors
        message.error("Failed to update purchase. Please check the data and try again.");
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

  if (isLoading) {
    return <Loading />;
  }



  return (
    <div style={{ padding: "10px" }}>

      <UMBreadCrumb pageName="Import LC Information" lastName="Create" link={"/super_admin/order-management/import-lc"} />

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
          // resolver={yupResolver(formSchema)}
          submitHandler={onSubmit}
        >
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
                <FormDatePicker
                  name="transactionDate"
                  label="Application Date:"
                  size="large"
                  onChange={handleDateChange}
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
                    {value: true, label: "Applied"},
                    {value: false, label: "Opened"},
                  ]}
                  defaultValue={true}
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
                  placeholder="Import LC No..."
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
                  name="transactionDate"
                  label="BB/Import LC Date:"
                  size="large"
                  onChange={handleDateChange}
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
                  placeholder="Import LC Amount..."
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
                  name="adjustmentId"
                  options={adjustmentOptions}
                  label="Opening Bank"
                  placeholder="Select Bank"

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
                  name="adjustmentId"
                  options={adjustmentOptions}
                  label="BBLC Currency"
                  placeholder="Select BBLC Currency"

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
                  name="adjustmentId"
                  options={adjustmentOptions}
                  label="Purpose"
                  placeholder="Select Purpose"
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
                  name="transactionDate"
                  label="LC Expiry Date:"
                  size="large"
                  onChange={handleDateChange}
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="adjustmentId"
                  options={adjustmentOptions}
                  label="Advising Bank"
                  placeholder="Select Advising Bank..."
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
                  name="adjustmentId"
                  options={adjustmentOptions}
                  label="Supplier Name"
                  placeholder="Select Supplier Name..."
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
                  name="adjustmentId"
                  options={adjustmentOptions}
                  label="Export LC No"
                  placeholder="Select Export LC No..."
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
                  name="transactionDate"
                  label="Export LC Date:"
                  size="large"
                  onChange={handleDateChange}
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
                  placeholder="Select UP/UD No..."
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
                  name="transactionDate"
                  label="UP/IP Date:"
                  size="large"
                  onChange={handleDateChange}
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
                  placeholder="Remarks...."
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
                        <th className="px-2 py-2"
                          style={{
                            width: "15%",
                            textAlign: "center"
                          }}
                        >
                          Item Name
                        </th>

                        <th
                          className="px-2 py-2"
                          style={{
                            width: "15%",
                            textAlign: "center"
                          }}
                        >
                          Receive Qty
                        </th>
                        <th
                          className="px-2 py-2"
                          style={{
                            width: "20%",
                          }}
                        >
                          Rate
                        </th>
                        <th className="px-2 py-2"
                          style={{
                            // width: "15%",
                            textAlign: "center"
                          }}
                        >Amount</th>

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

                              name="adjustmentId"
                              placeholder="Select Item"
                              onChange={(value: any, index: any) =>
                                handaleSelectItem(value, index)
                              }
                              options={challanOptions}
                            />
                          </td>

                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left", color: "black" }}
                              type="number"
                              name="receiveAmount"
                              value={row?.billAmount?.toString()}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].billAmount = parseFloat(e.target.value);
                                setRows(updatedRows);
                              }}

                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left", color: "black" }}
                              type="number"
                              name="vatAmount"
                              value={row?.vatAmount?.toString()}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].vatAmount = parseFloat(e.target.value);
                                setRows(updatedRows);
                              }}

                            />
                          </td>
                          <td>
                            <FormInput
                              style={{ width: "100%", textAlign: "left" }}
                              type="number"
                              name="vatAdjustableAmount"
                              placeholder="0.0"
                              value={row?.vatAdjustableAmount?.toString()}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                const newValue = parseFloat(e.target.value);

                                if (!isNaN(newValue) && Number.isInteger(newValue) && newValue >= 0 && newValue <= row.vatAmount) {
                                  updatedRows[index].vatAdjustableAmount = newValue;
                                  setErrorMessages((prevMessages) => {
                                    const newMessages = [...prevMessages];
                                    newMessages[index] = ''; // Clear the error message for this row
                                    return newMessages;
                                  });
                                } else if (newValue === '' || newValue === null) {
                                  updatedRows[index].vatAdjustableAmount = null; // Set to null or another appropriate value
                                  setErrorMessages((prevMessages) => {
                                    const newMessages = [...prevMessages];
                                    newMessages[index] = ''; // Clear the error message for this row
                                    return newMessages;
                                  });
                                } else {
                                  // Reset to 0 and show an error message
                                  updatedRows[index].vatAdjustableAmount = 0;
                                  setErrorMessages((prevMessages) => {
                                    const newMessages = [...prevMessages];
                                    newMessages[index] = "You have entered a value greater than vatAmount!";
                                    return newMessages;
                                  });

                                  // Display Ant Design Snackbar
                                  // message.error("You have entered a value greater than vatAmount!");
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
                style={{ padding: "0px", marginTop: "12px" }}
              >
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    className="gutter-row"
                    span={24}
                    style={{ marginTop: "20px" }}
                  >
                    <p style={{ color: "red", marginTop: "30px" }}>
                      *** If "Applied" Import LC No & Date Will be Null
                      ***
                    </p>
                    <p style={{ color: "red", marginTop: "30px" }}>
                      *** Once "Opened" it will have ***
                    </p>
                  </Col>
                </Row>

              </div>
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

                <DarazCommonButton>Save</DarazCommonButton>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ImportLC;
