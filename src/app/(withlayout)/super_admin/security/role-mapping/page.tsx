"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useDebounced } from "@/redux/hook";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Result,
  message,
  Switch,
  Select,
  Row,
  Col,
  Table,
} from "antd";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import {
  useOtherAdjustmentQuery,
  useOtherAdjustmentDropDownQuery,
} from "@/redux/api/commercialApi/otherAdjustmentApi";
import dayjs from "dayjs";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";

import { Checkbox, Divider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import FormInput from "@/components/Forms/FormInput";
import DarazSelectWithCheckBox from "@/components/Forms/DRZSelectFieldWithCheckBox";
import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import { Pagination } from "antd";

const RoleMapping = () => {
  // states for Check All
  const [selectAllCheckAll, setSelectAllCheckAll] = useState(false);
  const [selectedRowsCheckAll, setSelectedRowsCheckAll] = useState([]);

  // states for view

  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  // states for add
  const [selectAllAdd, setSelectAllAdd] = useState(false);
  const [selectedRowsAdd, setSelectedRowsAdd] = useState([]);

  // states for update
  const [selectAllUpdate, setSelectAllUpdate] = useState(false);
  const [selectedRowsUpdate, setSelectedRowsUpdate] = useState([]);

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // query
  const query: Record<string, any> = {
    searchTerm: debouncedTerm,
    sortBy,
    sortOrder,
  };
  // set debounce on searchTerm if debounce exists
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // get department data
  const { data: otherAdjustmentChData } = useOtherAdjustmentQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
  });

  // Use useMemo to memoize roleMappingData
  const roleMappingData = useMemo(
    () => otherAdjustmentChData?.result?.content || [],
    [otherAdjustmentChData?.result?.content]
  );

  //Check all

  // const handleCheckAllChange = () => {
  //   setSelectAllCheckAll(!selectAllCheckAll);
  //   setSelectAll(!selectAll);
  //   setSelectAllAdd(!selectAllAdd);
  //   setSelectAllUpdate(!selectAllUpdate);
  // };
  const handleCheckAllChange = () => {
    if (selectAllCheckAll) {
      setSelectAllCheckAll(false);
      setSelectAll(false);
      setSelectAllAdd(false);
      setSelectAllUpdate(false);
      setSelectedRowsCheckAll([]);
    } else {
      const allRecordIds =
        roleMappingData?.map((record: any) => record.id) || [];
      setSelectAllCheckAll(true);
      setSelectAll(true);
      setSelectAllAdd(true);
      setSelectAllUpdate(true);
      setSelectedRowsCheckAll(allRecordIds);
    }
  };

  // pagination
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);

    // Update the Select All checkbox state based on the current page
    // const currentPageSelectedRows = selectedRows.filter((id) =>
    //   roleMappingData
    //     .slice((page - 1) * pageSize, page * pageSize)
    //     .some((record) => record.id === id)
    // );
    // const isAllSelected = currentPageSelectedRows.length === pageSize;
    // setSelectAll(isAllSelected);
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectAll(false);
      setSelectedRows([]);
    } else {
      const allRecordIds =
        roleMappingData?.map((record: any) => record.id) || [];
      setSelectAll(true);
      setSelectedRows(allRecordIds);
    }
  };

  const handleCheckboxChange = (recordId: number) => {
    const updatedSelectedRows = [...selectedRows, ...selectedRowsCheckAll];
    const index = updatedSelectedRows.indexOf(recordId);

    if (index !== -1) {
      updatedSelectedRows.splice(index, 1);
    } else {
      updatedSelectedRows.push(recordId);
    }

    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.length === roleMappingData.length);
  };

  //Add

  const handleSelectAllChangeAdd = () => {
    if (selectAllAdd) {
      setSelectAllAdd(false);
      setSelectedRowsAdd([]);
    } else {
      const allRecordIds =
        roleMappingData?.map((record: any) => record.id) || [];
      setSelectAllAdd(true);
      setSelectedRowsAdd(allRecordIds);
    }
  };

  const handleCheckboxChangeAdd = (recordId: number) => {
    const updatedSelectedRows = [...selectedRowsAdd, ...selectedRowsCheckAll];
    const index = updatedSelectedRows.indexOf(recordId);

    if (index !== -1) {
      updatedSelectedRows.splice(index, 1);
    } else {
      updatedSelectedRows.push(recordId);
    }

    setSelectedRowsAdd(updatedSelectedRows);
    setSelectAllAdd(updatedSelectedRows.length === roleMappingData.length);
  };

  //Update

  const handleSelectAllChangeUpdate = () => {
    if (selectAllUpdate) {
      setSelectAllUpdate(false);
      setSelectedRowsUpdate([]);
    } else {
      const allRecordIds =
        roleMappingData?.map((record: any) => record.id) || [];
      setSelectAllUpdate(true);
      setSelectedRowsUpdate(allRecordIds);
    }
  };

  const handleCheckboxChangeUpdate = (recordId: number) => {
    const updatedSelectedRows = [
      ...selectedRowsUpdate,
      ...selectedRowsCheckAll,
    ];
    const index = updatedSelectedRows.indexOf(recordId);

    if (index !== -1) {
      updatedSelectedRows.splice(index, 1);
    } else {
      updatedSelectedRows.push(recordId);
    }

    setSelectedRowsUpdate(updatedSelectedRows);
    setSelectAllUpdate(updatedSelectedRows.length === roleMappingData.length);
  };

  // sortBy and sortOrder
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "ASC" : "DESC");
  };

  // reset filters
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const { data, isLoading } = useOtherAdjustmentDropDownQuery({});

  const adjestmentData = data?.result?.adjustmentType;

  const adjustmentOptions =
    adjestmentData &&
    adjestmentData.map((adjestmenttype: any) => {
      return {
        label: adjestmenttype?.name,
        value: parseInt(adjestmenttype?.id),
      };
    });

  const CheckboxHeader = ({ label, checked, onChange }) => (
    <th className="px-2 py-2">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {label}
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-indigo-600 ml-2"
          checked={checked}
          onChange={onChange}
        />
      </div>
    </th>
  );

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      sorter: true,
    },
    {
      title: "Menu Name",
      dataIndex: "storeName",
      key: "storeName",
    },
    {
      title: "Menu Name Bangla",
      dataIndex: "branchMasterName",
      key: "branchMasterName",
    },
    {
      title: (
        <CheckboxHeader
          label="View"
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
      ),
      key: "selectAll",
      render: (record: any) => (
        <CheckboxHeader
          label=""
          checked={selectAll || selectedRows.includes(record.id)}
          onChange={() => handleCheckboxChange(record.id)}
        />
      ),
    },
    {
      title: (
        <CheckboxHeader
          label="Add"
          checked={selectAllAdd}
          onChange={handleSelectAllChangeAdd}
        />
      ),
      key: "selectAllAdd",
      render: (record: any) => (
        <CheckboxHeader
          label=""
          checked={selectAllAdd || selectedRowsAdd.includes(record.id)}
          onChange={() => handleCheckboxChangeAdd(record.id)}
        />
      ),
    },
    {
      title: (
        <CheckboxHeader
          label="Update"
          checked={selectAllUpdate}
          onChange={handleSelectAllChangeUpdate}
        />
      ),
      key: "selectAllUpdate",
      render: (record: any) => (
        <CheckboxHeader
          label=""
          checked={selectAllUpdate || selectedRowsUpdate.includes(record.id)}
          onChange={() => handleCheckboxChangeUpdate(record.id)}
        />
      ),
    },
  ];

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // submit handler
  const onSubmit = () => {};

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb pageName="Permissions" />

        <ActionBar>
          <h3>Store Menu Role Mapping</h3>

          <div>
            <Input
              size="large"
              className="shadow-sm"
              placeholder="Search by Menu Name"
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
              }}
            />
          </div>
        </ActionBar>

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
          <Form submitHandler={onSubmit}>
            <div style={{}}>
              <Row
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
                gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              >
                <Col
                  className="gutter-row"
                  span={6}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <DRZSelectField
                    style={{ width: "100%", textAlign: "left" }}
                    name="roleId"
                    options={adjustmentOptions}
                    label="Role"
                    placeholder="Select Role"
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
                    style={{ width: "100%", textAlign: "left" }}
                    name="storeId"
                    options={adjustmentOptions}
                    label="Store"
                    placeholder="Select Store"
                    required
                  />
                </Col>
                <Col
                  className="gutter-row"
                  span={6}
                  style={
                    {
                      // marginBottom: "20px",
                    }
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "left",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
                      checked={selectAllCheckAll}
                      onChange={handleCheckAllChange}
                    />
                    Check All
                  </div>
                </Col>
              </Row>
            </div>

            <Table
              dataSource={roleMappingData}
              columns={columns}
              onChange={onTableChange}
              pagination={{
                current: page,
                pageSize: size,
                total: otherAdjustmentChData?.result?.totalElements,
                onChange: onPaginationChange,
                showSizeChanger: true,
              }}
              style={{
                marginTop: "16px",
                textAlign: "right",
                marginBottom: "10px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`#`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>

              <DarazCommonButton>Save</DarazCommonButton>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default RoleMapping;
