"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useGetAllReceiveQuery } from "@/redux/api/receive/receiveApi";
import { useDebounced } from "@/redux/hook";
import {
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";





const PriceDetermination = () => {


  // states
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
  // set debounce on searchTem if debounce exist
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // Api call
  const { data, isLoading } = useGetAllReceiveQuery({
    ...query, sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });

  //Data from API
  const receiveData = data?.result?.content;


  // define columns of table
  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "PD No",
      dataIndex: "receiveNo",
      align: "center",
    },
    {
      title: "PD Name",
      dataIndex: "supplierName",
      align: "center",
    },
    {
      title: "Effective Form",
      dataIndex: "receiveDate",
      align: "center",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Item Name",
      dataIndex: "supplierName",
      align: "center",

    },
    {
      title: "UOM",
      dataIndex: "challanNumber",
      sorter: true,
      align: "center",
    },
    {
      title: "Total Cost[IOC]",
      dataIndex: "challanDate",
      align: "center",

    },
    {
      title: "Action",
      dataIndex: "id",
      align: "center",
      render: (record: any) => (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link href={`/super_admin/company-setting/price-determination/view/${record}`}>
              <Button
                style={{
                  fontSize: "13px",
                  padding: "0px 7px 5px 7px",
                  borderRadius: "0px",
                  height: "28px",
                }}
                className="bg-[#FF5100]"
                onClick={() => console.log(record)}
                type="primary"
              >
                <EyeOutlined />
              </Button>
            </Link>
          </div>
        </>
      ),
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
    setSortOrder(order === "ascend" ? "ASC" : "DESC");
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
        <UMBreadCrumb pageName="Price Determination" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
            <Link
              href="/super_admin/company-setting/price-determination/create"
              className="text-white shadow-md hover:shadow-lg hover:bg-[#ff3300] bg-[#FF5100] cursor-pointer hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none"
            >
              Add New
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

            </div>
          </ActionBar>

          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={receiveData}
            onTableChange={onTableChange}
            pageSize={size}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
            totalPages={data?.result?.totalElements}
          />
        </div>
      </div>
    </>
  );
};

export default PriceDetermination;
