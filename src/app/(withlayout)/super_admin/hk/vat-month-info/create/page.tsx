"use client";

import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import {
  useAddVatMonthMutation,
  useVatMonthInfoDropDownQuery,
} from "@/redux/api/housekeepingApi/vatMonthInfoApi";
import { vatMonthInfoSchema } from "@/schemas/vatMonthInfoSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";

const CreateVatMonthInfoPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addVatMonth, { data: createData }] = useAddVatMonthMutation();

  console.log(createData, "createTransaction");

  const router = useRouter();
  const { data: datasource } = useVatMonthInfoDropDownQuery({
    ...{},
  });

  console.log(datasource, "source");

  const fiscalYearData =
    datasource &&
    datasource?.result?.map((fiscal: any) => {
      return {
        label: fiscal?.fiscalYear,
        value: parseInt(fiscal?.id),
      };
    });

  console.log(fiscalYearData, "options");
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


    values.vmStatus = false;

    try {
      console.log("on submit");
      setLoading(true);
      const res = await addVatMonth(values);
      const errorMessage= res?.data?.message;
      if (res) {
        if(res?.data?.code===400){
          message.error(errorMessage)
          console.log(errorMessage, "error message")
        }
        else if('data' in res && res.data && res.data.result){
          message.success("Vat Month Info created successfully!");
          router.push(`/super_admin/hk/vat-month-info/view/${res.data.result.id}`);
          setLoading(false);
        }else{
          message.error("Error! Insert Failed")
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
    
        <UMBreadCrumb pageName="VAT Month Info " lastName="Create"  link={`/super_admin/hk/vat-month-info`} />
     

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
        <Form
          submitHandler={onSubmit}
          resolver={yupResolver(vatMonthInfoSchema)}
        >
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
                  name="fyId"
                  options={fiscalYearData}
                  label="Fiscal Year:  "
                  placeholder="Select Fiscal Year"
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
                  name="vmInfo"
                  label="VAT Month Name: "
                  placeholder="Vat Month Name"
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
                  name="vmInfoBn"
                  label="VAT Month Name BN: "
                  placeholder="VAT Month Name BN"
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
            </Row>
            <Row
              style={{
                display: "flex",
                alignItems: "left",
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
                <FormDatePicker
                  name="fromDate"
                  label="From Date:"
                  // size="medium"
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
                <FormDatePicker
                  name="toDate"
                  label="To Date:"
                  // size="medium"
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
              <Link href={`/super_admin/hk/vat-month-info`}>
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

export default CreateVatMonthInfoPage;
