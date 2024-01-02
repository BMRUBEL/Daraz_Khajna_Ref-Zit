"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useStoredetailsQuery } from "@/redux/api/companyApi/storeDetailsApi";
import { useDebounced } from "@/redux/hook";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Switch, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageAdmin = () => {
  const { role } = getUserInfo() as any;

  // query
  const query: Record<string, any> = {};
  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // assign to query
  // query["limit"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;
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
  const { data: storeLocationData, isLoading } = useStoredetailsQuery({
    ...query,
    page: page,
    size: size,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm
  });

  console.log("index Data", storeLocationData)
  if (!isLoading) {
    // console.log("sdfj");
    // console.log(transactionData.result.data);
  }

  const onChange = (record: any) => {
    alert("status changable");
  };

  // department delete hook
  // const [deleteDepartment] = useDeleteDepartmentMutation();

  // const departments = data?.admins;
  // const meta = data?.meta;

  // define columns of table
  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      width: 250,
      align: "center",
    },
    {
      title: "Store ID",
      dataIndex: "branchId",
      sorter: true,
      width: 250,
      align: "center",
    },
    {
      title: "Branch",
      dataIndex: "companyBranchName",
      width: 300,
      align: "center",
    },
    {
      title: "Store Location Name",
      dataIndex: "slName",
      width: 300,
      align: "center",
    },
    {
      title: "Officer",
      dataIndex: "slOfficerId",
      width: 300,
      align: "center",
    },
    {
      title: "Store type",
      dataIndex: "slType",
      width: 300,
      align: "center",
    },
    {
      title: "Is Default Location",
      dataIndex: "isDefaultLocation",
      align: "center",
      render: (isDefaultLocation: any) => {
        return isDefaultLocation ? "Yes" : "No";
      },
    },
    {
      title: "Virtual Location",
      dataIndex: "isVirtualLocation",
      align: "center",
      render:(isVirtualLocation:any) =>{
        return isVirtualLocation ? "Yes" : "No"
      }
    },
    {
      title: "Sales Point",
      dataIndex:"isSalesPoint",
      asign: "center",
      render: (isSalesPoint:any)=>{
        return isSalesPoint? "Yes" : "No"
      }
    },
    {
      title: "Status",
      dataIndex: "seqNo",
      width: 220,
      align: "center",
      render: (record: any) => (
        <Switch defaultChecked onChange={() => onChange(record)} />
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
            href={`/super_admin/company-setting/company-store/store-location/view/${record}`}
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
            href={`/super_admin/company-setting/company-store/store-location/edit/${record}`}
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

  // // pagination
  // const onPaginationChange = (page: number, pageSize: number) => {
  //   // console.log(page, pageSize);
  //   setPage(page-1);
  //   setSize(pageSize);
  // };

  // // sortBy and sortOrder
  // const onTableChange = (pagination: any, filter: any, sorter: any) => {
  //   const { order, field } = sorter;
  //   console.log(order, field);
  //   setSortBy(field as string);
  //   setSortOrder(order === "ascend" ? "ASC" : "DESC");
  // };
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
        <UMBreadCrumb pageName="Store Location" />

        <div>
          <ActionBar>
            <Link
              href="/super_admin/company-setting/company-store/store-location/create"
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
              dataSource={storeLocationData?.result?.content}
              totalPages={storeLocationData?.result?.totalElements}
              onTableChange={onTableChange}
              pageSize={storeLocationData?.result?.size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageAdmin;
