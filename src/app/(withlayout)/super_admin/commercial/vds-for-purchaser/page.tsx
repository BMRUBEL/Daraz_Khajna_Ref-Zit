"use client";

import Loading from "@/app/loading";
import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import {
  useVdsPurchaseQuery,
  useVdsPurchaserDropDownQuery,
} from "@/redux/api/commercialApi/vdsPurchaserApi";

import { useDebounced } from "@/redux/hook";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import Link from "next/link";
import { useState } from "react";
import dayjs from "dayjs";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";

const VdsPurchaser = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
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
  const { data: vdsPurchaseData, isLoading } = useVdsPurchaseQuery({
    ...query,
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
  });

  const customerIdFromIndex = vdsPurchaseData?.result?.content;

  const [customerId, setCustomerId] = useState("");
  const { data } = useVdsPurchaserDropDownQuery({});

  const supplierNames = data?.result?.supplierType;

  const supplierNameOptions =
    supplierNames &&
    supplierNames.map((vdssupplier: any) => {
      return {
        label: vdssupplier?.name,
        value: parseInt(vdssupplier?.id),
      };
    });

  const handleSelectChange = (value: any, index: any) => {
    // Assuming your content items have an 'id' field
    const selectedCustomerId = customerIdFromIndex?.[index]?.id;
    setCustomerId(selectedCustomerId || ""); // Set the customer ID or an empty string if not found
  };

  if (!isLoading) {
  }

  const columns = [
    {
      title: "SL.",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
      align: "center",
    },
    {
      title: "Treasury Challan No",
      dataIndex: "treasuryChallanNo",
      align: "center",
    },
    {
      title: "Certificate No",
      dataIndex: "certificateNo",
      align: "center",
    },
    {
      title: "Transaction Date",
      dataIndex: "transactionDate",
      align: "center",
      render: function (data: any) {
        return data && dayjs(data).format("DD-MM-YYYY");
      },
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
            href={`/super_admin/commercial/vds-for-purchaser/view/${record}`}
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
        </div>
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

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // reset filters
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const onSubmit = async () => {};

  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb pageName="VDS For Purchaser" />

        <div>
          <ActionBar>
            <DarazCommonAddButton
              to={`/super_admin/commercial/vds-for-purchaser/create`}
            >
              + Add New
            </DarazCommonAddButton>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                }}
              >
                <Form submitHandler={onSubmit}>
                  <DRZSelectField
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    name="customerId"
                    options={supplierNameOptions}
                    // label="Customer Name"
                    placeholder="Select Supplier..."
                    // required
                    onSearch={onSearch}
                    filterOption={filterOption}
                    size="large"
                    onChange={(value: any, index: any) =>
                      handleSelectChange(value, index)
                    }
                  />
                </Form>
              </div>

              <Input
                size="large"
                className="shadow-sm"
                placeholder="Search by Certificate No.."
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
              dataSource={vdsPurchaseData?.result?.content}
              onTableChange={onTableChange}
              pageSize={size}
              showSizeChanger={true}
              onPaginationChange={onPaginationChange}
              showPagination={true}
              totalPages={vdsPurchaseData?.result?.totalElements}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VdsPurchaser;
