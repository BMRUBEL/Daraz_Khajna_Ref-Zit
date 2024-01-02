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
  useItemgroupdropdownQuery,
  useGetSingleItemGroupQuery,
  useUpdateItemGroupMutation
} from "@/redux/api/housekeepingApi/itemGroupApi";
import { itemGroupSchema } from "@/schemas/itemGroupSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";



const CreateItemGroup = ({ params }: any) => {

  const [loading, setLoading] = useState(false);
  const [defaultValue, setDefaultValue] = useState({});
  const [updateItem, { data: createData }] = useUpdateItemGroupMutation();
  console.log(createData, "createTransaction");

  const router = useRouter();
  const { data: datasource } = useItemgroupdropdownQuery({
    ...{},
  });

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleItemGroupQuery(id, {});


  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      itmMstrGrpId: parseInt(data.result?.itmMstrGrpId),
      itmMstrGrpName: data.result?.itmMstrGrpName,
      itmGrpPrefix: data.result?.itmGrpPrefix,
      uomSetName: data.result?.uomSetName,
      itmGrpName: data.result?.itmGrpName,
      itmGrpNameBn: data.result?.itmGrpNameBn,
      itemGrpDes: data.result?.itemGrpDes,
      itemGrpDesBn: data.result?.itemGrpDesBn,
      //uomSetId
      uomSetId: data.result?.uomSetId,
      active: data.result?.active,
    });
  }, [data]);

  const masterGroupOptions =
    datasource &&
    datasource?.result?.itemMasterGroup?.map((mastergroup: any) => {
      return {
        label: mastergroup?.name,
        value: parseInt(mastergroup?.id),
      };
    });
  const uomSetOptions =
    datasource &&
    datasource?.result?.uomSet?.map((uomset: any) => {
      return {
        label: uomset?.name,
        value: parseInt(uomset?.id),
      };
    });

  console.log(masterGroupOptions, 'options');
  if (isLoading || loading) {
    return <Loading />;
  }

  const onChange = (value: string) => { };

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
    console.log(values, "values");
    try {
      setLoading(true);
      const res = await updateItem({
        id,
        body: values,
      }).unwrap();
      const errorMessage = res?.message;
      console.log(errorMessage, "After getting res")
      console.log(res?.code, res?.message, "updated failed")
      if (res) {
        if (res?.code === 400) {
          message.error(errorMessage)
        } else if (res?.code === 200) {
          message.success("Item Group updated successfully!");
          router.push(`/super_admin/company-setting/items/item-group/view/${id}`);
        }

      } else {
        message.error("Error!! Invalid Input");
      }

      console.log(res);
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
      <UMBreadCrumb pageName="item-group" lastName="Create" />
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
        <Form submitHandler={onSubmit} defaultValues={defaultValue} resolver={yupResolver(itemGroupSchema)}>
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
                  name="itmMstrGrpId"
                  options={masterGroupOptions}
                  label="Master Group:  "
                  placeholder="Select Master group..."
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
                  name="itmGrpPrefix"
                  label="Item Group Prefix:"
                  placeholder="Item Group Prefix..."
                  required
                />
              </Col>
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
                  name="uomSetId"
                  options={uomSetOptions}
                  label="UOM Set:  "
                  placeholder="--Select UOM Set--"
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
                  name="itmGrpName"
                  label="Item Group Name:"
                  placeholder="Enter Item Group Name..."
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
                  name="itmGrpNameBn"
                  label="Item Group Name Bn:"
                  placeholder="Enter Item Group Name Bn..."
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
                  name="itemGrpDes"
                  label="Item Group Description:"
                  placeholder="Enter Item Group Description..."

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
                  name="itemGrpDesBn"
                  label="Item Group Description BN: "
                  placeholder="Enter Item Group Description Bn..."

                />
              </Col>
              {/* <Col
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
                  name="seqNo"
                  label="Sequence Number: "
                  placeholder="Seq No"
                  required
                />
              </Col> */}
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormRadioSelect
                  label="Active Status "
                  name="active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "InActive" },

                  ]}
                  defaultValue={true}
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
              <Link href={`/super_admin/company-setting/items/item-group`}>
                {" "}
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </Link>
              <DarazCommonButton>Update</DarazCommonButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateItemGroup;
