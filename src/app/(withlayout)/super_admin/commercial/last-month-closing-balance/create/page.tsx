"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import Link from "next/link";
import {useState } from "react";
import { useLastMonthColumQuery, useVatMonthQuery, useAddLastMonthColumMutation } from "@/redux/api/commercialApi/lastMonthColumApi";
import Loading from "@/app/loading";
import { lastMonthClosingSchema } from "@/schemas/lastMonthClosingSchema";
import { useRouter } from "next/navigation";

const CreateLastmonthClosingBalance = () => {
  const [selectedDate, setSelectedDate]= useState<any>("")
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // console.log(datasource, "source");
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

const [addLastMonthClosing] = useAddLastMonthColumMutation();
const { data: vdsDate } = useVatMonthQuery(selectedDate);
  const vdsData = vdsDate?.result?.vatMonth
  console.log(vdsData, "date");

  // submit handler
  const onSubmit = async (values: any) => {
    values.vatMonthId = vdsData?.map((item: { id: number }) => item.id).join(', ');
    values.storeId = 8;
    try {
      console.log("Submitted Data", values);
      setLoading(true);
      const res = await addLastMonthClosing(values);
      if ('data' in res && res.data && res.data.result) {
        message.success(" Created Successfully!");
        router.push(`/super_admin/commercial/last-month-closing-balance/view/${res?.data?.result?.id}`);
        setLoading(false);
      } else {
        // Handle API errors or validation errors
        message.error("Failed to Create Treasury. Please check the data and try again.");
      }
    } catch (err: any) {
      console.error(err.message);
      // Handle other errors (e.g., network issues)
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb pageName="Last Month Closing" lastName="Create" link="/super_admin/commercial/last-month-closing-balance" />
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
       resolver={yupResolver(lastMonthClosingSchema)}
       submitHandler={onSubmit}
        >
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>


            <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="id"
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

              <Col className="gutter-row" 
                span={6} 
                style={{ marginBottom: "20px" }}>
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
              
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="lastMonthClosingBalanceVat"
                  label="LMC VAT Amount"
                  required
                />
              </Col>
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
              <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="lastMonthClosingBalanceSd"
                  label="LMC SD Amount"
                  required
                />
              </Col>
              <Col className="gutter-row" span={6} style={{ marginBottom: "20px" }}>
                <FormInput
                  style={{ width: "100%", textAlign: "left" }}
                  type="text"
                  name="remarks"
                  label="Remarks "
                  placeholder="Remarks...."
                />
              </Col>
            </Row>
            <p  style={{ color: "red", marginTop: "40px" }}>****Single VAT Month will have Single entry</p>
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
              <Link href={`/super_admin/commercial/last-month-closing-balance`}>
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

export default CreateLastmonthClosingBalance;
