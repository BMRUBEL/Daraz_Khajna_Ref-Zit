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
import { useTreasuryChallanDropDownQuery, useAddTreasuryChallanMutation, useVatMonthQuery, useGetSingleBankQuery, useGetVatCodeDetailQuery } from "@/redux/api/commercialApi/treasuryChallanApi";
import Loading from "@/app/loading";
import { treasuaryChallan } from "@/schemas/treasuryChallanSchema";
import { useRouter } from "next/navigation";





const CreateTreasury = () => {

  //Sates
  const [isPaidChecked, setIsPaidChecked] = useState(true);
  const [selectedDate, setSelectedDate] = useState<any>('');
  const [loading, setLoading] = useState(false);

  // get bank branch  data

  const [bankId, setBankId] = useState("");

  //Vat Code Details
  const [vatCodeId, setVatCodeId] = useState("");

  const router = useRouter();

  const [addTreasury] = useAddTreasuryChallanMutation();



  //All Drop Down
  const { data: datasource } = useTreasuryChallanDropDownQuery({
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

  const { data: vdsDate } = useVatMonthQuery(selectedDate);
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
      const res = await addTreasury(values);

      if ('data' in res && res.data && res.data.result) {
        message.success("Treasury Challan Created Successfully!");
        router.push(`/super_admin/commercial/treasury-challan/view/${res?.data?.result?.id}`);
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



  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div style={{ padding: "10px" }}>
      <UMBreadCrumb
        pageName="Treasury Challan"
        lastName="Create"
        link={"/super_admin/commercial/treasury-challan"}
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
          resolver={yupResolver(treasuaryChallan)}
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
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="bankId"
                  options={bankOptions}
                  label="Bank Name/MFS "
                  placeholder="--Select Bank--"
                  onChange={(value) => {
                    handleSelectChange(value);
                  }}
                  required
                />
              </Col>
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
                  label="Bank Branch Name"
                  placeholder="Select Bank Branch"
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
                <FormDatePicker
                  name="treasuryChallanDate"
                  label="Treasury Challan Date:"
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
                  label="Treasury Challan No"
                  placeholder="00001"
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
                  name="commissionerateId"
                  options={commisionearateNameOptions}
                  label="Name Of Commisionararte"
                  required
                  placeholder="--Select Name--"
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{ marginBottom: "20px" }}
              >
                <DRZSelectField
                  style={{ width: "100%", textAlign: "left" }}
                  name="vatCodeId"
                  options={vatCodeOptions}
                  label="VAT Code"
                  required
                  placeholder="--Select Code--"
                  onChange={handleVatCodeDetails}
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
                  name=""
                  value={vatCodeDetailsData}
                  label="VAT Code Details "
                  placeholder="VAT code details"
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
                  name="tcAmount"
                  label="Treasury Amount "
                  placeholder="Treasury Amount"
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

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginTop: "20px" }}
              >
                <input
                  type="checkbox"
                  id="paidCheckbox"
                  checked={isPaidChecked}
                  onChange={(e) => setIsPaidChecked(e.target.checked)}
                />
                <label
                  htmlFor="paidCheckbox"
                  style={{ marginLeft: "10px", fontWeight: "bold" }}
                >
                  Paid
                </label>
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{ marginTop: "10px" }}
              >
                <Button
                  disabled={!isPaidChecked}
                  style={{
                    backgroundColor: isPaidChecked ? "#1890ff" : "gray",
                    cursor: isPaidChecked ? "pointer" : "not-allowed",
                  }}
                >
                  Make Payment
                </Button>
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{ marginTop: "20px" }}
              >
                <p style={{ color: "red", marginTop: "30px" }}>
                  *** If you click on the paid checkbox, the "Make Payment"
                  button will be enabled. ***
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
              <Link href={`/super_admin/commercial/treasury-challan`}>
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

export default CreateTreasury;
