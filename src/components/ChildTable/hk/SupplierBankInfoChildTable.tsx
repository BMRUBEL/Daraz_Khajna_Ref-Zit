import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import FormInput from "@/components/Forms/FormInput";

import { Col, Row, message } from "antd";
import { DataType } from "@/app/(withlayout)/super_admin/receive/view/[slug]/page";
import { TableRowSelection } from "antd/es/table/interface";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

let nextKey = 2; // Initial key for new rows

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

const SupplierBankInfoChildTable = ({}: any) => {
  const [tableData, setData] = useState(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onAddRow = () => {
    // Add a new row to the table
    const newRow: DataType = {
      key: nextKey++,
      name: `New Row ${nextKey}`,
      uom: "Pcg",
      qty: 0, // You can initialize with default values
      price: 0,
      issueAmnt: 0,
      sd_amnt: 0,
      vat_amnt: 0,
      t_damnt: 0,
      duty: false,
      newColumn: false,
    };

    setData([...tableData, newRow]);
  };

  const onDeleteSelectedRows = () => {
    // Filter out the selected rows and update the table data
    const updatedData = tableData.filter(
      (item: any) => !selectedRowKeys.includes(item.key)
    );
    setData(updatedData);
    setSelectedRowKeys([]);
  };

  const bankRowSelection: TableRowSelection<DataType> = {
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

  const columns: ColumnsType<any> = [
    {
      title: "Bank",
      dataIndex: "name",
      key: "name",
      render: () => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            placeholder="Select Bank"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Bank 1",
              },
              {
                value: "2",
                label: "Bank 2",
              },
              {
                value: "3",
                label: "Bank 3",
              },
              {
                value: "4",
                label: "Bank 4",
              },
              {
                value: "5",
                label: "Bank 5",
              },
              {
                value: "6",
                label: "Bank 6",
              },
            ]}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Bank Branch",
      dataIndex: "bankbranchname",
      key: "name",
      render: () => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            placeholder="Select Bank Branch"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Mirpur",
              },
              {
                value: "2",
                label: "Abdullahpur",
              },
              {
                value: "3",
                label: "Mirpur 10",
              },
              {
                value: "4",
                label: "Gulshan",
              },
              {
                value: "5",
                label: "Dhanmondi",
              },
              {
                value: "6",
                label: "Uttara",
              },
            ]}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Bank Account Type",
      dataIndex: "bankbranchname",
      key: "name",
      render: () => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            placeholder="Select Account Type"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Savings",
              },
              {
                value: "2",
                label: "Current",
              },
              {
                value: "3",
                label: "Personal",
              },
              {
                value: "4",
                label: "Mudaraba",
              },
              {
                value: "5",
                label: "Mohor",
              },
              {
                value: "6",
                label: "Hajj",
              },
            ]}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Supplier Account Number",
      dataIndex: "bankbranchname",
      key: "name",
      render: () => (
        <>
          <Col
            className="gutter-row"
            style={{
              padding: "0px",
            }}
          >
            <FormInput
              type="text"
              name="admin.name.firstName"
              placeholder="Enter Supplier Account Number..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Supplier Account Number Bn",
      dataIndex: "bankbranchname",
      key: "name",
      render: () => (
        <>
          <Col
            className="gutter-row"
            style={{
              padding: "0px",
            }}
          >
            <FormInput
              type="text"
              name="admin.name.firstName"
              placeholder="Enter Supplier Account Number Bn..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
  ];

  return (
    <div>
      <p className="text-xl font-semibold	pb-5">Bank Info </p>
      <Table
        style={{
          width: "100%",
        }}
        pagination={false}
        rowSelection={bankRowSelection}
        columns={columns}
        dataSource={tableData}
      />
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
    </div>
  );
};

export default SupplierBankInfoChildTable;
