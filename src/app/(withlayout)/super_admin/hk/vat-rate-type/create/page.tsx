"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import {useAddVatRateTypeMutation} from "@/redux/api/housekeepingApi/vatRateTypeApi";
import { vatRateTypeSchema } from "@/schemas/vatRateTypeSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



const CreateVatRateTypePage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addTransaction, { data: createData }] = useAddVatRateTypeMutation();
  console.log(createData, "createTransaction");

  const router = useRouter();

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
      const errorMessage= res?.data?.message;
      if (res) {
        if(res?.data?.code===400){
          message.error(errorMessage)
          console.log(errorMessage, "error message")
        }
        else if('data' in res && res.data && res.data.result){
          message.success("Vat rate type created successfully!");
          router.push(
            `/super_admin/hk/vat-rate-type/view/${res.data.result.id}`
          );
          setLoading(false);
        }else{
          message.error("Error! Insert Failed")
        }
       
      }
    } catch (err: any) {
      console.error("Error! Insert Failed");
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
         
        <UMBreadCrumb pageName="Vat Rate Type" lastName="Create" link={"/super_admin/hk/vat-rate-type"} />
       
   
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
        <Form submitHandler={onSubmit} resolver={yupResolver(vatRateTypeSchema)}>
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
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="vatRateTypeName"
                  label="Vat Rate Type Name:"
                  placeholder="Enter Vat Rate Type Name"
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
                  name="vatRateTypeNameBn"
                  label="Vat Rate TypeName BN: "
                  placeholder="Enter Vat Rate Type Name BN"
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
                  name="seqNo"
                  label="Seq No: "
                  placeholder="Seqence No"
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
                  label="Status: "
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
              <Link href={`/super_admin/hk/vat-rate-type`}>
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

export default CreateVatRateTypePage;
