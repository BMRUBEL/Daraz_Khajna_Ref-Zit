import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import FormInput from "@/components/Forms/FormInput";

import { Col, Row, message } from "antd";
import { DataType } from "@/app/(withlayout)/super_admin/receive/view/[slug]/page";
import { TableRowSelection } from "antd/es/table/interface";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useCustomerSetupDropDownQuery } from "@/redux/api/companyApi/customerInfoApi";

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

const CustomerBankInfoChildTable = ({}: any) => {
  const [tableData, setData] = useState(initialData);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  //Drop Down bank options Api Call
  const { data: datasource } = useCustomerSetupDropDownQuery({
    ...{},
  });
  // console.log(datasource, "source");

  const banksOptions =
    datasource &&
    datasource?.result?.banks.map((banksoptions: any) => {
      return {
        label: banksoptions?.name,
        value: parseInt(banksoptions?.id),
      };
    });

  //Drop Down bank branch options 

  const banksBranchOptions =
    datasource &&
    datasource?.result?.banks.map((banksbranchoptions: any) => {
      return {
        label: banksbranchoptions?.name,
        value: parseInt(banksbranchoptions?.id),
      };
    });


    const banksAcountTypeOptions =
    datasource &&
    datasource?.result?.banks.map((bankaccounttype: any) => {
      return {
        label: bankaccounttype?.name,
        value: parseInt(bankaccounttype?.id),
      };
    });

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
            // filterOption={(input, option) =>
            //   (option?.label ?? "").includes(input)
            // }
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? "")
            //     .toLowerCase()
            //     .localeCompare((optionB?.label ?? "").toLowerCase())
            // }
            options={banksOptions}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Bank Branch",
      dataIndex: "name",
      key: "name",
      render: () => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            placeholder="Select Bank Branch"
            optionFilterProp="children"
            // filterOption={(input, option) =>
            //   (option?.label ?? "").includes(input)
            // }
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? "")
            //     .toLowerCase()
            //     .localeCompare((optionB?.label ?? "").toLowerCase())
            // }
            options={banksBranchOptions}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Bank Account Type",
      dataIndex: "name",
      key: "name",
      render: () => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            placeholder="Select Account Type"
            optionFilterProp="children"
            // filterOption={(input, option) =>
            //   (option?.label ?? "").includes(input)
            // }
            // filterSort={(optionA, optionB) =>
            //   (optionA?.label ?? "")
            //     .toLowerCase()
            //     .localeCompare((optionB?.label ?? "").toLowerCase())
            // }
            options={banksAcountTypeOptions}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Customer Account Number",
      dataIndex: "",
      key: "",
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
              name="customerName"
              placeholder="Enter Customer Account Number..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Customer Account Number Bn",
      dataIndex: "",
      key: "",
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
              name="customerNameBn"
              placeholder="Enter Customer Account Number Bn..."
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

export default CustomerBankInfoChildTable;
