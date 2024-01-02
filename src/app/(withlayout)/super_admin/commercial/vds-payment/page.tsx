"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useDebounced } from "@/redux/hook";
import { EyeOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useVdsPaymentQuery } from "@/redux/api/commercialApi/vdsPaymentApi";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import dayjs from "dayjs";

const VdsForPayment = () => {
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

  // create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // set debounce on searchTerm if debounce exists
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  // get department data
  const { data: vdsPaymentData, isLoading } = useVdsPaymentQuery({
     ...query,
     sortField: sortBy,
     sortDirection: sortOrder,
     filter: debouncedTerm,
     page: page,
     size: size
    });
  // console.log(vdsPurchaseData);

 
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
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "VAT Month",
      dataIndex: "vatMonth",
      align: "center",
    },
    {
      title: "TC No",
      dataIndex: "treasuryChallanNo",
      align: "center",
    },
    {
      title: "TC Date",
      dataIndex: "treasuryChallanDate",
      align: "center",
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Total Payable TC Amount",
      dataIndex: "totalPayableAmt",
      align: "center",
     
    },
    {
      title: "Action",
      dataIndex: "id",
      align: "center",
      render: (record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={`/super_admin/commercial/vds-payment/view/${record}`}>
            <Button
              style={{
                fontSize: "13px",
                padding: "0px 7px 5px 7px",
                borderRadius: "2px",
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
        <UMBreadCrumb pageName="VDS Payment" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
          <DarazCommonAddButton
              to={`/super_admin/commercial/vds-payment/create`}
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

          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={vdsPaymentData?.result?.content}
            totalPages={vdsPaymentData?.result?.totalElements}
            onTableChange={onTableChange}
            pageSize={size}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
          />
        </div>
      </div>
    </>
  );
};

export default VdsForPayment;
