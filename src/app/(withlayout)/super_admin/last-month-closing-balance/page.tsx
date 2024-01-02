"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useAdminsQuery } from "@/redux/api/adminApi";
import { useDebounced } from "@/redux/hook";
import {
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const LastMonthClosingBalance = () => {

  const dummyData = [
    { id: 1, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 2, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 3, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 4, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 5, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 6, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 7, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 8, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 9, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" },
    { id: 10, branchName: "Daraz Bangladesh Ltd.", VatMonth: "Jul-23", vatAmount:"230909", sdAmount: "34098" }
  ];

  // query
  const query: Record<string, any> = {};

  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // assign to query
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  // create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // set debounce on searchTem if debounce exist
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // get department data
  const { data, isLoading } = useAdminsQuery({ ...query });
  console.log(data);
  // department delete hook
  // const [deleteDepartment] = useDeleteDepartmentMutation();

  //const departments = data?.admins;
  const departments = dummyData;
  const meta = {
    total: 10
  };
  //const meta = data?.meta;

  // define columns of table
  const columns = [
    {
      title: "SL.",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
    },
    {
      title: "VAT Month",
      dataIndex: "VatMonth",
    },
    {
      title: "VAT Amount",
      dataIndex: "vatAmount",
    },
    {
      title: "SD Amount",
      dataIndex: "sdAmount",
    },
    
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
          </>
        );
      },
    },
  ];

  // pagination
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    setPage(page);
    setSize(pageSize);
  };

  // sortBy and sortOrder
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  // reset filters
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb  pageName="Last Month Closing Balance" />

        <div style={{ 
          padding: "10px",
       }}>
          <ActionBar>
            <Link href="/super_admin/last-month-closing-balance/create">
              <button className="text-white shadow-xl bg-primary hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none">
                Add New
              </button>
            </Link>

            <div>
              <Input
                size="large"
                className="shadow-sm"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                }}
              />
              {(!!sortBy || !!sortOrder || !!searchTerm) && (
                <Button
                  style={{ margin: "0px 5px" }}
                  type="primary"
                  onClick={resetFilters}
                >
                  <ReloadOutlined />
                </Button>
              )}
            </div>
          </ActionBar>

          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={departments}
            onTableChange={onTableChange}
            pageSize={size}
            totalPages={meta?.total}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
          />
        </div>
      </div>
    </>
  );
};

export default LastMonthClosingBalance;
