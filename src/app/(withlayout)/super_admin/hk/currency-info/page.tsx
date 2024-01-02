"use client";

import Loading from "@/app/loading";

import ExchangeRateModal from "@/components/Modal/ExchangeRateModal";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import { useCurrencyinfoQuery } from "@/redux/api/housekeepingApi/currencyInfoApi";

import { useDebounced } from "@/redux/hook";

import { EditOutlined, EyeOutlined, WalletOutlined } from "@ant-design/icons";
import { Button, Input, Switch, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageAdmin = () => {
  const [open, setOpen] = useState(false);

  //Modal
  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    setOpen(false);
  };

  // query
  const query: Record<string, any> = {};

  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
  const { data: currencyInfoData, isLoading } = useCurrencyinfoQuery({
    ...query,
    page: page,
    size: size,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
  });

  if (!isLoading) {
    // console.log("sdfj");
    // console.log(currencyInfoData.result.data);
  }

  const onChange = (record: any) => {
    alert("status changable");
  };

  const columns = [
    {
      title: "Currency Short Code",
      dataIndex: "currencyShortCode",
      sorter: true,
      width: 300,
      align: "center",
    },
    {
      title: "Currency Desc",
      dataIndex: "currencyDesc",
      width: 300,
      align: "center",
    },
    {
      title: "Exchange Rate",
      dataIndex: "id",
      width: 220,
      align: "center",
      render: () => (
        <div
          style={{
            position: "relative",
          }}
        >
          <Button
            onClick={showModal}
            style={{
              fontSize: "14px",
              padding: "0px 7px 5px 7px",
              borderRadius: "0px",
              height: "28px",
            }}
            className="bg-[#FF5100]"
            type="primary"
          >
            <WalletOutlined />
          </Button>

        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "active",
      width: 220,
      align: "center",
      render: (record: any) => (
        <Switch checked={record} onChange={() => onChange(record)} />
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
          <Link href={`/super_admin/hk/currency-info/view/${record}`}>
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
          <Link href={`/super_admin/hk/currency-info/edit/${record}`}>
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
    setPage(page - 1);
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

  // delete a department
  const deleteHandler = async (id: string) => {
    message.loading("Deleting...");
    try {
      // console.log(data);
      // deleteDepartment(id);
      message.success("Department deleted successfully");
    } catch (err: any) {
      console.error(err.message);
      message.error(err.message);
    }
  };

  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb pageName="Currency Info" />

        <div>
          <ActionBar>
          <DarazCommonAddButton
              to={`/super_admin/hk/currency-info/create`}
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
              dataSource={currencyInfoData?.result.content}
              totalPages={currencyInfoData?.result?.totalElements}
              onTableChange={onTableChange}
              pageSize={currencyInfoData?.result?.size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
            />
          )}
          <ExchangeRateModal
            open={open}
            handleOk={handleOk}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
};

export default ManageAdmin;
