import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";

import ChildTableModal from "../Modal/ChildTableModal";

const DRZTableInForm = ({ rowSelection, tableData }: any) => {
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
      title: "Service Name",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Search to Select"
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
      title: "Purchase Qty",
      dataIndex: "uom",
    },

    {
      title: "Purchase Rate",
      dataIndex: "price",
      align: "right",
    },
    {
      title: "Service Amount",
      dataIndex: "issueAmnt",
      align: "right",
    },
    {
      title: "VAT Amount",
      dataIndex: "vat_amnt",
      align: "right",
    },
    {
      title: "Rebate  Amount",
      dataIndex: "t_damnt",
      align: "right",
    },
    {
      title: "Action",
      dataIndex: "duty",
      key: "duty",
      render: (_, { duty }) => (
        <>
          <Button
            type="primary"
            style={{
              backgroundColor: "green",
            }}
            onClick={showModal}
          >
            Details
          </Button>
          <ChildTableModal
            open={open}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </>
      ),
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
