/* eslint-disable react/no-unescaped-entities */
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
import { Button, Col, Input, Row, message, Select } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { 
  useCustomerNameDropDownQuery,
  useAddUtilizationDeclarMutation,
  useExportLcdateQuery, 
   useGetSingleBankQuery, 
   useGetVatCodeDetailQuery } 
   from "@/redux/api/OrderManagementApi/utilizationDeclarationApi";
import Loading from "@/app/loading";
import { useRouter } from "next/navigation";
import { utilizationDeclarationSchema } from "@/schemas/utilizationDeclarationSchema";





const CreateUtiliDeclaration = () => {

  //Sates
  const [isPaidChecked, setIsPaidChecked] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // get bank branch  data

  const [bankId, setBankId] = useState("");

  //Vat Code Details
  const [vatCodeId, setVatCodeId] = useState("");

  const router = useRouter();
  const [createTreasuyryChallan] = useAddUtilizationDeclarMutation();



  //All Drop Down
  const { data: datasource } = useCustomerNameDropDownQuery({
    ...{},
  });
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

  const { data: vdsDate } = useExportLcdateQuery(selectedDate);
  const vdsData = vdsDate?.result?.vatMonth
  console.log('Selected Date from API:', vdsData);

  //Bank Name Drop down function
  const bankOptions =
    datasource &&
    datasource?.result?.bankType?.map((treasurychallan: any) => {
      return {
        label: treasurychallan?.name,
        value: parseInt(treasurychallan?.id),
      };
    });

  const handleSelectChange = (value: any) => {
    setBankId(value);
  };

  const { data: bankBranch } = useGetSingleBankQuery(bankId);

  // Bank Branch Options
  const [branchOptions, setBranchOptions] = useState([]);

  useEffect(() => {

    // Update branchOptions when bankBranch changes
    if (bankBranch && bankBranch.result && bankBranch.result?.bankBranchInfos) {
      const mappedOptions = bankBranch.result.bankBranchInfos.map((options: any) => ({
        label: options?.bankBranchNameBn,
        value: options?.id,
      }));

      // Update the state with the mapped options
      setBranchOptions(mappedOptions);
    }
  }, [bankId, bankBranch]);


  //Supplier Name Drop down function
  const commisionearateNameOptions =
    datasource &&
    datasource?.result?.commissionarateType?.map((treasurychallan: any) => {
      return {
        label: treasurychallan?.name,
        value: parseInt(treasurychallan?.id),
      };
    });

  //Vat Code Drop down function
  const vatCodeOptions =
    datasource &&
    datasource?.result?.vatCode?.map((treasurychallan: any) => {
      return {
        label: treasurychallan?.name,
        value: parseInt(treasurychallan?.id),
      };
    });


  const { data: vatCodeDetails } = useGetVatCodeDetailQuery(vatCodeId);

  const vatCodeDetailsData = vatCodeDetails?.result?.nameBn;

  console.log(vatCodeDetailsData, "Vat Code Details Data")

  const handleVatCodeDetails = (value: any) => {
    setVatCodeId(value)
  }


  // submit handler
  const onSubmit = async (values: any) => {

    values.vatMonthId = vdsData?.map((item: { id: number }) => item.id).join(', ');
    // values.vatCodeDetails = "SD Deposit for the Current";
    values.tcAcctItemId = vatCodeDetails?.result?.id;
    values.storeId = 8;

    try {
      console.log("Submitted Data", values);
      setLoading(true);
      const res = await createTreasuyryChallan(values);

      if ('data' in res && res.data && res.data.result) {
        message.success("Utilization Declaration Created Successfully!");
        router.push(`/super_admin/order-management/utilize-declare/view/${res?.data?.result?.id}`);
        setLoading(false);
      } else {
        // Handle API errors or validation errors
        message.error("Failed to Create Utilization Declar. Please check the data and try again.");
      }


    } catch (err: any) {
      console.error(err.message);
      // Handle other errors (e.g., network issues)
      message.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Utilization Declaration"
        lastName="Create"
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
          resolver={yupResolver(utilizationDeclarationSchema)}
          submitHandler={onSubmit}
        >
          <div style={{ padding: "0px", marginTop: "12px" }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              
               <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >

                <DRZSelectField
                  style={{
                    width: "100%", textAlign: "left"
                  }}
                  name="bankBrunchId"
                  label="Customer Name"
                  placeholder="Select Customer Name..."
                  onSearch={onSearch}
                  options={branchOptions}
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="bankId"
                  options={bankOptions}
                  label="Export LC No "
                  placeholder="--Select LC No of Concern Customer--"
                  onChange={(value) => {
                    handleSelectChange(value);
                  }}
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
                  label="Export LC Date:"
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
                  type="text"
                  name="treasuryChallanNo"
                  label="UD Register No"
                  placeholder="UD Register No..."
                  required
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
                  name="remark"
                  label="Remarks "
                  placeholder="Remarks...."
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

export default CreateUtiliDeclaration;
