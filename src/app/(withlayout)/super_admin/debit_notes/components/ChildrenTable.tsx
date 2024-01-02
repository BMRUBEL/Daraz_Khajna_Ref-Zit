import { Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
const DRZTableInForm = ({ rowSelection, tableData }: any) => {
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
            placeholder="Item Name"
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
    },

    {
      title: "UOM",
      dataIndex: "uom",
    },
    {
      title: "Prev. Qty",
      dataIndex: "qty",
      align: "right",
    },
    {
      title: "Rate",
      dataIndex: "price",
      align: "right",
    },
    {
      title: "Prev Amount",
      dataIndex: "issueAmnt",
      align: "right",
    },
    {
      title: "Prev VAT",
      dataIndex: "vat_amnt",
      align: "right",
    },
    {
      title: "Prev SD",
      dataIndex: "t_damnt",
      align: "right",
    },
    {
      title: "Stock Qty",
      dataIndex: "t_damnt",
      align: "right",
    },
    {
      title: "Return Qty",
      dataIndex: "t_damnt",
      align: "right",
    },
    {
      title: "Return Amnt",
      dataIndex: "t_damnt",
      align: "right",
    },
    {
      title: "Return VAT",
      dataIndex: "t_damnt",
      align: "right",
    },
    {
      title: "Return SD",
      dataIndex: "t_damnt",
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

export default DRZTableInForm;
