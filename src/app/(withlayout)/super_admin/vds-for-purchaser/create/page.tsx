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
import { Button, Col, Row, Table, message } from "antd";
import {
  DeleteOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined, 
} from "@ant-design/icons";
import Link from "next/link";
import { BaseSyntheticEvent } from "react";
import * as yup from 'yup';
import { useState } from "react";

import { TableRowSelection } from "antd/es/table/interface";
import DRZvdsForPurchaserTableInForm from "@/components/ui/DRZvdsForPurchaserTableinForm";

// table children
interface DataType {
  key: React.Key;
  recieveMasterId: string;
  recieveAmount: number;
  vatAmount: number;
  deductedVatAmount: number;
  newColumn: boolean;
}

const initialData: any = [
  {
    key: 0,
    recieveMasterId: "--select id--",
    recieveAmount: 12300,
    vatAmount: 230,
    deductedVatAmount: 5000,
    newColumn: false,
  },
];

let nextKey = 2; // Initial key for new rows

const CreateOthersAdjustment = () => {

  const onAddRow = () => {
    // Add a new row to the table
    const newRow: DataType = {
      key: nextKey++,
      recieveMasterId: `New Row ${nextKey}`,
      recieveAmount: 0,
      vatAmount: 0, // You can initialize with default values
      deductedVatAmount: 0,
      newColumn: false,
    };

    setData([...tableData, newRow]);
  };

  const sampleOptions = [
    { label: "Option A", value: "A" },
    { label: "Option B", value: "B" },
    { label: "Option C", value: "C" },
  ];

  const formSchema = yup.object().shape({
    transactionDate: yup.date().required('Transaction Date is required'),
    vatMonth: yup.string().required('VAT Month is required'),
    applicationType: yup.string().required('Application Type is required'),
    remarks: yup.string(),
    // ... any other validations
  });

  

  const [tableData, setData] = useState(initialData);
  
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onDeleteSelectedRows = () => {
    // Filter out the selected rows and update the table data
    const updatedData = tableData.filter(
      (item: any) => !selectedRowKeys.includes(item.key)
    );
    setData(updatedData);
    setSelectedRowKeys([]);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb pageName="VDS For Purchaser" lastName="Insert" />
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
        <Form resolver={yupResolver(formSchema)} submitHandler={function (data: any, event?: BaseSyntheticEvent<object, any, any> | undefined): unknown {
          throw new Error("Function not implemented.");
        } }>
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>


            <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
            <FormInput
                type="text"
                name="vdsPurchaserId"
                label="VDS Purchaser ID"
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
                    name="transactiondate"
                    label="Transaction Date:"
                    size="large"
                  />
                </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="VATMonth"
                  options={sampleOptions}
                  label="VAT Month  "
                  placeholder="--Select VAT Month--"
                  required
                />
              </Col>
              
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="suppliername"
                  options={sampleOptions}
                  label="Supplier Name"
                  placeholder="--Select Supplier--"
                  required
                />
              </Col>


              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="certificateNo"
                  label="Certificate No"
                  placeholder="00001"
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="treasuryChallanNo"
                  label="Treasury Challan No"
                  required
                  disable
                  placeholder="TCM-23-000001"
                />
              </Col>

              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="treasuryChallanDate"
                  label="Treasury Challan Date"
                  required
                  disable
                  placeholder="11-07-23"
                />
              </Col>
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="totalPurchaseAmount"
                  label="Total Purchase Amount"
                  required
                  disable
                />
              </Col>
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="totalVatAmount"
                  label="Total VAT Amount"
                  required
                  disable
                />
              </Col>
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="deductedVatAmount"
                  label="Deducted Vat Amount"
                  required
                  disable
                />
              </Col>


              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
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
                  padding: "0px 40px",
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
                  <DRZvdsForPurchaserTableInForm
                    tableData={tableData}
                    rowSelection={rowSelection}
                  />
                </Col>
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 40px",
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
                    onClick={onDeleteSelectedRows}
                  />{" "}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <Link href={`/super_admin/vds-for-purchaser`}>
                    {" "}
                    <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                  </Link>
                  <DarazCommonRedirectButton to="/super_admin/vds-for-purchaser/create">Reset</DarazCommonRedirectButton>
                  <DarazCommonButton>Save</DarazCommonButton>
                </div>
              </div>
            </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateOthersAdjustment;
