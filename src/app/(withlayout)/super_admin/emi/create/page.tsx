"use client";

import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { genderOptions } from "@/constants/global";
import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { IDepartment } from "@/types";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";

import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import { Button, Col, Radio, Row, Table, message } from "antd";
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
    uom: "23",
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

const TransferOutCreatePage = () => {
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
      <UMBreadCrumb lastName="create" pageName="EMI Declaration" />
      <div
        style={{
          padding: "20px 0px",
          marginTop: "0px",
        }}
      >
        <div style={{}}>
          <Form submitHandler={onSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
              {/* emi model  */}
              <div
                className="shadow-md bg-orange-50 p-4 rounded-md "
                style={{ backgroundColor: "#fff6f6e6" }}
              >
                {" "}
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
                    <DRZSelectField
                      style={{
                        width: "100%",
                        textAlign: "left",
                      }}
                      size="large"
                      name="admin.gender"
                      options={genderOptions}
                      label="Model Name: "
                      placeholder="Model Name"
                      required
                      onSearch={onSearch}
                      filterOption={filterOption}
                    />
                  </Col>
                </Row>
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
                    <DRZSelectField
                      style={{
                        width: "100%",
                        textAlign: "left",
                      }}
                      size="large"
                      name="admin.gender"
                      options={genderOptions}
                      label="Product Name: "
                      placeholder="Product Name"
                      required
                      onSearch={onSearch}
                      filterOption={filterOption}
                    />
                  </Col>
                </Row>
                {/* emi data  */}
                <Row
                  style={{
                    padding: "0px 40px",
                  }}
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  {" "}
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <FormDatePicker
                      name="admin.dateOfBirth"
                      label="EMI Data:"
                      size="large"
                      required
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <FormDatePicker
                      name="admin.dateOfBirth"
                      label="EMI Start Data:"
                      size="large"
                      required
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    padding: "0px 40px",
                  }}
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  {" "}
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <FormInput
                      type="text"
                      name="admin.name.firstName"
                      size="large"
                      label="Base Price"
                      required
                      placeholder="Base Price"
                      disable
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginTop: "30px",
                    }}
                    aria-required
                  >
                    <Radio>6.3 by EMI</Radio>
                  </Col>
                  {/* <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <DRZSelectField
                      style={{
                        width: "100%",
                        textAlign: "left",
                      }}
                      size="large"
                      name="admin.gender"
                      options={genderOptions}
                      label="Product Name: "
                      placeholder="Product Name"
                      required
                      onSearch={onSearch}
                      filterOption={filterOption}
                    />
                  </Col> */}
                </Row>
                <Row
                  style={{
                    padding: "0px 40px",
                  }}
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  {" "}
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <FormInput
                      type="text"
                      name="admin.name.firstName"
                      size="large"
                      label="Number of EMI"
                      required
                      placeholder="Number of EMI"
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <FormInput
                      type="text"
                      name="admin.name.firstName"
                      size="large"
                      label="EMI Amount(BDT)"
                      required
                      placeholder="EMI Amount(BDT)"
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    padding: "0px 40px",
                  }}
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                >
                  {" "}
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <FormInput
                      type="text"
                      name="admin.name.firstName"
                      size="large"
                      label="Down Payment(BDT)"
                      required
                      placeholder="Down Payment(BDT)"
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "20px",
                    }}
                    aria-required
                  >
                    <FormInput
                      type="text"
                      name="admin.name.firstName"
                      size="large"
                      label="Total Payable(BDT)"
                      required
                      placeholder="Total Payable(BDT)"
                    />
                  </Col>
                </Row>
                <div className="flex justify-end items-center">
                  <div className="mr-10">
                    <DarazCommonButton>Populate</DarazCommonButton>
                  </div>
                </div>
              </div>

              {/* 2nd part  */}
              <div
                className="shadow-md bg-orange-50 p-4 rounded-md "
                style={{ backgroundColor: "#fff6f6e6" }}
              >
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs bg-primary text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Inst. No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Inst. Month
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>

              {/* end emi model  */}
            </div>
            <div
              style={{
                marginBottom: "10px",
                padding: "20px",
                marginTop: "15px",

                backgroundColor: "#fff6f6e6",
                borderRadius: "10px",
                border: "1px solid #e9e8e8",
                boxSizing: "border-box",
              }}
            >
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                      textAlign: "left",
                    }}
                    size="large"
                    name="admin.gender"
                    options={genderOptions}
                    label="Customer Mobile: "
                    placeholder="Madina Group Ltd"
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
                    label="Customer Name:"
                    required
                    placeholder="Customer Name"
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
                    label="Customer  Bin/Nid:"
                    required
                    placeholder="Customer Bin/Nid"
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
                    label="Customer Address"
                    required
                    placeholder="Customer Address"
                    disable
                  />
                </Col>

                {!hideItem && (
                  <>
                    <Col
                      className="gutter-row"
                      span={6}
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <FormInput
                        type="text"
                        name="admin.name.firstName"
                        size="large"
                        label="Delivery Address"
                        required
                        placeholder="Delivery Address"
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
                        label="Remarks"
                        required
                      />
                    </Col>
                  </>
                )}
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
                ></div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    gap: "10px",
                  }}
                >
                  <Link href={`/super_admin/transfer-out`}>
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

export default TransferOutCreatePage;
