"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import { useAddFiscalYearMutation } from "@/redux/api/housekeepingApi/fiscalYearApi";
import { fiscalYearSchema } from "@/schemas/fiscalYearSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

const CreateFiscalYearPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [selectedFromDate, setSelectedFromDate] = useState<any>(dayjs().format("YYYY-MM-DD"));
  const [selectedToDate, setSelectedToDate] = useState<any>(dayjs().format("YYYY-MM-DD"));


  //From Date Function
  const handleFromDate = (date:any) => {
    setSelectedFromDate(date);
  };
  //To Date Function
  const handleToDate = (date:any) => {
    setSelectedToDate(date);
  };
console.log(selectedFromDate, "initial From Date")
  const [addFiscalYearInfo, { isLoading: isAddLoading }] =
    useAddFiscalYearMutation();

  const router = useRouter();

  // console.log(transactionOptions, "options");
  if (isLoading || isAddLoading) {
    return <Loading />;
  }

  // submit handler
  const onSubmit = async (values: any) => {


   values.fromDate=dayjs(selectedFromDate).format("YYYY-MM-DD");
   values.toDate=dayjs(selectedToDate).format("YYYY-MM-DD")

    try {
     
      console.log("on submit");
      setLoading(true);
      const res = await addFiscalYearInfo(values);
      const errorMessage= res?.data?.message;
      console.log(res);
      // @ts-ignore
      if (res?.data?.result) {
        if(res?.data?.code===400){
          message.error(errorMessage)
          console.log(errorMessage, "error message")
        }
       else if ('data' in res && res.data && res.data.result) {
          message.success("Fiscal Year created successfully!");
          router.push(`/super_admin/hk/fiscal-year/view/${res?.data?.result.id}`);
        } else {
          message.error("Error!! Insert Failed")
        }
      }else{
        message.error("Error!! Insert Failed")
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
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
    
        <UMBreadCrumb pageName="Fiscal Year Info" lastName="Create" link={`/super_admin/hk/fiscal-year`} />
   

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
        resolver={yupResolver(fiscalYearSchema)}
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
                justifyContent: "space-between"

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
                  name="fiscalYear"
                  label="Fiscal Year Info:"
                  placeholder="Fiscal Year Info"
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
                  name="fiscalYearBn"
                  label="Fiscal Year Info BN: "
                  placeholder="Fiscal Year Info BN"
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
                <FormDatePicker
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  name=""
                  label="From Date:"
                  value={selectedFromDate}
                  onChange={handleFromDate}
                // Other props as needed
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
                  style={{
                    width: '100%',
                    textAlign: 'left',
                  }}
                  name=""
                  label="To Date:"
                  value={selectedToDate}
                  onChange={(date)=>handleToDate(date)}
                // Other props as needed
                />
              </Col>

            </Row>
            <Row
              style={{
                display: "flex",
                alignItems: "center",

              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
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
                  type="text"
                  name="fiscalStatus"
                  label="Fiscal Status: "
                  placeholder="Enter Fiscal Status"
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
                  color: "black",
                  textAlign: "left",
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
              <Link href={`/super_admin/hk/fiscal-year`}>
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

export default CreateFiscalYearPage;
