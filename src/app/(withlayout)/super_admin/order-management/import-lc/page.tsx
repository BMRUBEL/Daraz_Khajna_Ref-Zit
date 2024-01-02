"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useDebounced } from "@/redux/hook";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, Result, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useImportlcinformationQuery } from "@/redux/api/OrderManagementApi/importLcInformationApi";
import dayjs from "dayjs";


const ImportLCinfo = () => {


  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // assign to query
  // query["limit"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;

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
  const { data: otherAdjustmentChData, isLoading } = useImportlcinformationQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });

  if (!isLoading) {
  }

  // define columns of table
  const columns = [
    {
      title: "Import/BBLC No",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "BBLC Date",
      dataIndex: "transactionDate",
      align: "center",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Import/BBLC Amount",
      dataIndex: "vatMonth",
      align: "center",
    },
    {
      title: "Export LC No",
      dataIndex: "totalBilAmount",
      align: "center",
    },
    {
      title: "Export LC Date",
      // dataIndex: "totalVatAmount",
      dataIndex: "transactionDate",
      align: "center",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      
    },
    {
      title: "UP/IP No",
      dataIndex: "totalAdjustableAmount",
      align: "center",
    },
    {
      title: "UP/IP Date",
      // dataIndex: "totalVatAmount",
      dataIndex: "transactionDate",
      align: "center",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      
    },
    {
      title: "Currency",
      dataIndex: "totalAdjustableAmount",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "registrationStatus",
      // sorter: true,
      align: "center",
      render: (registrationStatus: any) => {
        return registrationStatus ? "Opened" : "Applied";
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      width: 220,
      align: "center",
      render: (record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link
            href={`/super_admin/order-management/import-lc/view/${record}`}
          >
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
      ),
    },
  ];

  // pagination
  const onPaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setSize(pageSize);
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

  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb pageName="Import LC Information" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
            <Link
              href="/super_admin/order-management/import-lc/create"
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
            dataSource={otherAdjustmentChData?.result?.content}
            onTableChange={onTableChange}
            pageSize={size}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
            totalPages={otherAdjustmentChData?.result?.totalElements}
          />
        </div>
      </div>
    </>
  );
};

export default ImportLCinfo;
