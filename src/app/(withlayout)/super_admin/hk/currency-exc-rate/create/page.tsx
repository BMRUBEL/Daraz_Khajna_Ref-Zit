"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import {
  useAddCurrencyExchangeMutation,
  useCurrencyExchangeDropdownQuery,
} from "@/redux/api/housekeepingApi/currencyExchangeRateApi";
 import { currencyEcxRateSchema } from "@/schemas/currencyEcxRateSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateCurrencyExchangeRatePage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addCurrencyExc, { data: createData }] = useAddCurrencyExchangeMutation();
  console.log(createData, "createTransaction");

  const router = useRouter();
  const { data: datasource } = useCurrencyExchangeDropdownQuery({
    ...{},
  });
  console.log(datasource, "source");
  const transactionOptions =
    datasource &&
    datasource?.result.map((transaction: any) => {
      return {
        label: transaction?.currencyShortCode,
        value: parseInt(transaction?.currencyInfoId),
      };
    });

  console.log(transactionOptions, "options");
  if (isLoading || loading) {
    return <Loading />;
  }

  const onChange = (value: string) => {};

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
      console.log("on submit");
      setLoading(true);
      const res = await addCurrencyExc(values);
      const errorMessage= res?.data?.message;
      if (res) {
        if(res?.data?.code===400){
          message.error(errorMessage)
          console.log(errorMessage, "error message")
        }
       else if ('data' in res && res.data && res.data.result){
          message.success("Currency Exc Rate created successfully!");
          router.push(
            `/super_admin/hk/currency-exc-rate/view/${res.data.result.id}`
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
 
      <UMBreadCrumb pageName="Exchange Rate" lastName="Create"  link={`/super_admin/hk/currency-exc-rate`} />
   
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
        <Form submitHandler={onSubmit} resolver={yupResolver(currencyEcxRateSchema)}>
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
                  name="currencyInfoId"
                  options={transactionOptions}
                  label="Currency Name:  "
                  placeholder="--Select Currency Name--"
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
              >
                <FormDatePicker
                  name="exchangeRateDate"
                  label="Exchange Rate Date & Time:"
                  placeholder="dd/mm/yy --:-- -- "
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
                  name="source"
                  label="Source: "
                  placeholder="Source..."
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
                  name="exchangeRate"
                  label="Exchange Rate: "
                  placeholder="Exchange Rate..."
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
              <Link href={`/super_admin/hk/currency-exc-rate`}>
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

export default CreateCurrencyExchangeRatePage;
