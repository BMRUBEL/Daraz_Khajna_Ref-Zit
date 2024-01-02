"use client";

import Loading from "@/app/loading";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleItemInfoQuery,
  useItemInfoDropdownQuery,
} from "@/redux/api/housekeepingApi/itemInfoApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewTransactionPage = ({ params }: any) => {
  // state
  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;

  const { data = [], isLoading } = useGetSingleItemInfoQuery(id, {});
  const sourceId: any = data?.transSrcTypeId;
  // console.log(sourceId);

  const { data: datasource } = useItemInfoDropdownQuery({
    ...{},
  });
  const transactionOptions =
    datasource &&
    datasource?.result.map((transaction: any) => {
      return {
        label: transaction?.tranSourceTypeNameBN,
        value: parseInt(transaction?.tranSourceTypeId),
      };
    });

    const onSearch = (value: string) => {
      console.log("search:", value);
    };
  
    // filter on select
    const filterOption = (
      input: string,
      option?: { label: string; value: string }
    ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());


  useEffect(() => {
    setDefaultValue({
      trnsSourceTypeName: data.result?.trnsSourceTypeId,
      trnsTypeName: data.result?.trnsTypeName,
      trnsTypeNameBn: data.result?.trnsTypeNameBn,
      seqNo: data.result?.seqNo,
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
      <UMBreadCrumb pageName="Item Info" lastName="View" />
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
            }}
          >
            
           <Row
              style={{
                display: "flex",
                alignItems: "center",
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    color: "black",
                    textAlign: "left",
                  }}
                  name="trnsTypeName"
                  options={transactionOptions}
                  label="Item Sub Group Name:  "
                  required
                  disable
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
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeName"
                  label="Item Code:"
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
                  name="trnsTypeNameBn"
                  label="Display Item Code: "
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
                  name="trnsTypeNameBn"
                  label="Display Item Code Bn: "
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
                  name="trnsTypeNameBn"
                  label="Display Item Name: "
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
                  name="trnsTypeNameBn"
                  label="Display Item Name Bn: "
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
                  name="trnsTypeNameBn"
                  label="Company Name Bn: "
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
                  name="trnsTypeNameBn"
                  label="Mushak Item Name: "
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
                  name="trnsTypeNameBn"
                  label="Mushak Item Name Bn: "
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Country Origin:  "
                   required
                   disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Hs Code Name:  "
                  required
                  disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Product Type:  "
                   required
                   disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Payment Mathod:  "
                   required
                   disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Currency Info Name:  "
                   required
                   disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Default VAT Rate Name:  "
                   required
                   disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  required
                  disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Trans Unit Name:  "
                   required
                   disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Stock Unit Name:  "
                  required
                  disable
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsTypeNameBn"
                  options={transactionOptions}
                  label="Sales Unit Name:  "
                  required
                  disable
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
                    color: "black",
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeNameBn"
                  label="Currency Rate: "
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
                  name="trnsTypeNameBn"
                  label="Sefety level: "
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
                  name="trnsTypeNameBn"
                  label="Recorde level: "
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
                <FormCheckbox
                  name="myOptions"
                  options={[
                    {
                      value: "isrebateable",
                      label: "Is_Rebateable",
                    },
                  ]}
                  defaultValues={{
                    isrebateable: false,
                  }}
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
            <Link href={`/super_admin/company-setting/items/item-info`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonRedirectButton
                  to={`/super_admin/company-setting/items/item-info/edit/${id}`}
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

export default ViewTransactionPage;
