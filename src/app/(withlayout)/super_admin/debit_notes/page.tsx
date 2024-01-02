"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useAdminsQuery } from "@/redux/api/adminApi";
import { useDebounced } from "@/redux/hook";
import { getUserInfo } from "@/services/auth.service";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageAdmin = () => {
  const { role } = getUserInfo() as any;

  // query
  const query: Record<string, any> = {};

  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // assign to query
  query["qty"] = size;
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


  const departments = data?.admins;
  const meta = data?.meta;

  // define columns of table
  const columns = [
    {
      title: "SL. No",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "Debit Node No",
      dataIndex: "name",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
        return <>{fullName}</>;
      },
    },

    {
      title: "Debit Note Date",
      dataIndex: "designation",
    },
    {
      title: "Debit Note For",
      dataIndex: "designation",
    },

    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/admin/receive/view/${data.id}`}>
              <Button onClick={() => console.log(data)} type="primary">
                <EyeOutlined />
              </Button>
            </Link>
            <Link href={`/super_admin/admin/edit/${data.id}`}>
              <Button
                style={{
                  margin: "0px 5px",
                }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
            <Button onClick={() => console.log(data)} type="primary" danger>
              <DeleteOutlined />
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
        <UMBreadCrumb pageName="Debit Notes" lastName="Home" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
            <Link href="/super_admin/debit_notes/create">
              <button className="text-white shadow-xl bg-primary hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border-none">
                Add New
              </button>
            </Link>

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

export default ManageAdmin;
