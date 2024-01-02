"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import {
  useAddItemSubgroupMutation,
  useItemSubgroupDropdownQuery,
} from "@/redux/api/housekeepingApi/itemSubGroupApi";
import { itemSubgroupSchema } from "@/schemas/itemSubgroupSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



const CreateTransactionPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addTransaction, { data: createData }] = useAddItemSubgroupMutation();
  console.log(createData, "createTransaction");

  const router = useRouter();
  const { data: datasource } = useItemSubgroupDropdownQuery({
    ...{},
  });
  console.log(datasource,'source');
  const itemGroupOptions =
    datasource &&
    datasource?.result.map((itemgroup: any) => {
      return {
        label: itemgroup?.tranSourceTypeNameBN,
        value: parseInt(itemgroup?.tranSourceTypeId),
      };
    });
  const inventoryMethodOptions =
    datasource &&
    datasource?.result.map((inventorymethod: any) => {
      return {
        label: inventorymethod?.tranSourceTypeNameBN,
        value: parseInt(inventorymethod?.tranSourceTypeId),
      };
    });

  console.log(itemGroupOptions ,'options');
  if (isLoading || loading) {
    return <Loading />;
  }

  const onChange = (value: string) => {};

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  // filter on select
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // submit handler
  const onSubmit = async (values: any) => {
    try {
      console.log('on submit');
      setLoading(true);
      const res = await addTransaction(values);
      if (res) {
        message.success("Transaction created successfully!");
        router.push(
          `/super_admin/company-setting/items/item-sub-group/view/${res.data.result.id}`
        );
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // setSelectedRowKeys(newSelectedRowKeys);
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="item-sub-group" lastName="Create" />
      <div
        style={{
          padding: "20px",
          marginTop: "11px",
          backgroundColor: "#fff6f6e6",
          borderRadius: "10px",
          border: "1px solid #e9e8e8",
          boxSizing: "border-box",
        }}
      >
        <Form submitHandler={onSubmit} resolver={yupResolver(itemSubgroupSchema)}>
          <div
            style={{
              padding: "0px",
              marginTop: "12px",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={itemGroupOptions}
                  label="Item Group Name:  "
                  placeholder="--Select Name--"
                  required
                  onSearch={onSearch}
                  filterOption={filterOption}
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeName"
                  label="Item Sub Group Name:"
                  placeholder="Item Sub Group Name"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeNameBn"
                  label="Item Sub Group BN: "
                  placeholder="Item Sub Group BN"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="number"
                  name="subgroupPrefix"
                  label="Item Sub Group Prefix: "
                  placeholder="Enter sub group prefix"
                  required
                />
              </Col>
              
            </Row>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >

            <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="inventoryMethod"
                  options={inventoryMethodOptions}
                  label="Inventory Method Name:  "
                  placeholder="--Select Name--"
                  required
                  onSearch={onSearch}
                  filterOption={filterOption}
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
               <FormRadioSelect
               
                 label="Status "
                  name="status"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "InActive" },
                    
                  ]}
                  defaultValue="active"
                />
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                gap: "10px",
              }}
            >
              <Link href={`/super_admin/company-setting/items/item-sub-group`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
              <DarazCommonButton>Save</DarazCommonButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateTransactionPage;
