"use client";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Input, Row } from "antd";
import Link from "next/link";
import { BaseSyntheticEvent, useState, useEffect } from "react";
import * as yup from "yup";
import { useGetSingleUtilizationDeclarQuery } from "@/redux/api/OrderManagementApi/utilizationDeclarationApi";
import Loading from "@/app/loading";
import dayjs from "dayjs";

const ViewUtilizationDeclaration = ({ params }: any) => {


  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data, isLoading } = useGetSingleUtilizationDeclarQuery(id);

  const treasuryData = data?.result;

  useEffect(() => {
    setDefaultValue({
      id: parseInt(treasuryData?.id),
      transactionDate: dayjs(treasuryData?.transactionDate).format(
        "MMM D, YYYY"
      ),
      vatMonthName: treasuryData?.vatMonthName,
      bankName: treasuryData?.bankName,
      bankBranchName: treasuryData?.bankBranchName,
      treasuryChallanDate: dayjs(treasuryData?.treasuryChallanDate).format(
        "MMM D, YYYY"
      ),
      treasuryChallanNo: treasuryData?.treasuryChallanNo,
      nameOfCommissionerate: treasuryData?.nameOfCommissionerate,
      tcAcctItemName: treasuryData?.tcAcctItemName,
      tcAcctCodeName: treasuryData?.tcAcctCodeName,
      tcAmount: treasuryData?.tcAmount,
      remarks: treasuryData?.remarks,
    });
  }, [treasuryData]);

  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }


  const onSubmit = () => { };

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Utilization Declaration"
        lastName="View"
        link={"/super_admin/order-management/utilize-declare"}
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
          submitHandler={onSubmit}

          defaultValues={defaultValue}
        >
          <div style={{ padding: "0px", marginTop: "12px" }}>
            

<Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              
              <Col
               className="gutter-row"
               span={6}
               style={{ width: "100%", textAlign: "left", color: "black" }}
             >

               <FormInput
                 style={{
                   width: "100%", textAlign: "left"
                 }}
                 name="bankBrunchId"
                 label="Customer Name"
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
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                 name="bankId"
                 label="Export LC No"
                  required
                  disable
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
                 label="Export LC Date:"
                 size="large"
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
                  style={{ width: "100%", textAlign: "left", color: "black" }}
                 type="text"
                 name="treasuryChallanNo"
                 label="UD Register No"
                required
                disable
               />
             </Col>
         
             <Col
               className="gutter-row"
               span={6}
               style={{ marginBottom: "20px" }}
             >
               <FormDatePicker
                 name="treasuryChallanDate"
                 label="UD Register Date:"
                 size="large"
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
                 style={{ width: "100%", textAlign: "left", color: "black" }}
                 type="text"
                 name="remark"
                 label="Remarks "
                 disable
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
              <Link href={`/super_admin/order-management/utilize-declare`}>
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

export default ViewUtilizationDeclaration;
