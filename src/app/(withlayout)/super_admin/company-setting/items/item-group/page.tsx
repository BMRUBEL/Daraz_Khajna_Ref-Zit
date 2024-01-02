"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import { useItemGroupQuery } from "@/redux/api/housekeepingApi/itemGroupApi";

import { useDebounced } from "@/redux/hook";
import { getUserInfo } from "@/services/auth.service";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Switch, message } from "antd";
import Link from "next/link";
import { useState } from "react";

const ManageAdmin = () => {


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
  const { data: itemGroupData, isLoading } = useItemGroupQuery({
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
      title: "Product Type",
      dataIndex: "prodTypeName",
      width: 250,
      align: "center",
    },
    {
      title: "Master Group",
      dataIndex: "itmMstrGrpName",
      width: 300,
      align: "center",
    },
    {
      title: "UOM Set",
      dataIndex: "uomSetName",
      width: 300,
      align: "center",
    },
    {
      title: "Item Group Prefix",
      dataIndex: "itmGrpPrefix",
      width: 250,
      align: "center",
    },
   
    {
      title: "Item Group Name",
      dataIndex: "itmGrpName",
      width: 300,
      align: "center",
    },

    {
      title: "Status",
      dataIndex: "active",
      width: 220,
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
          <Link href={`/super_admin/company-setting/items/item-group/view/${record}`}>
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
          <Link href={`/super_admin/company-setting/items/item-group/edit/${record}`}>
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
        <UMBreadCrumb pageName="Item Group" />

        <div>
          <ActionBar>
        
            <DarazCommonAddButton
              to={"/super_admin/company-setting/items/item-group/create"}
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
              dataSource={itemGroupData?.result?.content}
              totalPages={itemGroupData?.result?.totalElements}
              onTableChange={onTableChange}
              pageSize={size}
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
