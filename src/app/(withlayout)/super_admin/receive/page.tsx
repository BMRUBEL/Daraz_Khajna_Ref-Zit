"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import { useGetAllReceiveQuery } from "@/redux/api/receive/receiveApi";
import { useDebounced } from "@/redux/hook";
import { getUserInfo } from "@/services/auth.service";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, message } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useState } from "react";

const ManageAdmin = () => {
  const { role } = getUserInfo() as any;



  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // assign to query
  // query["qty"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

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
  const { data, isLoading } = useGetAllReceiveQuery({
    ...query, sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });
  console.log(data);
  // department delete hook
  // const [deleteDepartment] = useDeleteDepartmentMutation();

  const receiveData = data?.result?.content;
  // const meta = data?.meta;

  // define columns of table
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Product Type",
      dataIndex: "prodTypeName",
      align: "center",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      align: "center",
    },
    {
      title: "Recv. No",
      dataIndex: "receiveNo",
      align: "center",
    },
    {
      title: "Recv. Date",
      dataIndex: "receiveDate",
      align: "center",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
    },
    {
      title: "Challan No",
      dataIndex: "challanNumber",
      sorter: true,
      align: "center",
    },
    {
      title: "Challan Date",
      dataIndex: "challanDate",
      align: "center",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
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
            <Link href={`/super_admin/receive/view/${record}`}>
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

            {/* <Link href={`/super_admin/admin/edit/${data.id}`}>
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
            </Link> */}
            {/* <Button
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
              danger
            >
              <DeleteOutlined />
            </Button> */}
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
        <UMBreadCrumb pageName="Receive" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
          <DarazCommonAddButton
              to={`/super_admin/receive/create`}
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
              {/* {(!!sortBy || !!sortOrder || !!searchTerm) && (
                <Button
                  style={{ margin: "0px 5px" }}
                  type="primary"
                  onClick={resetFilters}
                >
                  <ReloadOutlined />
                </Button>
              )} */}
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

export default ManageAdmin;
