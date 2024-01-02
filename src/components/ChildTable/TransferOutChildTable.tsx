import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../Modal/ChildTableModal";

const TransferOutChildTable = ({ rowSelection, tableData }: any) => {

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
      align: "left",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: 'left' }}
            placeholder="--Select Item--"
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
      title: "Issue Qty",
      dataIndex: "qty",
      align: "right",
    },
    {
      title: "Issue Rate",
      dataIndex: "price",
      align: "right",
    },
    {
      title: "Issue Ammount Current Curr",
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

export default TransferOutChildTable;
