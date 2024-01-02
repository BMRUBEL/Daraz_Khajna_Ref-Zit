"use client";

import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import RebateInput from "@/components/Forms/RebateInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  DeleteOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import { amount } from '../../../../../../utils/amountFormat';
import ReceiveService from "../../../../../../services/Receive.service";
import Loading from "@/app/loading";
import ChildTableModal from "@/components/Modal/ChildTableModal";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import {
  useAddReceivTransactionMutation,
  useChildItemQuery,
  useMasterDropDownDataQuery,
} from "@/redux/api/receive/receiveApi";
import { Button, Col, Row, Select, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import { createReceiveSchema } from "@/schemas/receive/createReceiveSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@/redux/hook";

const initialData: any = [
  {
    key: 0,
    name: "Edward King 0",
    uom: "Pcg",
    qty: 23,
    price: 12,
    issueAmnt: 12,
    sd_amnt: 1,
    vat_amnt: 1,
    t_damnt: 1,
    duty: false,
    newColumn: false,
  },
];

const CreateAdminPage = () => {
  // state
  const [hideItem, setHideItem] = useState<boolean>(false);
  // const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // const [showNewColumn, setShowNewColumn] = useState(false);

  // start child dynamic table
  const [rows, setRows] = useState([
    {
      itemInfoId: 1,
      isModal: false,
      uomList: [],
      uomId: null,
      uomShortCode: "Ltr",
      relativeFactor: 1,
      vatPaymentMethodId: 1,
      itemCatForRetailId: 1,
      gateRecvQty: null,
      recvQuantity: null,
      itemReceiveRate: 0,
      vatRateTypeId: 1,
      isFixedRate: 1,
      cdPercent: 0,
      cdAmount: 0,
      rdPercent: 0,
      rdAmount: 0,
      sdPercent: 0,
      sdAmount: 0,
      vatPercent: 0,
      fixedRateUomId: 1,
      fixedRate: 0,
      vatAmount: 0,
      atPercent: 0,
      atAmount: 0,
      aitPercent: 0,
      aitAmount: 0,
      totalAmtTransCurr: 0,
      totalAmtLocalCurr: 0,
      gateEntryAt: "2023-10-24",
      gateEntryBy: 1,
      openingStockRemarks: "remarks",
    },
  ]);
  const [rowData, setRowData] = useState({});
  const [selectedRows, setSelectedRows] = useState([]);

  const addRow = () => {
    setRows([...rows, rowData]);
    setRowData({
      itemInfoId: "",
      uomList: [],
      isModal: false,
      uomId: 1,
      uomShortCode: "Ltr",
      relativeFactor: 1,
      vatPaymentMethodId: 1,
      itemCatForRetailId: 1,
      gateRecvQty: 0,
      recvQuantity: null,
      itemReceiveRate: null,
      vatRateTypeId: 1,
      isFixedRate: 1,
      cdPercent: 0.0,
      cdAmount: 0.0,
      rdPercent: 0.0,
      rdAmount: 0,
      sdPercent: 0.0,
      sdAmount: 0,
      vatPercent: 0.0,
      fixedRateUomId: 1,
      fixedRate: 0.0,
      vatAmount: 0.0,
      atPercent: 0.0,
      atAmount: 0,
      aitPercent: 0.0,
      aitAmount: 0,
      totalAmtTransCurr: 0.0,
      totalAmtLocalCurr: 0.0,
      gateEntryAt: "2023-10-24",
      gateEntryBy: 1,
      openingStockRemarks: "remarks",
    });
  };

  // total amount
  const totalSum = rows.reduce(
    (sum, row) =>
      sum +
      row.totalAmtLocalCurr,
    0
  );
  const totalVatAmount = rows.reduce((sum, row) => sum + row.vatAmount, 0);

  const toggleSelect = (index: any) => {
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
      setSelectedRows([...Array(rows.length).keys()]);
    }
  };

  const deleteSelectedRows = () => {
    const updatedRows = rows.filter(
      (row, index) => !selectedRows.includes(index)
    );
    setRows(updatedRows);
    setSelectedRows([]);
  };

  const handleSelectChange = (value: any, index: any) => {
    const selectedChildItem = childData?.result.find(
      (item: any) => item.itemInfoId === value
    );

    const updatedRows = [...rows];
    updatedRows[index].uomList = selectedChildItem?.uomList;
    updatedRows[index].uomId = selectedChildItem?.salesUnitId;
    updatedRows[index].itemInfoId = value;
    updatedRows[index].vatPaymentMethodId = 1;
    updatedRows[index].itemCatForRetailId = 1;
    updatedRows[index].gateRecvQty = 10; // it default cannot set 0 api issue
    updatedRows[index].totalAmtTransCurr = 100;
    updatedRows[index].isFixedRate = 2; // it cannot set default value 0 . it's api issue
    updatedRows[index].vatPercent = selectedChildItem?.vat;
    updatedRows[index].cdPercent = selectedChildItem?.cd;
    updatedRows[index].rdPercent = selectedChildItem?.rd;
    updatedRows[index].sdPercent = selectedChildItem?.sd;
    updatedRows[index].aitPercent = selectedChildItem?.ait;
    updatedRows[index].atPercent = selectedChildItem?.at;
    setRows(updatedRows);
  };

  //end child dynamic table

  //save
  const [addReceive, { data: createData }] = useAddReceivTransactionMutation();

  //get all options
  const { data, isLoading } = useMasterDropDownDataQuery({});

  const { data: childData } = useChildItemQuery({});

  const [tableData, setData] = useState(initialData);

  //@ts-ignore
  const fiscalYear: any = data?.result?.fiscalYear;
  const challanTypes: any = data?.result?.challanTypes;
  const suppliers: any = data?.result?.suppliers;
  const paymentModes: any = data?.result?.paymentModes;
  const banks: any = data?.result?.banks;
  const vatMonth: any = data?.result?.vatMonth[0];

  const itemOptions =
    childData &&
    childData?.result?.map((options: any) => {
      return {
        label: options?.itemDisplayName,
        value: options?.itemInfoId,
      };
    });
  const fiscalYearOptions =
    fiscalYear &&
    fiscalYear?.map((year: any) => {
      return {
        label: year?.name,
        value: year?.id,
      };
    });

  const options = [{ label: "", value: "" }];
  const suppliersOptions =
    suppliers &&
    suppliers?.map((supplier: any) => {
      return {
        label: supplier?.name,
        value: supplier?.id,
      };
    });

  const challanTypesOptions =
    challanTypes &&
    challanTypes?.map((challanType: any) => {
      return {
        label: challanType?.name,
        value: challanType?.id,
      };
    });

  const paymentModesOptions =
    paymentModes &&
    paymentModes?.map((paymentMode: any) => {
      return {
        label: paymentMode?.name,
        value: paymentMode?.id,
      };
    });

  const banksOptions =
    banks &&
    banks?.map((bank: any) => {
      return {
        label: bank?.name,
        value: bank?.id,
      };
    });

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // cd rd changes
  const cdRdSdChanges = (row: any) => {
    row.cdAmount = ReceiveService.cdRdAmountCalculate(
      (row.recvQuantity * row.itemReceiveRate),
      row.cdPercent
    );
    row.rdAmount = ReceiveService.cdRdAmountCalculate(
      (row.recvQuantity * row.itemReceiveRate),
      row.rdPercent
    );
    row.sdAmount = ReceiveService.sdAmountCalculate(
      (row.recvQuantity * row.itemReceiveRate),
      row.cdAmount,
      row.rdAmount,
      row?.sdPercent
    );

    row.vatAmount = ReceiveService.vatAmountCalculate(
      (row.recvQuantity * row.itemReceiveRate),
      row.cdAmount,
      row.rdAmount,
      row.sdAmount,
      row.vatPercent
    );
    row.aitAmount = ReceiveService.aitAmountCalculate(
      (row.recvQuantity * row.itemReceiveRate),
      row.aitPercent
    );
    row.atAmount = ReceiveService.atAmountCalculation(
      (row.recvQuantity * row.itemReceiveRate),
      row.cdAmount,
      row.rdAmount,
      row.sdAmount,
      row.atPercent
    );
  };
  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const isDebateAble = useAppSelector((state) => state.receive.isDebateAble);

  // submit handler
  const onSubmit = async (values: any) => {
    // fixed params
    values.tranSourceTypeId = 1;
    values.tranTypeId = 1;
    values.tranSubTypeId = 1;
    values.prodTypeId = 1;
    values.vatRebateId = 3;
    values.companyId = 1;
    values.branchId = 1;
    values.storeId = 1;
    values.currencyId = 1;
    values.excgRate = 1;
    // supplier
    values.supplierId = values.supplierId;
    values.isReg = 1;
    values.supplierBinNumber = "bin";
    values.supplierBinNumberBn = "bin bn";
    values.supplierAccountNumber = "suppl account no";

    values.payModeId = values.payModeId;
    values.payInstrumentNo = values.payInstrumentNo; // order no
    values.payInstrumentDate = values.payInstrumentDate ?? new Date();
    values.paymentInstitutionId = 1; // static 1
    values.bankBranchId = values.bankBranchId; // bank id
    values.bankAccountTypeId = 1;
    values.isRegBankTrans = 1;

    values.receiveDate = values.receiveDate ?? new Date();
    values.fiscalYearId = 1;
    values.vatMonthId = 1;
    values.challanTypeId = values.challanTypeId;
    values.challanNumber = values.challanNumber;
    values.challanNumberBn = values.challanNumber;
    values.challanDate = values.challanDate ?? new Date();
    values.totalAssessableAmtTransCurr = totalSum;
    values.totalAssessableAmtLocalCurr = totalSum;
    values.recvAmtWotaxTransCurr = totalSum;
    values.recvAmtWotaxLocalCurr = totalSum;
    values.totalCdAmount = ReceiveService.totalAmountCd(rows);
    values.totalRdAmount = ReceiveService.totalAmountRd(rows);
    values.totalSdAmount = ReceiveService.totalAmountSd(rows);
    values.totalVatAmount = ReceiveService.totalAmountVat(rows);
    values.totalAtAmount = ReceiveService.totalAmountAt(rows);
    values.totalAitAmount = ReceiveService.totalAmountAit(rows);
    values.recvAmtWithtaxTransCurr = ReceiveService.totalAmountCd(rows);
    values.recvAmtWithtaxLocalCurr = ReceiveService.totalAmountCd(rows);
    (values.monthlyProcStatus = 1),
      (values.yearlyProcStatus = 1),
      (values.vatRebateId = isDebateAble ? 1 : 2),
      (values.isRebateable = true),
      (values.isRebateable = values.isRebateable ? true : false);
    (values.isVdsApplicable = true),
      (values.isVdsDone = true),
      (values.isPaid = true),
      (values.txnCode = true),
      (values.remarksBn = "remarkss"),
      (values.isVdsApplicable = values.isVdsApplicable ? true : false);

    values.items = [...rows];
    try {
      console.log(values);
      const res = await addReceive(values);

      message.success("Price Determination Created Successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };

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
      <Link href="/super_admin/company-setting/price-determination">
        <UMBreadCrumb pageName="Price Determination" lastName="Create" />
      </Link>

      <div style={{
        padding: "20px 0px",
        marginTop: "0px",
      }}>
        <h2 >Insert</h2>
      </div>

      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        <div style={{}}>
          <Form
            submitHandler={onSubmit}
          // resolver={yupResolver(createReceiveSchema)}
          >

            {/* Master Table */}
            <div
              style={{
                marginBottom: "10px",
                padding: "20px",
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
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="receiveNo"
                    size="large"
                    label="Price Determination No:"
                    required
                    placeholder="<<<New>>>"
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
                    name="receiveNo"
                    size="large"
                    label="Price Determination Name:"
                    required
                    placeholder="Enter Name"

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
                    name="supplierId"
                    options={suppliersOptions}
                    label="Item Name: "
                    placeholder="--Select Item--"
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
                    type="number"
                    name="receiveNo"
                    size="large"
                    label="Calculation Qty:"
                    required
                    placeholder="Enter Qty"

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
                    type="number"
                    name="receiveNo"
                    size="large"
                    label="IOC Qty:"
                    required
                    placeholder="Enter IOC Qty"

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
                    name="supplierId"
                    options={suppliersOptions}
                    label="UOM: "
                    placeholder="--Select UOM--"
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
                  <FormDatePicker
                    name="receiveDate"
                    label="Date of Submission:"
                    size="large"
                    required
                    style={{
                      width: "100%",
                    }}
                    // showTime 
                    format="YYYY-MM-DD"
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
                    name="receiveDate"
                    label="Approved by NBR:"
                    size="large"
                    required
                    style={{
                      width: "100%",
                    }}
                    // showTime 
                    format="YYYY-MM-DD"
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
                    name="receiveDate"
                    label="Effective From:"
                    size="large"
                    required
                    style={{
                      width: "100%",
                    }}
                    // showTime 
                    format="YYYY-MM-DD"
                  />
                </Col>
              </Row>
            </div>

            <div className="grid grid-cols-3 gap-4">

              <div className="col-span-2">

                <div className="grid grid-rows-2 grid-flow-col gap 4">
                  <div style={{}}>
                    <p className="text-lg font-medium">Item Info </p>
                    {/* Info Child Start */}
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
                                  <th className="px-2 py-2" style={{
                                    width: "10%",
                                  }} >
                                    Item Name
                                  </th>

                                  <th
                                    className="px-2 py-2"
                                    style={{
                                      width: "10%",
                                    }}
                                  >
                                    Cons With Wastage Qty
                                  </th>
                                  <th
                                    className="px-2 py-2"
                                    style={{
                                      width: "10%",
                                    }}
                                  >
                                    Wastage Qty
                                  </th>
                                  <th
                                    className="px-2 py-2"
                                    style={{
                                      width: "10%",
                                    }}
                                  >
                                    IOC Unit Cons
                                  </th>

                                  <th className="px-2 py-2" >
                                    UOM
                                  </th>
                                  <th className="px-2 py-2">Take (TK) </th>
                                  <th className="px-2 py-2">Total Cost (Tk)</th>
                                  <th className="px-2 py-2">IOC Unit Cost (TK)</th>

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
                                        placeholder="Select Item"
                                        optionFilterProp="children"
                                        onChange={(value) =>
                                          handleSelectChange(value, index)
                                        }
                                        onSearch={onSearch}
                                        options={itemOptions}
                                      />
                                    </td>

                                    <td>
                                      <input
                                        type="number"
                                        placeholder="Cons.."
                                        className="border rounded w-full m-3 p-2 mb-4"
                                        name="recvQuantity"
                                        value={row.recvQuantity}
                                        onChange={(e) => {
                                          const updatedRows = [...rows];
                                          updatedRows[index].recvQuantity =
                                            e.target.value;
                                          setRows(updatedRows);
                                          cdRdSdChanges(row);
                                        }}
                                        required
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        placeholder="Wastage Qty"
                                        className="border rounded mt-3 w-full p-2 mb-4"
                                        name="itemReceiveRate"
                                        value={row.itemReceiveRate}
                                        onChange={(e) => {
                                          const updatedRows = [...rows];
                                          updatedRows[index].itemReceiveRate =
                                            e.target.value;
                                          setRows(updatedRows);
                                          cdRdSdChanges(row);
                                        }}
                                        required
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="number"
                                        placeholder="Unit Cons"
                                        className="border rounded mt-3 w-full p-2 mb-4"
                                        name="itemReceiveRate"
                                        value={row.itemReceiveRate}
                                        onChange={(e) => {
                                          const updatedRows = [...rows];
                                          updatedRows[index].itemReceiveRate =
                                            e.target.value;
                                          setRows(updatedRows);
                                          cdRdSdChanges(row);
                                        }}
                                        required
                                      />
                                    </td>
                                    <td>
                                      <Select
                                        style={{
                                          width: "100%",
                                        }}
                                        showSearch
                                        value={row.uomId}
                                        placeholder="Select UOM"
                                        optionFilterProp="children"
                                        onChange={(e) => {
                                          const updatedRows = [...rows];
                                          updatedRows[index].uomId = e;
                                          setRows(updatedRows);
                                        }}
                                        options={row.uomList?.map((option: any) => ({
                                          value: option?.uomId,
                                          label: option?.uomShortCode,
                                        }))}
                                      />
                                    </td>
                                    <td>
                                      {
                                        amount(row.item_assessable_value_trans_curr =
                                          parseFloat(row.recvQuantity) *
                                          parseFloat(row.itemReceiveRate) || 0)
                                      }
                                    </td>

                                    <td>{amount(row.vatAmount)}</td>
                                    <td>
                                      {" "}
                                      {
                                        (amount(row.totalAmtLocalCurr =
                                          ReceiveService.totalLineAmount(row)))
                                      }
                                    </td>
                                    {/* <td>
                                     
                                      <ChildTableModal
                                        handleCancel={() => {
                                          const updatedRows = [...rows];
                                          updatedRows[index].isModal =
                                            !updatedRows[index].isModal;
                                          setRows(updatedRows);
                                        }}
                                        handleOk={() => {
                                          const updatedRows = [...rows];
                                          updatedRows[index].isModal =
                                            !updatedRows[index].isModal;
                                          setRows(updatedRows);
                                        }}
                                        open={row.isModal}
                                        row={row}
                                      />
                                    </td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          {/* Item Info form child end  */}
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
                      </div>
                    </div>
                    {/* End Info child*/}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div style={{}}>
                      <p className="text-lg font-medium">Input Service</p>
                      {/* Info Child Start */}
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
                                    <th className="px-2 py-2">
                                      Input Service
                                    </th>
                                    <th className="px-2 py-2">Amount(TK)</th>
                                    <th className="px-2 py-2">IOC Unit Amount(TK)</th>

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
                                          placeholder="Select Service"
                                          optionFilterProp="children"
                                          onChange={(value) =>
                                            handleSelectChange(value, index)
                                          }
                                          onSearch={onSearch}
                                          options={itemOptions}
                                        />
                                      </td>
                                      <td>{amount(row.vatAmount)}</td>
                                      <td>
                                        {" "}
                                        {
                                          (amount(row.totalAmtLocalCurr =
                                            ReceiveService.totalLineAmount(row)))
                                        }
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
                        </div>
                      </div>
                      {/* End Info child*/}
                    </div>
                    <div style={{}}>
                      <p className="text-lg font-medium">Value Added Service</p>
                      {/* Info Child Start */}
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
                                <thead className="bg-orange-thead text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                  <tr>
                                    <th className="px-2 py-2">
                                      <input
                                        type="checkbox"
                                        checked={selectedRows.length === rows.length}
                                        onChange={toggleSelectAll}
                                        className="form-checkbox h-5 w-5 text-indigo-600"
                                      />
                                    </th>
                                    <th className="px-2 py-2">
                                      Value Added Service
                                    </th>
                                    <th className="px-2 py-2">Amount(TK)</th>
                                    <th className="px-2 py-2">IOC Unit Amount(TK)</th>

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
                                          placeholder="Select VAT"
                                          optionFilterProp="children"
                                          onChange={(value) =>
                                            handleSelectChange(value, index)
                                          }
                                          onSearch={onSearch}
                                          options={itemOptions}
                                        />
                                      </td>
                                      <td>{amount(row.vatAmount)}</td>
                                      <td>
                                        {" "}
                                        {
                                          (amount(row.totalAmtLocalCurr =
                                            ReceiveService.totalLineAmount(row)))
                                        }
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
                        </div>
                      </div>
                      {/* End Info child*/}
                    </div>
                  </div>
                </div>
              </div>
              {/* Summary Table */}
              <div style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "35px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
                overflowX: "auto",  // Enable horizontal scrolling

              }} className="flex flex-col space-y-20">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs md:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                      <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs md:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">Calculation</th>
                      <th scope="col" className="px-2 md:px-6 py-3 text-left text-xs md:text-sm lg:text-base font-medium text-gray-500 uppercase tracking-wider">IOC</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr >
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">Total Closing RM (TK)</td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">20,000.00</td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">20,00.00</td>
                    </tr>
                    <tr >
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">Total Overhead Cost (TK)</td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">100.00</td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">10.00</td>
                    </tr>
                    <tr >
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">Total Monthly Cost (TK)</td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap">200.00</td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap" >20.00</td>
                    </tr>
                    {/* Separator Row after every three rows */}
                    <tr>
                      <td colSpan={3 as number} className="border-t"></td>
                    </tr>
                    <tr >
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">Total Cost-Calculation (TK)</td>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">20,300.00</td>
                    </tr>
                    <tr >
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">Total Cost-IOC(TK)</td>
                      <td className="px-6 py-4 whitespace-nowrap"></td>
                      <td className="px-2 md:px-6 py-4 whitespace-nowrap font-bold">20,30.00</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4">
                  <FormInput
                    type="text"
                    name="remarks"
                    size="large"
                    label="Remarks:"
                    required
                    placeholder="Write a remark..."
                  />
                </div>

              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/company-setting/price-determination`}>
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

export default CreateAdminPage;
