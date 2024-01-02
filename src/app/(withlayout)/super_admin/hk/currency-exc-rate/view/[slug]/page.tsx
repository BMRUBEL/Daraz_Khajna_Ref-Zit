"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleCurrencyExchangeQuery,
  useCurrencyExchangeDropdownQuery,
} from "@/redux/api/housekeepingApi/currencyExchangeRateApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewCurrencyExchangePage = ({ params }: any) => {
  // state
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data = [], isLoading } = useGetSingleCurrencyExchangeQuery(id, {});
  const sourceId: any = data?.currencyInfoId;
  // console.log(sourceId);

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      active: data.result?.active,
      currencyInfoId: parseInt(data.result?.currencyInfoId),
      currencyShortCode: data.result?.currencyShortCode,
      exchangeRateDate: data.result?.exchangeRateDate,
      exchangeRate: data.result?.exchangeRate,
      source: data.result?.source,
    });
  }, [data]);

  // console.log(defaultValue, "Default value");

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = () => {};

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
     
      <UMBreadCrumb pageName="Exchange Rate" lastName="View" link={`/super_admin/hk/currency-exc-rate`} />
 
      
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
        <Form submitHandler={onSubmit} defaultValues={defaultValue}>
          <div
            style={{
              padding: "0px",
              marginTop: "12px",
              color: "black"
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "space-between",
                color:"black"
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
                <FormInput
                  style={{
                    width: "100%",
                    color: "black", 
                    textAlign: "left",
                  }}
                  name="id"
                  label="Exchange Rate Id:  "
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
                <FormInput
                  style={{
                    width: "100%",
                    color: "black", 
                    textAlign: "left",
                  }}
                  name="currencyShortCode"
                  label="Currency Name:  "
                  required
                  disable
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black", 
                }}
              >
                <FormDatePicker
                  name="exchangeRateDate"
                  label="Exchange Rate Date & Time:"
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
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black", 
                    textAlign: "left",
                  }}
                  type="text"
                  name="source"
                  label="Source: "
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
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    color: "black", 
                    textAlign: "left",
                  }}
                  type="number"
                  name="exchangeRate"
                  label="Exchange Rate: "
                  required
                  disable
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
                 disable
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
            <Link href={`/super_admin/hk/currency-exc-rate`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/hk/currency-exc-rate/edit/${id}`}
                >
                  Go to edit
                </DarazCommonRedirectButton>
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </div>
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ViewCurrencyExchangePage;
