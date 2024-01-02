"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleMasterGroupQuery,
  useMasterGroupDropDownQuery,
  useUpdateMasterGroupMutation,
} from "@/redux/api/companyApi/masterGroupApi";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { masterGroupSchema } from "@/schemas/company/companySchema";
import { yupResolver } from "@hookform/resolvers/yup";

const EditMasterGroup = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleMasterGroupQuery(id, {});
  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(sourceId);

  // console.log(sourceId);
  const [updateItemMaster] = useUpdateMasterGroupMutation();

  // const { data: datasource } = useGetSingleTransactionSourceQuery(sourceId);
  const { data: datasource } = useMasterGroupDropDownQuery({
    ...{},
  });
  const productCatOptions =
    datasource &&
    datasource?.result?.productType?.map((productcat: any) => {
      return {
        label: productcat?.name,
        value: parseInt(productcat?.id),
      };
    });


  // console.log(transactionOptions,'options');

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      prodTypeId: parseInt(data.result?.prodTypeId),
      prodTypeName: data.result?.prodTypeName,
      itmMstrGrpName: data.result?.itmMstrGrpName,
      itmMstrGrpNameBn: data.result?.itmMstrGrpNameBn,
      itmMstrGrpPrefix: data.result?.itmMstrGrpPrefix,
      itemMstrGrpDes: data.result?.itemMstrGrpDes,
      itemMstrGrpDesBn: data.result?.itemMstrGrpDesBn,
      active: data.result?.active,
    });
  }, [data]);

  // console.log(defaultValue, "Default value");

  if (isLoading || loading) {
    return <Loading />;
  }

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
      const res = await updateItemMaster({
        id,
        body: values,
      }).unwrap();
      const errorMessage= res?.message;
      console.log(errorMessage, "After getting res")
      console.log(res?.code, res?.message,"updated failed")
      if (res) {
        if(res?.code===400){
          message.error(errorMessage)
        }else if(res?.code===200){
          message.success("Master group updated successfully!");
          router.push(`/super_admin/company-setting/items/master-group/view/${id}`);
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





  return (
    <div
      style={{
        padding: "10px",
      }}
    >

      <UMBreadCrumb pageName="Master Ggroup" lastName="Edit" link={`/super_admin/company-setting/items/master-group`} />
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
        <Form submitHandler={onSubmit} defaultValues={defaultValue} resolver={yupResolver(masterGroupSchema)}>
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
                // justifyContent: "space-evenly",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="prodTypeId"
                  options={productCatOptions}
                  label="Product Type:  "
                  placeholder="Select Product Type..."
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
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="itmMstrGrpPrefix"
                  label="Master Group Prefix:"
                  placeholder="Enter Master Group Prefix"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="itmMstrGrpName"
                  label="Master Group Name:"
                  placeholder="Enter Master Group Name"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="itmMstrGrpNameBn"
                  label="Master Group Name Bn:"
                  placeholder="Enter Master Group Name Bn"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="itemMstrGrpDes"
                  label="Master Group Description:"
                  placeholder="Enter Master Group Description"

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
                  name="itemMstrGrpDesBn"
                  label="Master Group Description BN: "
                  placeholder="Enter Mastrer Group Description BN"

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
                  name="seqNo"
                  label="Sequence Number: "
                  placeholder="Seq No"
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
              alignItems: "center",
            }}
          >
            <Link href={`/super_admin/company-setting/items/master-group`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/company-setting/items/master-group`}>
                  {" "}
                  <DarazCommonCloseButton>Close</DarazCommonCloseButton>
                </Link>
              </div>
            </Link>
            <DarazCommonButton className="ml-3">Update</DarazCommonButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditMasterGroup;
