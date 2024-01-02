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

import { useState, useEffect } from "react";



import Loading from "@/app/loading";
import {
  useOtherAdjustmentDropDownQuery,
  useAddOtherAdjustmentMutation,
  useVatMonthDateQuery,
  useOtherAdjustmentChildDropDownQuery
} from "@/redux/api/commercialApi/otherAdjustmentApi";
import { useRouter } from "next/navigation";
import { amount } from '../../../../../../utils/amountFormat';



interface RowDataType {
  // id: number;
  otherAdjustId: number;
  vatAmount: number;
  billAmount: number;
  vatAdjustableAmount: number ;

}

const VdsPurchaser = () => {


  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [adjustableType, setAdjustableType] = useState([]);

  const [rows, setRows] = useState([
    {
      // id: 1,
      otherAdjustId: 1,
      vatAmount: 0,
      vatAdjustableAmount: 0,
      billAmount: 0
    }
  ])

  const [rowData, setRowData] = useState<RowDataType>({
    // id: 1,
    otherAdjustId: 1,
    vatAmount: 0.0,
    vatAdjustableAmount: 0.0,
    billAmount: 0.0
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);


  // Function to handle adding rows
  const addRow = () => {

    setRows([...rows, rowData]);
    setRowData({
      otherAdjustId: 0,
      billAmount: 0.0,
      vatAmount: 0.0,
      vatAdjustableAmount: 0.0,
    });
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


  const { data, isLoading } = useOtherAdjustmentDropDownQuery({});

  const adjestmentData = data?.result?.adjustmentType;

  const adjustmentOptions =
    adjestmentData && adjestmentData.map((adjestmenttype: any) => {
      return {
        label: adjestmenttype?.name,
        value: parseInt(adjestmenttype?.id),
      };
    });



  const [selectedDate, setSelectedDate] = useState<any>('');


  const { data: vdsDate } = useVatMonthDateQuery(selectedDate);

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



  const vdsData = vdsDate?.result?.vatMonth;

  console.log(vdsData, "VAT Month ID selected")


  //Dependent Drop Down call

  const { data: adjustableData } = useOtherAdjustmentChildDropDownQuery({});

  //Chalan Drop Down
  console.log(adjustableData, "Adjustable Description")


  const handleSelectChange = (value: any, index: any) => {
    const updatedRows = rows.map((row, i) => {
      if (i === index) {
        return { ...row, otherAdjustId: value || null };
      }
      return row;
    });
    setRows(updatedRows);
  };

  // Function to handle deleting rows
  const deleteSelectedRows = () => {
    const updatedRows = rows.filter(
      (row, index) => !selectedRows.includes(index)
    );
    setRows(updatedRows);
    setSelectedRows([]);
  };



  useEffect(() => {
    const adjustableDataOptions =
      adjustableData &&
      adjustableData?.result?.adjustableType?.map((otheradjustment: any) => {
        console.log(" VDS Purchase Data ..", otheradjustment)

        return {
          label: otheradjustment?.adjustmentDescription,
          value: parseInt(otheradjustment?.id),
          adjustmentDescriptionBn: otheradjustment?.adjustmentDescriptionBn,

        };

      });
    setAdjustableType(adjustableDataOptions);

  }, [adjustableData]);

  const [createAdjustment] = useAddOtherAdjustmentMutation();

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
        message.success("Other Adjustment Created Successfully!");
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

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());


  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  if (isLoading) {
    return <Loading />;
  }



  return (
    <div style={{ padding: "10px" }}>

      <UMBreadCrumb pageName="Other Adjustment" lastName="Insert" link={"/super_admin/commercial/others-adjustment"} />

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
                  label="Others Adjustment ID"
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
                  label="Transaction Date:"
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
                  name="vmId"
                  value={vdsData?.map((item: { name: string }) => item.name).join(', ')}
                  label="VAT Month"
                  placeholder="VAT Month"
                  required
                  disable
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
                  label="Adjustment Type"
                  placeholder="Select Type"

                  required
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
                  label="Total Bill Amount"
                  value={`${amount(totalBilAmount)}`}
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
                  type="number"
                  name="totalVatAmount"
                  label="Total Vat Amount"
                  value={`${amount(totalVatAmount)}`}
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
                  type="number"
                  name="totalAdjustableAmount"
                  label="Total Adjustable Amount"
                  value={`${amount(totalAdjustableAmount)}`}
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
                  type="text"
                  name="remarks"
                  label="Remarks "
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
                        <th className="px-2 py-2" >
                          Adjustable Description
                        </th>

                        <th
                          className="px-2 py-2"
                          style={{
                            width: "15%",
                          }}
                        >
                          Bill Amount
                        </th>
                        <th
                          className="px-2 py-2"
                          style={{
                            width: "20%",
                          }}
                        >
                          VAT Amount
                        </th>
                        <th className="px-2 py-2">Adjustable Amount</th>

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


                              placeholder="Select Item"
                              onChange={(value: any, index: any) =>
                                handleSelectChange(value, index)
                              }
                              options={adjustableType}
                              onSearch={onSearch}
                              filterOption={filterOption}
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
                  onClick={addRow}
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
                <Link href={`/super_admin/commercial/others-adjustment`}>
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

export default VdsPurchaser;
