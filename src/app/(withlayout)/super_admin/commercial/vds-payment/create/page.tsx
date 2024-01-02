"use client";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { Button, Col, Row, Select, message } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useAddVdsPaymentMutation,
  useGetSingleBankQuery,
  useGetVatCodeDetailQuery,
  useVdsPaymentChildDropDownQuery,
  useVdsPaymentDropDownQuery,
  useVdsPaymentDateQuery,
} from "@/redux/api/commercialApi/vdsPaymentApi";
import { amount } from "@/utils/amountFormat";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { vdsPaymentSchema } from "@/schemas/commercial/vdsPayment";
import dayjs, { Dayjs } from "dayjs";
// table children
interface RowDataType {
  publishedDate: string;
  payableVatAmt: number;
  fineAmt: number;
  payableAmt: number;
  vdsPurchasesMasterId: number;
}

const CreateVdsForPayment = () => {
  // state
  const [rows, setRows] = useState([
    {
   
      publishedDate: "DD-MM-YYYY",
      payableVatAmt: 0.0,
      fineAmt: 0,
      payableAmt: 0,
      vdsPurchasesMasterId: 1,
    },
  ]);
  const [selectedCertificate, setSelectedCertificate] = useState<Array<number | null>>(Array(rows.length).fill(null));
  const [selectedParchaseMasterIds, setSelectedParchaseMasterIds] = useState(new Set());
  const [rowData, setRowData] = useState<RowDataType>({
    publishedDate: "DD-MM-YYYY",
    payableVatAmt: 0.0,
    fineAmt: 0,
    payableAmt: 0,
    vdsPurchasesMasterId: 1,
  });
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectedDate, setSelectedDate] = useState<any>(dayjs().format("YYYY-MM-DD"));
  const [transactionDate, setTransactionDate] = useState<any>(dayjs().format("YYYY-MM-DD"));
  const [treasuryChallanDate, setTreasuryChallanDate] = useState<any>(dayjs().format("YYYY-MM-DD"));
  const [branchOptions, setBranchOptions] = useState([]);
  const [bankId, setBankId] = useState("");
  const [vatCodeId, setVatCodeId] = useState("");
  const [paymentType, setPaymentChildType] = useState([]);
  // Add a new row to the table
  const onAddRow = () => {
    if (rows && paymentType) {
      if (rows.length < paymentType.length) {
        setRowData({
          publishedDate: "DD-MM-YYYY",
          payableVatAmt: 0.0,
          fineAmt: 0,
          payableAmt: 0,
          vdsPurchasesMasterId: 1,
        });
        setSelectedParchaseMasterIds(new Set());
        setRows([...rows, rowData]);
      } else {
        message.error("Cannot add more rows. Limit reached.");
      }
    } else {
      message.error("Rows or challanOptions is not defined.");
    }
  };
  // console.log(selectedParchaseMasterIds, "add row function")
  //calculation
  const totalPayableVatAmnt = rows.reduce((sum, row) => sum + row.payableVatAmt, 0);
  const totaFineAmount = rows.reduce((sum, row) => sum + row.fineAmt, 0);
  const totaTreasuryAmount = rows.reduce((sum, row) => sum + (row.fineAmt || 0 ) + (row.payableVatAmt || 0), 0);
  const toggleSelect = (index: number) => {
    const selectedIndex = selectedRows.indexOf(index);
    console.log(selectedIndex, "selected Index")
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
  const deleteSelectedRows = () => {
    const updatedRows = rows.filter(
      (row, index) => !selectedRows.includes(index)
    );
    const deletedPurchaseMasterIds = selectedRows.map(
      (index) => rows[index]?.vdsPurchasesMasterId
    );
    setSelectedCertificate((prevCertificate) =>
    prevCertificate.filter(
      (certificateId:any) => !deletedPurchaseMasterIds.includes(certificateId)
    )
  );
    setRows(updatedRows);
    setSelectedRows([]);
  };
  //data extracting from hook
  const [addVdsPayment, { data: createData }] = useAddVdsPaymentMutation();
  const { data: datasource } = useVdsPaymentDropDownQuery({
    ...{},
  });
  const { data: bankBranch } = useGetSingleBankQuery(bankId);
  const { data: vatCodeDetails } = useGetVatCodeDetailQuery(vatCodeId);
  // console.log(vatCodeId, "vat Code ID")
  const vatCodeDetailsData = vatCodeDetails?.result?.name;
  // console.log(vatCodeDetailsData, "vat Code Details")
  const vatCodeDetailsId = vatCodeDetails?.result?.id;
  const { data: childData } = useVdsPaymentChildDropDownQuery({});

  //handle
  const handleSelectChangeCertificate = (value: any, index: any) => {
    // Check if the challanNo has already been selected for another row
    if (selectedCertificate.includes(value)) {
      // console.log(`ChallanNo ${value} has already been selected for another row.`);
      message.error("Certificate No. has already been Selected for another row");
      return;
    }

    // Check if the challanNo has already been selected for the current row
    if (selectedCertificate[index] === value) {
      // console.log(`ChallanNo ${value} has already been selected for this row.`);
      message.error("Challan No has already been Selected for this row");
      return;
    }

    // console.log(`Selected Challan: ${value}, Index: ${index}`);

    const selectedChildItem = childData?.result?.paymentChildType.find(
      (item: any) => item.id === value
    );
    // console.log(selectedChildItem.id, "selected child data");

    if (selectedChildItem) {
      const formattedPublishDate = 
      dayjs(selectedChildItem.publishedDate).format("DD-MM-YYYY")
      
      // console.log(`Formatted Challan Date: ${formattedPublishDate}`);

      const updatedRows = [...rows];
      console.log(updatedRows, "updated Rows");
      updatedRows[index].vdsPurchasesMasterId = selectedChildItem?.id;
      updatedRows[index].publishedDate = formattedPublishDate;
      updatedRows[index].payableVatAmt = selectedChildItem?.payableVatAmt;
      setRows(updatedRows);
      // setCustomerIdEnabled(false);

      // Update the selectedCertificate array
      setSelectedCertificate((prevCertificate) => {

        const newCertificates = [...prevCertificate];
        newCertificates[index] = value;
        return newCertificates;
      });

      // Add the selected issueMasterId to the set
      setSelectedParchaseMasterIds((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.add(selectedChildItem.id);
        return newSet;
      });
    }
  };

  //data storing
  useEffect(() => {
    const certificateOptions =
      childData &&
      childData.result?.paymentChildType?.map((payment: any) => {
        return {
          label: payment?.certificateNo,
          value: payment?.id,
          publishDate: payment?.publishedDate,
          payableVatAmt: payment?.payableVatAmt,
        };
      });
    setPaymentChildType(certificateOptions);
  }, [childData]);

  const handleBankSelectChange = (value: any) => {
    setBankId(value);
  };
  const handleVatCodeDetails = (value: any) => {
    setVatCodeId(value);
  };
  //Sending same date pattern as api
  const handleDateChange = (value:any) => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
    setTransactionDate(value);
  };
   const selectTreasuryChallanDate = (value:any)=>{
        setTreasuryChallanDate(value)
   }
  const { data: vdsDate } = useVdsPaymentDateQuery(selectedDate);
  const vdsData = vdsDate?.result?.vatMonth;
  const names = vdsData ? vdsData.map((item: { name: string }) => item.name).join(", ") : "";
  // console.log(selectedDate, "Date Month")
  // console.log(vdsData, "vat Month")
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // TC Master ID
  const commissionRateOptions =
    datasource &&
    datasource?.result?.commissionerateType?.map((vdspayment: any) => {
      return {
        label: vdspayment?.name,
        value: parseInt(vdspayment?.id),
      };
    });

  const bankOptions =
    datasource &&
    datasource?.result?.bankType?.map((bank: any) => {
      return {
        label: bank?.name,
        value: parseInt(bank?.id),
      };
    });
  const vatCodeOptions =
    datasource &&
    datasource?.result?.vatCodeType?.map((vatcode: any) => {
      return {
        label: vatcode?.name,
        value: parseInt(vatcode?.id),
      };
    });

  useEffect(() => {
    if (bankBranch && bankBranch.result && bankBranch.result?.bankBranchInfos) {
      const mappedOptions = bankBranch.result.bankBranchInfos.map(
        (options: any) => ({
          label: options?.bankBranchName,
          value: options?.id,
        })
      );
      // Update the state with the mapped options
      setBranchOptions(mappedOptions);
    }
  }, [bankId, bankBranch]);

  //search functions
  const onSearch = (value: string) => {
    // console.log("search:", value);
  };
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());
  // Submit Handler
  const onSubmit = async (values: any) => {
    //fixed params
    values.storeId = 8;
    values.transactionDate = dayjs(transactionDate).format("YYYY-MM-DD")
    values.treasuryChallanDate = dayjs(treasuryChallanDate).format("YYYY-MM-DD")
    values.vatMonthId = vdsData
      ?.map((item: { id: number }) => item.id)
      .join(", ");
    values.treasuryAmount = totaTreasuryAmount;
    values.tcAcctItemId = vatCodeDetailsId;
    values.vdsPayment6F1MasterRequestDtos = [
      {
        totalPayableVatAmt: totalPayableVatAmnt,
        totalFineAmt: totaFineAmount,
        totalPayableAmt: totaTreasuryAmount,
        vdsPayment6F2ChildRequestDtos: [...rows],
      },
    ];
    try {
      // console.log("Submitted Data", values);
      setLoading(true);
      const res = await addVdsPayment(values);

      if ("data" in res && res.data && res.data.result) {
        message.success("Payment Created Successfully!");
        router.push(`/super_admin/commercial/vds-payment/view/${res?.data?.result?.vdsPayment6F1MasterResponseDtos?.[0].paymentMasterId}`);
        setLoading(false);
      } else {
        message.error(
          "Failed to update customer. Please check the data and try again."
        );
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb pageName="VDS Payment" lastName="Insert" />
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
        <Form submitHandler={onSubmit} resolver={yupResolver(vdsPaymentSchema)}>
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px", textAlign: "left" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="vdsPurchaserId"
                  label="VDS Payment ID"
                  placeholder="--<New>--"
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
                  value={transactionDate? dayjs(transactionDate) : null}
                  onChange={(value) => handleDateChange(value)}
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px", color: "black" }}
              >{

             <>
                <FormInput
                  style={{ width: "100%", textAlign: "left", color:"black" }}
                  name="vatMonthId"
                  label="VAT Month  "
                  placeholder="VAT Month"
                  value={names}
                  required
                  disable
                />
                     {selectedDate && vdsData === undefined ? (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        The transaction date has no VAT month!
                      </div>
                    ) : null}
                    </>
                  }
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="bankId"
                  options={bankOptions}
                  label="Bank Name/MFS "
                  placeholder="--Select Bank--"
                  onChange={(value:any) => {
                    handleBankSelectChange(value);
                  }}
                  onSearch={onSearch}
                  filterOption={filterOption}
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="bankBrunchId"
                  label="Bank Branch Name"
                  placeholder="Select Bank Branch"
                  onSearch={onSearch}
                  filterOption={filterOption}
                  options={branchOptions}
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormDatePicker
                  name="treasuryChallanDate"
                  value={treasuryChallanDate}
                  onChange={(value)=> selectTreasuryChallanDate(value)}
                  label="Treasury Challan Date"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  name="treasuryChallanNo"
                  label="Treasury Challan No"
                  placeholder="00001"
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
                  name="commissionerateId"
                  options={commissionRateOptions}
                  label="Name Of Commisionararte"
                  required
                  placeholder="--Select Name--"
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="vatCodeId"
                  options={vatCodeOptions}
                  label="VAT Code"
                  required
                  placeholder="--Select Code--"
                  onChange={handleVatCodeDetails}
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left", color:"black" }}
                  type="text"
                  name="tcAcctItemId"
                  value={vatCodeDetailsData}
                  label="VAT Code Details "
                  placeholder="VAT code details"
                  required
                  disable
                />
                { (vatCodeId && vatCodeDetailsData === undefined) ? (
                      <div style={{ color: "red", marginBottom: "10px" }}>
                        VAT Code has no VAT Code Details
                      </div>
                    ): null}
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="totalPayableVatAmt"
                  label="Total Payable VAT Amount"
                  value={`${amount(totalPayableVatAmnt)}`}
                  placeholder="0.00"
                  required
                  readOnly={true}
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
                  name="totalFineAmt"
                  label="Total Fine Amount"
                  value={`${amount(totaFineAmount)}`}
                  placeholder="0.00"
                  required
                  readOnly={true}
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
                  name="treasuryAmount"
                  label="Total Treasury Amount"
                  value={`${amount(totaTreasuryAmount)}`}
                  placeholder="0.00"
                  required
                  readOnly={true}
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
                        <th style={{width:"4%"}} className="px-2 py-2">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === rows.length}
                            onChange={toggleSelectAll}
                            className="form-checkbox h-5 w-5 text-indigo-600"
                          />
                        </th>
                        <th className="px-2 py-2" style={{width:"20%"}}>
                          Certificate No
                        </th>
                        <th className="px-2 py-2" style={{width:"20%"}} >
                          Publish Date
                        </th>
                        <th
                          className="px-2 py-2"
                          style={{
                            width: "15%",
                          }}
                        >
                          Payable Vat Amount (a)
                        </th>
                        <th
                          className="px-2 py-2"
                          style={{
                            width: "20%",
                          }}
                        >
                          Fine Amount (b)
                        </th>
                        <th className="px-2 py-2">
                          Total Payable Tc Amount (c=a+b)
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
                              placeholder="--Select Certificate--"
                              onChange={(value) =>
                                handleSelectChangeCertificate(value, index)
                              }
                              options={paymentType}
                              onSearch={onSearch}
                              filterOption={filterOption}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="border rounded w-full m-3 p-2 mb-4"
                              name=""
                              placeholder="DD-MM-YYYY"
                              value={row?.publishedDate?.toString()}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].publishedDate =
                                  e.target.value;
                                setRows(updatedRows);
                              }}
                              required
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="border rounded w-full m-3 p-2 mb-4"
                              name="sellsAmount"
                              value={row?.payableVatAmt.toString()}
                              onChange={(e) => {
                                const updatedRows = [...rows];
                                updatedRows[index].payableVatAmt = parseFloat(
                                  e.target.value
                                );
                                setRows(updatedRows);
                              }}
                              required
                              disabled
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="border rounded mt-3 w-full p-2 mb-4"
                              name="fineAmt"
                              value={row?.fineAmt?.toString()}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                const updatedRows = [...rows];
                                
                                if (!isNaN(value) && value >= 0) {
                                  updatedRows[index].fineAmt = value
                                  const payableAmount = value > 0 ? value + row.payableVatAmt: row.payableVatAmt;
                                  updatedRows[index].payableAmt = payableAmount;
                                } else {
                                  updatedRows[index].fineAmt = 0.00;
                                  updatedRows[index].payableAmt = row.payableVatAmt;
                                }
                                setRows(updatedRows);
                              }}
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="border rounded mt-3 w-full p-2 mb-4"
                              name="payableAmt"
                              value={row?.payableVatAmt+row?.fineAmt}
                              onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                const updatedRows = [...rows];
                                updatedRows[index].payableAmt = value;
                                setRows(updatedRows);
                              }}
                              required
                              disabled
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
                  onClick={onAddRow}
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
                <Link href={`/super_admin/commercial/vds-payment`}>
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

export default CreateVdsForPayment;
