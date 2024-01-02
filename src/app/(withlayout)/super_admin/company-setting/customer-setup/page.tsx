"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useCustomerSetupQuery } from "@/redux/api/companyApi/customerInfoApi";

import { useDebounced } from "@/redux/hook";

import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Switch, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const CustomerSetup = () => {


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
  const { data: customerData, isLoading } = useCustomerSetupQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });

  if (!isLoading) {
    // console.log("sdfj");
    // console.log(transactionData.result.data);
  }

  const onChange = (record: any) => {
    alert("status changable");
  };

  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Customer ID",
      dataIndex: "customerTypeId",
      sorter: true,
      align: "center",
    },

    {
      title: "Vat Regi type",
      dataIndex: "vatRegTypeName",
      align: "center",
    },

    {
      title: "Customer Name",
      dataIndex: "customerName",
      align: "center",
    },
    {
      title: "Customer Name BN",
      dataIndex: "customerNameBn",
      align: "center",
    },
    {
      title: "Bin Number",
      dataIndex: "customerBinNumber",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "customerPhoneNumber",
      align: "center",
    },
    {
      title: "Registration Status",
      dataIndex: "registrationStatus",
      sorter: true,
      align: "center",
      render: (registrationStatus: any) => {
        return registrationStatus ? "Registered" : "Not Registered";
      },
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
          <Link
            href={`/super_admin/company-setting/customer-setup/view/${record}`}
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
          <Link
            href={`/super_admin/company-setting/customer-setup/edit/${record}`}
          >
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
        <UMBreadCrumb pageName="Customer Setup" />

        <div>
          <ActionBar>
            <Link
              href="/super_admin/company-setting/customer-setup/create"
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

          {isLoading ? (
            <Loading />
          ) : (
            <UMTable
              loading={isLoading}
              columns={columns}
              dataSource={customerData?.result?.content}
              onTableChange={onTableChange}
              pageSize={size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
              totalPages={customerData?.result?.totalElements}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerSetup;
