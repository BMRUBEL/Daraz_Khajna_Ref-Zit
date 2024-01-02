import React, { useState } from "react";
import { Button, Col, Select, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import ChildTableModal from "../../Modal/ChildTableModal";
import FormDatePicker from "@/components/Forms/FormDatePicker";

const VatStructureChildTable = ({ rowSelection, tableData }: any) => {
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
      title: "Vat Rate Ref.",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "60%" }}
            placeholder="--Select--"
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
      title: "Tran Sub Type",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "60%" }}
            placeholder="--Select--"
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
              
            ]}
          />
        </>
      ),
      align: "center",
      width: "20%",
    },
    {
      title: "Vat Rate Type",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "60%" }}
            placeholder="--Select--"
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
              
            ]}
          />
        </>
      ),
      align: "center",
      width: "20%",
    },
    {
      title: "Product Rate Type",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "60%" }}
            placeholder="--Select--"
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
              
            ]}
          />
        </>
      ),
      align: "center",
      width: "20%",
    },
    // {
    //   title: "Product Rate Type",
    //   dataIndex: "name",
    //   key: "name",
    //   render: (_, { duty }) => (
    //     <>
    //       <Select
    //         showSearch
    //         style={{ width: "60%" }}
    //         placeholder="--Select--"
    //         optionFilterProp="children"
    //         filterOption={(input, option) =>
    //           (option?.label ?? "").includes(input)
    //         }
    //         filterSort={(optionA, optionB) =>
    //           (optionA?.label ?? "")
    //             .toLowerCase()
    //             .localeCompare((optionB?.label ?? "").toLowerCase())
    //         }
    //         options={[
    //           {
    //             value: "1",
    //             label: "Not Identified",
    //           },
    //           {
    //             value: "2",
    //             label: "Closed",
    //           },
              
    //         ]}
    //       />
    //     </>
    //   ),
    //   align: "center",
    //   width: "20%",
    // },
    {
      title: "Effective Date",
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
            <FormDatePicker
             
              name="admin.dateOfBirth"
              placeholder="dd-mm-yy"
            />
          </Col>
        </>
      ),
      align: "left",
      width: "20%",
    },

    {
      title: "CD(%)",
      dataIndex: "uom",
      width: "20%",
      align: "center",
    },
    {
      title: "RD(%)",
      dataIndex: "uom",
      width: "20%",
      align: "center",
    },
    {
      title: "SD(%)",
      dataIndex: "uom",
      width: "20%",
      align: "center",
    },
    {
      title: "VAT(%)",
      dataIndex: "qty",
      align: "center",
    },
    {
      title: "AIT(%)",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Is Fixed Rate?",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "50%" }}
            placeholder="--Select--"
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
                label: "No",
              },
              {
                value: "2",
                label: "Yes",
              },
              
            ]}
          />
        </>
      ),
      align: "center",
      width: "20%",
    },
    {
      title: "FR UOM",
      dataIndex: "name",
      key: "name",
      render: (_, { duty }) => (
        <>
          <Select
            showSearch
            style={{ width: "50%" }}
            placeholder="--Select--"
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
                label: "No",
              },
              {
                value: "2",
                label: "Yes",
              },
              
            ]}
          />
        </>
      ),
      align: "center",
      width: "20%",
    },
    {
      title: "Fixed Rate",
      dataIndex: "price",
      align: "center",
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

export default VatStructureChildTable;
