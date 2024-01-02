"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import { useTransactionsQuery } from "@/redux/api/housekeepingApi/transTypeApi";

import { useDebounced } from "@/redux/hook";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Switch, message } from "antd";
import Link from "next/link";
import { useState, useEffect } from "react";

const TransactionType = () => {
  // const { role } = getUserInfo() as any;

  // query
  // const query: Record<string, any> = {};

  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('');


  // assign to query
  // query["limit"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

  // Create debounce hook
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Use debounced term in your query
  const query = {
    searchTerm: debouncedTerm,
    sortBy,
    sortOrder,
  };

  // set debounce on searchTem if debounce exist
  // if (!!debouncedTerm) {
  //   query["searchTerm"] = debouncedTerm;
  // }

  // get department data
  const { data: transactionData, isLoading } = useTransactionsQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });

  if (!isLoading) {
    // console.log("sdfj");
    console.log('Transaction Data:', transactionData);
  }

  const onChange = (record: any) => {
    alert("status changable");
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      width: 250,
      align: "center",
    },
    {
      title: "Source Type Name",
      dataIndex: "tranSourceTypeNameBN",
      width: 250,
      align: "center",
    },
    {
      title: "Type Name",
      dataIndex: "trnsTypeName",
      width: 300,
      align: "center",
    },
    {
      title: "Type Name BN",
      dataIndex: "trnsTypeNameBn",
      width: 300,
      align: "center",
    },
    {
      title: "Seq No",
      dataIndex: "seqNo",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "active",
      align: "center",
      render: (record: any) => (
        <Switch
          checked={record}
          // onChange={() => onChange(record)}
          disabled
        />
      ),
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
          <Link href={`/super_admin/hk/trans-type/view/${record}`}>
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
          <Link href={`/super_admin/hk/trans-type/edit/${record}`}>
            <Button
              className="bg-[#FF5100]"
              style={{
                fontSize: "13px",
                padding: "0px 7px 5px 7px",
                borderRadius: "0px",
                height: "28px",
                margin: "0px 5px",
              }}
              onClick={() => console.log(record)}
              type="primary"
            >
              <EditOutlined />
            </Button>
          </Link>
        </div>
      ),
    },
  ];


  // pagination
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log(page, pageSize);
    setPage(page - 1); // Adjust for Ant Design's one-based indexing
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


  // Log values for debugging
  console.log('searchTerm:', searchTerm);
  console.log('debouncedTerm:', debouncedTerm);
  console.log('query:', query);


  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb pageName="Transaction Type" />

        <div>
          <ActionBar>
           
            <DarazCommonAddButton
              to={"/super_admin/hk/trans-type/create"}
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
              dataSource={transactionData?.result.content}
              onTableChange={onTableChange}
              pageSize={size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
              totalPages={transactionData?.result.totalElements}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionType;
