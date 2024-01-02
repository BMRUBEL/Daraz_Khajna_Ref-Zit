"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useDebounced } from "@/redux/hook";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useLastMonthColumQuery } from "@/redux/api/commercialApi/lastMonthColumApi";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";

const LastMonthClosingBalance = () => {
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
  const { data: lastMonthData, isLoading } = useLastMonthColumQuery({
    ...query,
    page:page,
    size:size,
    sortField: sortBy,
    sortDirection: sortOrder,
    searchTerm: debouncedTerm,
    filter: debouncedTerm
  });

  
  const columns = [
    {
      title: "SL.",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Branch Name",
      dataIndex: "branchName",
      align: "center",
    },
    {
      title: "VAT Month",
      dataIndex: "vatMonth",
      align: "center",
    },
    {
      title: "VAT Amount",
      dataIndex: "vatAmount",
      align: "center",
    },
    {
      title: "SD Amount",
      dataIndex: "sdAmount",
      align: "center",
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
            href={`/super_admin/commercial/last-month-closing-balance/view/${record}`}
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
        <UMBreadCrumb pageName="Last Month Closing Balance" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
            <DarazCommonAddButton
              to={`/super_admin/commercial/last-month-closing-balance/create`}
            >
              + Add New
            </DarazCommonAddButton>

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
            dataSource={lastMonthData?.result?.content}
            totalPages={lastMonthData?.result?.totalElements}
            onTableChange={onTableChange}
            pageSize={lastMonthData?.result?.size}
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
