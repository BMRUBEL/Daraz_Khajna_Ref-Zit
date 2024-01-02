"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useGetSingleFiscalYearQuery } from "@/redux/api/housekeepingApi/fiscalYearApi";
import { useUpdateFiscalYearInfoMutation } from "@/redux/api/housekeepingApi/fiscalYearApi";
import { fiscalYearSchema } from "@/schemas/fiscalYearSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const EditFiscalYear = ({ params }: any) => {


  const [selectedFromDate, setSelectedFromDate] = useState<any>("");
  const [selectedToDate, setSelectedToDate] = useState<any>("");


  //From Date Function
  const handleFromDate = (date:any) => {
    setSelectedFromDate(date);
  };
  //To Date Function
  const handleToDate = (date:any) => {
    setSelectedToDate(date);
  };


  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleFiscalYearQuery(id, {});
  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(data,'data')
  const [updateFiscalYearInfo] = useUpdateFiscalYearInfoMutation();

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      active: data?.result?.active,
      fiscalYear: data.result?.fiscalYear,
      fiscalYearBn: data.result?.fiscalYearBn,
      fromDate: dayjs(data.result?.fromDate).format("DD-MM-YYYY"),
      toDate: dayjs(data.result?.toDate ).format("DD-MM-YYYY"),
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

    values.fromDate=dayjs(selectedFromDate).format("YYYY-MM-DD");
    values.toDate=dayjs(selectedToDate).format("YYYY-MM-DD")

    console.log(values, "data");

    try {
      setLoading(true);
      const res = await updateFiscalYearInfo({
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
          message.success("Fiscal Year updated successfully!");
          router.push(`/super_admin/hk/fiscal-year/view/${id}`);
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
      
        <UMBreadCrumb pageName="Fiscal Year Info" lastName="Update" link={`/super_admin/hk/fiscal-year`} />
      
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
        resolver={yupResolver(fiscalYearSchema)}
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
                    textAlign: "left",
                    color: "black",
                  }}
                  type="text"
                  name="fiscalYear"
                  label="Fiscal Year Info:"
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
                    color: "black",
                  }}
                  type="text"
                  name="fiscalYearBn"
                  label="Fiscal Year Info BN:"
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
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="fromDate"
                  label="From Data:"
                  value={selectedFromDate}
                  onChange={handleFromDate}
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
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="toDate"
                  label="To Data:"
                  value={selectedToDate}
                  onChange={(date)=>handleToDate(date)}
                  required
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
                  width: "100%",
                  textAlign: "left",
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
                  type="number"
                  name="seqNo"
                  label="Seq. No:"
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
                  label="Active Status: "
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
            <Link href={`/super_admin/hk/fiscal-year`}>
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
              </div>
            </Link>
            <DarazCommonButton className="ml-3">Update</DarazCommonButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditFiscalYear;
