"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DRZTableInForm from "@/components/ui/DRZChildTableInForm";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { IDepartment } from "@/types";
import { EyeOutlined, MinusCircleOutlined } from "@ant-design/icons";

import { Button, Col, Row, Table, message } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";

// table children

export interface DataType {
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

export const initialData: any = [
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

const ViewReceivePage = () => {
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

    try {
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
        padding: "30px",
        backgroundColor: "white",
      }}
    >
      <div>
        <Form submitHandler={onSubmit}>
          <div
            className="bd-highlight"
            style={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "40px",
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
          <div
            style={{
              // border: "1px solid #d9d9d9",
              // borderRadius: "5px",
              padding: "40px",
              marginBottom: "10px",
            }}
          >
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
                  label="Receive No:"
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
                  label="Receive Data:"
                  size="large"
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
                  required
                  label="Transaction Source Type:"
                  placeholder="Receive"
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
                  required
                  label="TransactionType:"
                  placeholder="Purchase"
                  disable
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
                    aria-required
                  >
                    <FormInput
                      type="text"
                      name="admin.name.firstName"
                      size="large"
                      required
                      label="Transaction Sub Type:"
                      placeholder="Local Purchase"
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
                      required
                      label="Product Type:"
                      placeholder="Trading"
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
                      required
                      label="Rebate Type"
                      placeholder="Non Rebatable"
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
                      required
                      label="Financial Year"
                      placeholder="2023-2024"
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
                      required
                      label="VAT Month"
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
                    <FormInput
                      type="text"
                      name="admin.name.firstName"
                      size="large"
                      label="Supplier Name"
                      placeholder="Rahim Enterprise"
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
                      label="Supplier BIN/NID No:"
                      placeholder="33322222"
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
                      label="Challan Type:"
                      placeholder="VAT Challan"
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
                      label="Challan No:"
                      placeholder="0001"
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
                  >
                    <FormDatePicker
                      name="admin.dateOfBirth"
                      label="Challan Data:"
                      size="large"
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
                      label="Payment Mode:"
                      placeholder="Bank"
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
                      label="Bank Name:"
                      placeholder="AB Bank"
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
                      label="Cheque/RTGS/Pay Order No:"
                      placeholder="0001"
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
                      label="Currency:"
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
                      label="Grand Total Ammount:"
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
                      label="VDS Required:"
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
                      label="Remarks:"
                      placeholder="Remarks.."
                    />
                  </Col>
                </>
              )}
            </Row>
          </div>

          <Row
            style={{
              padding: "0px 40px",
              backgroundColor: "white",
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
              justifyContent: "end",
              padding: "0px 120px",
              alignItems: "center",
            }}
          >
            <Button
              style={{
                background: "#ff5100",
                padding: "0px 30px",
                color: "white",
              }}
              className="ms-3"
            >
              close
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewReceivePage;
