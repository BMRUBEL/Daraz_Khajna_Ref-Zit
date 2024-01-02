import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../Modal/ChildTableModal";

const DRZvdsForSellerTableInForm = ({ rowSelection, tableData }:any) => {
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
      title: "Issue Master ID",
      dataIndex: "issueMasterId",
      key: "issueMasterId",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="--Select ID--"
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
                label: "Service 1",
              },
              {
                value: "3",
                label: "Service 2",
              },
              {
                value: "4",
                label: "Service 3",
              },
              {
                value: "5",
                label: "Service 4",
              },
              {
                value: "6",
                label: "Service 5",
              },
            ]}
          />
        </>
      ),
    },

    {
      title: "Issue Amount",
      dataIndex: "issueAmount",
    },
    {
      title: "VAT Amount",
      dataIndex: "vatAmount",
    },
    {
      title: "Deducted VAT Amount",
      dataIndex: "deductedVatAmount",
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

export default DRZvdsForSellerTableInForm;
