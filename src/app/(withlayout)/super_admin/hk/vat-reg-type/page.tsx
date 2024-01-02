"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import { useVatRegTypeQuery } from "@/redux/api/housekeepingApi/vatRegTypeApi";

import { useDebounced } from "@/redux/hook";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Switch, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageAdmin = () => {
  const { role } = getUserInfo() as any;


  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [currentPage, setCurrentPage] = useState<number>(0);




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
  const { data: vatRegData, isLoading } = useVatRegTypeQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });

  // pagination
  const onPaginationChange = (page: number, pageSize: number) => {
    // console.log("Pages", page, pageSize);
    setPage(page - 1);
    setSize(pageSize);
  };


  if (!isLoading) {
    console.log('Data loaded - page:', page);
  }

  const onChange = (record: any) => {
    alert("status changable");
  };

  const columns = [
    {
      title: "VAT Reg. Type Id",
      dataIndex: "id",
      sorter: true,
      width: 250,
      align: "center",
    },
    {
      title: "Reg. Type Name",
      dataIndex: "vatRegistrationName",
      width: 300,
      align: "center",
    },
    {
      title: "Reg. Type Name BN",
      dataIndex: "vatRegistrationNameBn",
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
      width: 220,
      align: "center",
      render: (record: any) => (
        <Switch checked={record} disabled />
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
          <Link href={`/super_admin/hk/vat-reg-type/view/${record}`}>
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
          <Link href={`/super_admin/hk/vat-reg-type/edit/${record}`}>
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
        <UMBreadCrumb pageName="VAT Registration Type" />

        <div>
          <ActionBar>
          <DarazCommonAddButton
              to={`/super_admin/hk/vat-reg-type/create`}
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
              dataSource={vatRegData?.result.content}
              onTableChange={onTableChange}
              pageSize={vatRegData?.result.size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
              totalPages={vatRegData?.result.totalElements}

            />
          )}
        </div>
      </div>
    </>
  );
};

export default ManageAdmin;
