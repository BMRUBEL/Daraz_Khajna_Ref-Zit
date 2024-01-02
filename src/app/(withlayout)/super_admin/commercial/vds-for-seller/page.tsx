"use client";

import ActionBar from "@/components/ui/ActionBar";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import UMTable from "@/components/ui/DRZTable";
import { useDebounced } from "@/redux/hook";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useVdsSellerQuery,
  useVdsSellerDropDownQuery,
} from "@/redux/api/commercialApi/vdsSellerApi";
import dayjs from "dayjs";
import DarazCommonAddButton from "@/components/ui/DarazCommonAddButton";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
// import DRZSelectField from "@/components/Forms/DRZSelectField";

const VdsForSeller = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );
  const [customerId, setCustomerId] = useState("");
  // states
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // assign to query
  // query["limit"] = size;
  // query["page"] = page;
  // query["sortBy"] = sortBy;
  // query["sortOrder"] = sortOrder;

  const { data } = useVdsSellerDropDownQuery({});
  // console.log(datasource, "Seller Drop Down");

  const customers: any = data?.result?.customers;

  //Customer Name Drop down
  const customerNameOptions =
    customers &&
    customers.map((vdsseller: any) => {
      return {
        label: vdsseller?.name,
        value: parseInt(vdsseller?.id),
      };
    });

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
  // set debounce on searchTerm if debounce exists
  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  //Get All Data
  // const { data: vdsSellerData, isLoading } = useVdsSellerQuery({
  //   sortField: sortBy,
  //   sortDirection: sortOrder,
  //   filter: debouncedTerm,
  //   page: page,
  //   size: size,
  //   customerId: selectedCustomerId,
  // });

  const {
    data: vdsSellerData,
    isLoading,
    error,
  } = useVdsSellerQuery({
    sortField: sortBy,
    sortDirection: sortOrder,
    filter: debouncedTerm,
    page: page,
    size: size,
    customerId: selectedCustomerId,
  });

  useEffect(() => {
    // Log the selectedCustomerId whenever it changes
    console.log("Selected Customer ID:", selectedCustomerId);

    // Handle the result or perform further actions...
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("vdsSellerData:", vdsSellerData);
    }
  }, [selectedCustomerId, vdsSellerData, error]);

  // console.log(vdsSellerData);

  // define columns of table
  const columns = [
    {
      title: "SL.",
      dataIndex: "id",
      sorter: true,
      align: "center",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      align: "center",
    },
    {
      title: "Total Issue Amount",
      dataIndex: "totalIssueAmount",
      align: "center",
    },
    {
      title: "Total VAT",
      dataIndex: "totalVat",
      align: "center",
    },
    {
      title: "Deducted VAT",
      dataIndex: "totalDeductedVat",
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
      render: function (record: any) {
        return record && dayjs(record).format("DD-MM-YYYY");
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (record: any) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link href={`/super_admin/commercial/vds-for-seller/view/${record}`}>
            <Button
              style={{
                fontSize: "13px",
                padding: "0px 7px 5px 7px",
                borderRadius: "2px",
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
    setPage(page);
    setSize(pageSize);
  };

  // sortBy and sortOrder
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "ASC" : "DESC");
  };

  // reset filters
  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };
  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const customerIdFromIndex = vdsSellerData?.result?.content;

  const handleSelectChange = (value: any, index: any) => {
    // Assuming your content items have an 'id' field
    const selectedCustomerId = customerIdFromIndex?.[index]?.id;
    setCustomerId(selectedCustomerId || ""); // Set the customer ID or an empty string if not found
  };

  console.log(customerId, "Selected Customer");

  const onSubmit = async () => {};

  return (
    <>
      <div
        style={{
          padding: "10px",
        }}
      >
        <UMBreadCrumb pageName="VDS For Seller" />

        <div
          style={{
            padding: "10px",
          }}
        >
          <ActionBar>
            <DarazCommonAddButton
              to={`/super_admin/commercial/vds-for-seller/create`}
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
                    options={customerNameOptions}
                    // label="Customer Name"
                    placeholder="Select Customer..."
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

          <UMTable
            loading={isLoading}
            columns={columns}
            dataSource={vdsSellerData?.result?.content}
            onTableChange={onTableChange}
            pageSize={size}
            showSizeChanger={true}
            onPaginationChange={onPaginationChange}
            showPagination={true}
            totalPages={vdsSellerData?.result?.totalElements}
          />
        </div>
      </div>
    </>
  );
};

export default VdsForSeller;
