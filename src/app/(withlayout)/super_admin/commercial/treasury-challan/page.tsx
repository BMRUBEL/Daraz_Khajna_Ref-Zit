"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import { useTreasuryChallanQuery } from "@/redux/api/commercialApi/treasuryChallanApi";

import { useDebounced } from "@/redux/hook";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import Link from "next/link";
import { useState } from "react";

const TreasuryChallan = () => {


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

  // get department data
  const { data: treasuryChallanData, isLoading } = useTreasuryChallanQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });

  if (!isLoading) {
  }

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      align: "center",
    },
    {
      title: "Challan No",
      dataIndex: "treasuryChallanNo",
      align: "center",
    },
    {
      title: "Challan Date",
      dataIndex: "treasuryChallanDate",
      align: "center",
    },
    {
      title: "Bank",
      dataIndex: "bankName",
      align: "center",
    },
    {
      title: "Name Of Commissionrate",
      dataIndex: "nameOfCommissionerate",
      align: "center",
    },
    {
      title: "Account Details",
      dataIndex: "vatCodeDetails",
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "treasuryAmount",
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
            href={`/super_admin/commercial/treasury-challan/view/${record}`}
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
        <UMBreadCrumb pageName="Treasury Challan" />

        <div>
          <ActionBar>
          <DarazCommonAddButton
              to={`/super_admin/commercial/treasury-challan/create`}
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
            </div>
          </ActionBar>

          {isLoading ? (
            <Loading />
          ) : (
            <UMTable
              loading={isLoading}
              columns={columns}
              dataSource={treasuryChallanData?.result?.content}
              onTableChange={onTableChange}
              pageSize={size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
              totalPages={treasuryChallanData?.result?.totalElements}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TreasuryChallan;
