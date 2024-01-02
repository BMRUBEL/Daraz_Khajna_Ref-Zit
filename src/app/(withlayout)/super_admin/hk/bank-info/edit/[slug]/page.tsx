"use client";

import Loading from "@/app/loading";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleBankInfoQuery,
  useUpdateBankinfoMutation,
} from "@/redux/api/housekeepingApi/bankInfoApi";
import { bankInfoSchema } from "@/schemas/bankInfoSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditBankInfo = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleBankInfoQuery(id, {});
  const [updateBankinfo] = useUpdateBankinfoMutation();

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      active: data.result?.active,
      bankName: data.result?.bankName,
      bankNameBn: data.result?.bankNameBn,
      seqNo: data.result?.seqNo,
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
      const res = await updateBankinfo({
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
          message.success("Bank Info updated successfully!");
          router.push(`/super_admin/hk/bank-info/view/${id}`);
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
  
        <UMBreadCrumb pageName="Bank Info " lastName="Update" link="/super_admin/hk/bank-info" />
 

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
        resolver={yupResolver(bankInfoSchema)}
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
                color: "black",
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
                  name="bankName"
                  label="Bank Name:"
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
                  name="bankNameBn"
                  label="Bank Name BN: "
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
                  label="Seq No: "
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
            <Link href={`/super_admin/hk/bank-info`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/hk/bank-info`}>
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

export default EditBankInfo;
