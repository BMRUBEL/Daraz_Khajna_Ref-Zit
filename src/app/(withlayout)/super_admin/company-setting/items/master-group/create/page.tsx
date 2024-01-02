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
  useAddMasterGroupMutation,
  useMasterGroupDropDownQuery,
} from "@/redux/api/companyApi/masterGroupApi";
import { masterGroupSchema } from "@/schemas/company/companySchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const CreateMasterGroupPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addItemMaster, { data: createData }] = useAddMasterGroupMutation();
  console.log(createData, "createTransaction");
  const router = useRouter();

  const { data: datasource } = useMasterGroupDropDownQuery({
    ...{},
  });
  console.log(datasource, 'source');

  const productCatOptions =
    datasource &&
    datasource?.result?.productType?.map((productcat: any) => {
      return {
        label: productcat?.name,
        value: parseInt(productcat?.id),
      };
    });
  // const uomSetOptions =
  //   datasource &&
  //   datasource?.result.map((uomset: any) => {
  //     return {
  //       label: uomset?.tranSourceTypeNameBN,
  //       value: parseInt(uomset?.tranSourceTypeId),
  //     };
  //   });

  console.log(productCatOptions, 'options');
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
  // const onSubmit = async (values: any) => {
  //   try {
  //     console.log('on submit');
  //     setLoading(true);
  //     const res = await addItemMaster(values);
  //     if ('data' in res && res.data && res.data.result) {
  //       message.success("Master Group created successfully!");
  //       router.push(
  //         `/super_admin/company-setting/items/master-group/view/${res?.data?.result?.id}`
  //       );
  //       setLoading(false);
  //     }
  //   } catch (err: any) {
  //     console.error(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

   // submit handler
   const onSubmit = async (values: any) => {
    try {
      console.log("on submit");
      setLoading(true);
      const res = await addItemMaster(values);
      const errorMessage = res?.data?.message;
      if (res) {
        if (res?.data?.code === 400) {
          message.error(errorMessage)
          console.log(errorMessage, "error message")
        }
        else if ('data' in res && res.data && res.data.result) {
          message.success("Master Group created successfully!");
          router.push(`/super_admin/company-setting/items/master-group/view/${res?.data?.result?.id}`);
          setLoading(false);
        } else {
          message.error("Error!! Insert Failed")
        }
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
      <UMBreadCrumb pageName="Master Ggroup" lastName="Create" link={`/super_admin/company-setting/items/master-group`} />
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
        <Form submitHandler={onSubmit} resolver={yupResolver(masterGroupSchema)}>
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
              <Link href={`/super_admin/company-setting/items/master-group`}>
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

export default CreateMasterGroupPage;
