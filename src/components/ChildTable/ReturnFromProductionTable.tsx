import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../Modal/ChildTableModal";
import FormInput from "../Forms/FormInput";

const ReceiveFromProductionChildTable = ({ rowSelection, tableData }: any) => {
  // const toggleNewColumn = () => {
  //   setShowNewColumn(!showNewColumn);
  // };

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Item Name",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="--Select Item Name--"
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
                label: "Not Identified",
              },
              {
                value: "2",
                label: "Closed",
              },
              {
                value: "3",
                label: "Communicated",
              },
              {
                value: "4",
                label: "Identified",
              },
              {
                value: "5",
                label: "Resolved",
              },
              {
                value: "6",
                label: "Cancelled",
              },
            ]}
          />
        </>
      ),
      align: "center",
      width: "20%",
    },

    {
      title: "UOM",
      dataIndex: "uom",
      width: "20%",
      align: "center",
    },
    {
      title: "Stock Qty",
      dataIndex: "uom",
      width: "20%",
      align: "center",
    },
    {
      title: "Receive Qty",
      dataIndex: "qty",
      align: "center",
      render: (text, record) => (
        <FormInput
          type="text"
          name="admin.name.firstName"
          size="small"
        />
      ),
      width: "250px"
    },

    {
      title: "Receive Rate",
      dataIndex: "price",
      align: "right",
    },
  ];

  return (
    <div>
      <Table
        style={{
          width: "100%",
        }}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default ReceiveFromProductionChildTable;
