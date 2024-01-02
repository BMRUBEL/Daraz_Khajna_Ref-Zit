import React, { useState } from "react";
import { Button, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../../Modal/ChildTableModal";
import FormInput from "@/components/Forms/FormInput";

import { Col, Row, message } from "antd";
import FormDatePicker from "@/components/Forms/FormDatePicker";

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
      title: "Type of Address",
      dataIndex: "name",
      key: "name",
      render: () => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            placeholder="Select Type Of Address"
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
                label: "Home",
              },
              {
                value: "2",
                label: "Office",
              },
              {
                value: "3",
                label: "Other",
              },
            ]}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },

    {
      title: "Holding",
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
              placeholder="Enter Holding..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Road",
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
              placeholder="Enter Road..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "Area",
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
              placeholder="Enter Area..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
    {
      title: "City",
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
              placeholder="Enter City..."
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },
   
    {
      title: "Coutry",
      dataIndex: "bankbranchname",
      key: "name",
      render: () => (
        <>
          <Select
            showSearch
            style={{ width: "100%", textAlign: "left" }}
            placeholder="Select Country"
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
                label: "America",
              },
              {
                value: "2",
                label: "Bangladesh",
              },
              {
                value: "3",
                label: "Canada",
              },
              {
                value: "4",
                label: "Vutan",
              },
              {
                value: "5",
                label: "Malaysia",
              },
              {
                value: "6",
                label: "UAE",
              },
            ]}
          />
        </>
      ),
      align: "left",
      width: "20%",
    },
  ];

  return (
    <div>
      <p className="text-xl font-semibold	pb-5">Address Details </p>
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
