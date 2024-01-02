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
  useGetSingleLcforQuery,
  useUpdateLCforMutation,
} from "@/redux/api/housekeepingApi/lcForApi";
import { lcForSchema } from "@/schemas/lcForSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditLCFor = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleLcforQuery(id, {});
  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(sourceId);

  // console.log(sourceId);
  const [updateLCFor] = useUpdateLCforMutation();




  // console.log(transactionOptions,'options');

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      active: data.result?.active,
      description: data.result?.description,
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
      const res = await updateLCFor({
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
          console.log(" Response ", res);
          message.success("LC For updated successfully!");
          router.push(`/super_admin/hk/lc-for/view/${id}`);
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
       
        <UMBreadCrumb pageName="LC For" lastName="Update" link={`/super_admin/hk/lc-for`} />
    

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
          resolver={yupResolver(lcForSchema)}
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
                // justifyContent: "space-between",
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
                <FormInput
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="description"
                  label="Description:"
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
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="seqNo"
                  label="Seqno:"
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
                  label="Status: "
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
            <Link href={`/super_admin/hk/lc-for`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/hk/lc-for`}>
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

export default EditLCFor;
