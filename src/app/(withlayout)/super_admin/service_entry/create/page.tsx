"use client";

import DRZTableInForm from "@/components/ChildTable/ServiceChildTable";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import RebateInput from "@/components/Forms/RebateInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { genderOptions } from "@/constants/global";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { IDepartment } from "@/types";
import {
  DeleteOutlined,
  EyeOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

import DarazCheckBox from "@/components/Forms/DarazCheckBox";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import { Button, Col, Row, Table, message } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import Link from "next/link";
import { useState } from "react";

// table children
interface DataType {
  key: React.Key;
  name: string;
  uom: string;
  qty: number;
  price: number;
  issueAmnt: number;
  sd_amnt: number;
  vat_amnt: number;
  t_damnt: number;
  duty: boolean;
  newColumn: boolean;
}

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

const CreateAdminPage = () => {
  // state
  const [hideItem, setHideItem] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [showNewColumn, setShowNewColumn] = useState(false);
  const [tableData, setData] = useState(initialData);

  // rtk queries
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });
  const [addAdminWithFormData] = useAddAdminWithFormDataMutation();
  //@ts-ignore
  const departments: IDepartment[] = data?.departments;

  const departmentOptions =
    departments &&
    departments?.map((department) => {
      return {
        label: department?.title,
        value: department?.id,
      };
    });

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // submit handler
  const onSubmit = async (values: any) => {
    console.log(values, "values");
    const obj = { ...values };
    const file = obj["file"];
    console.log(file, "file");
    delete obj["file"];
    console.log(obj, "file");
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    console.log(formData, "formData");
    try {
      await addAdminWithFormData(formData);
      message.success("receive created successfully!");
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // table children

  const toggleNewColumn = () => {
    setShowNewColumn(!showNewColumn);
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

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
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

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb lastName="Create" pageName="Service Entry" />
      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        <div style={{}}>
          <Form submitHandler={onSubmit}>
            <div
              style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "11px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
              }}
            >
              <div
                className="bd-highlight"
                style={{
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                {hideItem ? (
                  <Button
                    onClick={() => setHideItem(!hideItem)}
                    shape="round"
                    icon={<MinusCircleOutlined />}
                    size="middle"
                    style={{
                      background: "#02BBDB",
                      color: "white",
                    }}
                  />
                ) : (
                  <Button
                    onClick={() => setHideItem(!hideItem)}
                    type="primary"
                    shape="round"
                    icon={<EyeOutlined />}
                    size="middle"
                    style={{
                      background: "#02BBDB",
                      color: "white",
                    }}
                  />
                )}
              </div>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="admin.name.firstName"
                    size="large"
                    label="Transaction No:"
                    required
                    placeholder="<<</New Item/>>"
                    disable
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <FormDatePicker
                    name="admin.dateOfBirth"
                    label="Transaction Data:"
                    size="large"
                    required
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  <FormInput
                    type="text"
                    name="admin.name.firstName"
                    size="large"
                    label="VAT Month"
                    required
                    placeholder="JULY-23"
                    disable
                  />
                </Col>

                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  <RebateInput
                    type="text"
                    name="admin.name.firstName"
                    size="large"
                    label="Rebate Type:"
                    required
                    placeholder="NON REBATEABLE"
                  />
                </Col>
                {!hideItem && (
                  <>
                    {" "}
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        name="admin.gender"
                        options={genderOptions}
                        label="Supplier Name: "
                        placeholder="--SELECT SUPPLIER--"
                        required
                        onSearch={onSearch}
                        filterOption={filterOption}
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Supplier BIN/NID No:"
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Product Type:"
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        name="admin.gender"
                        options={genderOptions}
                        label="Import/ Local Purchase "
                        placeholder="--SELECT SUPPLIER--"
                        required
                        onSearch={onSearch}
                        filterOption={filterOption}
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        name="admin.gender"
                        options={genderOptions}
                        label="Challan Type: "
                        placeholder="--Select Challan Type--"
                        required
                        onSearch={onSearch}
                        filterOption={filterOption}
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Bill No:"
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <FormDatePicker
                        name="admin.dateOfBirth"
                        label="Bill Data:"
                        size="large"
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        name="admin.gender"
                        options={genderOptions}
                        label="Payment Mode: "
                        placeholder="...Cash/Bkash..."
                        onSearch={onSearch}
                        filterOption={filterOption}
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <DRZSelectField
                        style={{
                          width: "100%",
                        }}
                        size="large"
                        name="admin.gender"
                        options={genderOptions}
                        label="Bank Name: "
                        placeholder="--Select Bank--"
                        onSearch={onSearch}
                        filterOption={filterOption}
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Instrument No:"
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormDatePicker
                        name="admin.dateOfBirth"
                        label="Instrument Data:"
                        size="large"
                        required
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Total Service Ammount:"
                        required
                        disable
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Total VAT Ammount:"
                        required
                        disable
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Total Rebate Amount:"
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                        marginTop: "5px",
                      }}
                      aria-required
                    >
                      <DarazCheckBox
                        options={[{ label: "VDS Reuired", value: "dsfj" }]}
                        name="admin.check"
                        label=""
                      />
                    </Col>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                      aria-required
                    >
                      <FormInput
                        type="text"
                        name="admin.remarks"
                        size="large"
                        label="Remarks:"
                        placeholder="Remarks"
                      />
                    </Col>
                  </>
                )}
              </Row>
            </div>

            <div
              style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "11px",
                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
              }}
            >
              <Row
                style={{
                  padding: "0px 40px",
                }}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              >
                {" "}
                <Col
                  className="gutter-row"
                  span={24}
                  style={{
                    marginBottom: "20px",
                  }}
                  aria-required
                >
                  <DRZTableInForm
                    tableData={tableData}
                    rowSelection={rowSelection}
                  />
                </Col>
              </Row>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0px 40px",
                  alignItems: "center",
                }}
              >
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

                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <Link href={`/super_admin/receive`}>
                    {" "}
                    <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                  </Link>
                  <DarazCommonButton>Save</DarazCommonButton>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminPage;
