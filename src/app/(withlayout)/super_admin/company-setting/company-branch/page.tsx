"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useDebounced } from "@/redux/hook";
import { getUserInfo } from "@/services/auth.service";
import {
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Input, Switch, message } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useCompanyBranchInfoQuery } from "@/redux/api/companyApi/companyBranchInfoApi";
import Loading from "@/app/loading";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";





const CompanyBranchInfo = () => {


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
  const { data: companyBranchData, isLoading } = useCompanyBranchInfoQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size
  });

  const onChange = (record: any) => {
    alert("status changable");
  };

  // define columns of table
  const columns = [
    {
      title: "SL",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Branch ID",
      dataIndex: "companyId",
      sorter: true,
      align: "center",
    },
    {
      title: "Company",
      dataIndex: "companyName",
      align: "center",
    },
    {
      title: "Branch Name",
      dataIndex: "branchUnitName",
      align: "center",
    },

    {
      title: "Bin Number",
      dataIndex: "branchUnitBinNumber",
      align: "center",
    },
    {
      title: "Branch Short Name",
      dataIndex: "branchUnitShortName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "branchUnitEmailAddress",
      align: "center",
      sorter: true,
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
            href={`/super_admin/company-setting/company-branch/view/${record}`}
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
            href={`/super_admin/company-setting/company-branch/edit/${record}`}
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
        <UMBreadCrumb pageName="Company Branch Info" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
           
            <DarazCommonAddButton
              to={"/super_admin/company-setting/company-branch/create"}
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

          {isLoading ? (
            <Loading />
          ) : (
            <UMTable
              loading={isLoading}
              columns={columns}
              dataSource={companyBranchData?.result?.content}
              onTableChange={onTableChange}
              pageSize={size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
              totalPages={companyBranchData?.result.totalElements}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyBranchInfo;
