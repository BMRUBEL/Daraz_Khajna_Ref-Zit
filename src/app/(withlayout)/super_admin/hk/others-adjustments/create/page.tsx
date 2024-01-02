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
  useAddOtheradjustmentMutation,
} from "@/redux/api/housekeepingApi/othersAdjustmentApi";
import { othersadjustmentSchema } from "@/schemas/othersadjustmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



const CreateOtherAdjustmentPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addOtherAdjust, { data: createData }] = useAddOtheradjustmentMutation();
  console.log(createData, "createOtherAdjustment");

  const router = useRouter();

  // console.log(transactionOptions ,'options');
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
    try {
      console.log('on submit');
      setLoading(true);
      const res = await addOtherAdjust(values);
      const errorMessage= res?.data?.message;
      if (res) {
        if(res?.data?.code===400){
          message.error(errorMessage)
          console.log(errorMessage, "error message")
        }
       else if ('data' in res && res.data && res.data.result){
          message.success("Others Adjustments created successfully!");
        router.push(
          `/super_admin/hk/others-adjustments/view/${res.data.result.id}`
        );
        setLoading(false);
        }else{
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
 
        <UMBreadCrumb pageName="Others Adjustment" lastName="Create" link={`/super_admin/hk/others-adjustments`} />
 

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
        <Form submitHandler={onSubmit} resolver={yupResolver(othersadjustmentSchema)}>
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
                  name="name"
                  label="Other Adjustment Name:"
                  placeholder="Other Adjustment Name"
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
                  name="nameBn"
                  label="Other Adjustment Name BN: "
                  placeholder="Other Adjustment Name BN"
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
                  placeholder="Sequence No"
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
              <Link href={`/super_admin/hk/others-adjustments`}>
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

export default CreateOtherAdjustmentPage;
