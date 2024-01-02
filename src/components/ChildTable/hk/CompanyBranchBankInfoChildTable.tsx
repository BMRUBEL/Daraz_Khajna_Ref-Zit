import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../../Modal/ChildTableModal";
import FormInput from "@/components/Forms/FormInput";

import { Col, Row, message } from "antd";

const CompanyBranchBankInfoChildTable = ({ rowSelection, tableData }: any) => {
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
                label: "Mirpur 2",
              },
              {
                value: "4",
                label: "Gulshan",
              },
              {
                value: "5",
                label: "Badda",
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
      title: "Company Account Number",
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
              placeholder="Enter Company Account Number..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Company Account Number Bn",
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
              placeholder="Enter Company Account Number Bn..."
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
        rowSelection={rowSelection}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default CompanyBranchBankInfoChildTable;
