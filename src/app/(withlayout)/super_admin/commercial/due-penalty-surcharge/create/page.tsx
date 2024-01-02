"use client";
import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Input, Row,message } from "antd";
import Link from "next/link";
import { BaseSyntheticEvent, useState } from "react";
import * as yup from "yup";
import { useAddDuePenaltySerchargeMutation, useVatMonthQuery } from "@/redux/api/commercialApi/duePenaltySerchargeApi";
import { useRouter } from "next/navigation";




const CreateDuePenaltySurcharge = () => {


  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const router = useRouter();

  //Sending same date pattern as api
  const handleDateChange = (value: any) => {
    const selectedDate = new Date(value);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    console.log('Selected Date:', formattedDate);
    setSelectedDate(formattedDate);
  };

  const { data: vdsDate } = useVatMonthQuery(selectedDate);
  const vdsData = vdsDate?.result?.vatMonth
  console.log('Selected Date from API:', vdsData);


  const [addDue] = useAddDuePenaltySerchargeMutation();

  // submit handler
  const onSubmit = async (values: any) => {
    values.monthlyProcessStatus = 0;
    values.storeId = 8;
    values.vatMonthId = vdsData?.map((item: { id: number }) => item.id).join(', ');
  

    try {
      console.log("Submitted Data", values);
      setLoading(true);
      const res = await addDue(values);

      if ('data' in res && res.data && res.data.result) {
        message.success("Due Penalty Created Successfully!");
        router.push(`/super_admin/commercial/due-penalty-surcharge/view/${res?.data?.result?.id}`);
        setLoading(false);
      } else {
        // Handle API errors or validation errors
        message.error("Failed to Create Due Penalty. Please check the data and try again.");
      }


    } catch (err: any) {
      console.error(err.message);
      // Handle other errors (e.g., network issues)
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };




  if (loading) {
    return <Loading />;
  }
  const formSchema = yup.object().shape({
    transactionDate: yup.string().required("Transaction Date is required"),
    // vatMonthId: yup.number().required("VAT Month is required"),
    // ... any other validations
  });

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Due Penalty Surcharge"
        lastName="Insert"
        link={`/super_admin/commercial/due-penalty-surcharge`}
      />
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
          resolver={yupResolver(formSchema)}
          submitHandler={onSubmit}
        >
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="transactionID"
                  label="Transaction ID:"
                  value={"***</NEW/>***"}
                  disable
                  placeholder="***</NEW/>***"
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
                  name="transactionDate"
                  label="Transaction Date:"
                  onChange={handleDateChange}
                  size="large"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  name="vatMonthId"
                  value={vdsData?.map((item: { name: string }) => item.name).join(', ')}
                  label="VAT Month  "
                  placeholder="VAT Month"
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="intOnUnpaidVat"
                  label="Interest on Unpaid VAT"
                  placeholder="Interest on Unpaid VAT"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="intOnUnpaidSd"
                  label="Interest ON Unpaid VAT SD"
                  placeholder="Interest ON Unpaid VAT SD"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="penalty"
                  label="Panalty Amount "
                  placeholder="Panalty Amount"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="payableExciseDuty"
                  label="Payable Excise Duty "
                  placeholder="Payable Excise Duty"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="payableDevSurcharge"
                  label="Payabl Dev Surcharge "
                  placeholder="Payabl Dev Surcharge"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="payableIctDevSurcharge"
                  label="Payabl ICT Dev Surcharge "
                  placeholder="Payabl ICT Dev Surcharge"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="payableHealthCareSurcharge"
                  label="Payabl Health Care Surcharge "
                  placeholder="Payabl Health Care Surcharge"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="number"
                  name="payableEnvProtSurcharge"
                  label="Payabl Environment Port Surcharge "
                  placeholder="Payabl Environment Port Surcharge"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="remarks"
                  label="Remarks "
                  placeholder="Remarks...."
                />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{ marginTop: "20px" }}
              >
                <p style={{ color: "red", marginTop: "30px" }}>
                  *** Single VAT Month will have Single Entry
                </p>
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
              <Link href={`/super_admin/commercial/due-penalty-surcharge`}>
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

export default CreateDuePenaltySurcharge;
