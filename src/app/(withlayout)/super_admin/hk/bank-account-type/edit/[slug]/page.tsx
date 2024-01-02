"use client";

import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";

import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSinglebankAccountQuery,
  useUpdateBankAccountMutation,
} from "@/redux/api/housekeepingApi/bankAccountTypeApi";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { bankAccountTypeSchema } from "@/schemas/bankAccountTypeSchema";

const EditBankAccountType = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSinglebankAccountQuery(id, {});
  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(sourceId);

  // console.log(sourceId);
  const [updateBankAccount] = useUpdateBankAccountMutation();



  // console.log(transactionOptions,'options');

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      active: data.result?.active,
      bankAccountTypeName: data.result?.bankAccountTypeName,
      bankAccountTypeNameBn: data.result?.bankAccountTypeNameBn,
      seqNo: data.result?.seqNo,
    });
  }, [data]);

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
      const res = await updateBankAccount({
        id,
        body: values,
      }).unwrap();
      const errorMessage= res?.message;
      console.log(errorMessage, "After getting res")
      console.log(res?.code, res?.message,"updated failed")
      if (res) {
        if(res?.code===400){
          message.error(errorMessage)
        }
        else if(res?.code===200){
          message.success("Bank Account Type updated successfully!");
          router.push(`/super_admin/hk/bank-account-type/view/${id}`);
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
     
        <UMBreadCrumb pageName="Bank Account Type" lastName="Update" link={`/super_admin/hk/bank-account-type`} />
   
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
        <Form submitHandler={onSubmit}
         resolver={yupResolver(bankAccountTypeSchema)} 
        defaultValues={defaultValue}>
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
                    color: "black",
                    textAlign: "left",

                  }}
                  type="text"
                  name="bankAccountTypeName"
                  label="Bank Account Type Name:"
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
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="bankAccountTypeNameBn"
                  label="Bank Account Type Name BN: "
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
                    color: "black",
                    textAlign: "left",
                  }}
                  type="number"
                  name="seqNo"
                  label="Seq No.: "
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
                <FormRadioSelect
                  label="Active Status:"
                  name="active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "InActive" },

                  ]}

                />
              </Col>
            </Row>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "0px 40px",
              alignItems: "center",
            }}
          >
            <Link href={`/super_admin/hk/bank-account-type`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/hk/bank-account-type`}>
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

export default EditBankAccountType;
