"use client";

import Loading from "@/app/loading";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleItemInfoQuery,
  useItemInfoDropdownQuery,
  useUpdateItemInfoMutation,
} from "@/redux/api/housekeepingApi/itemInfoApi";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditTransaction = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleItemInfoQuery(id, {});
  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(sourceId);

  // console.log(sourceId);
  const [updateTransaction] = useUpdateItemInfoMutation();

  const { data: datasource } = useItemInfoDropdownQuery({
    ...{},
  });
  const itemsubgroupOptions =
    datasource &&
    datasource?.result.map((itemsubgroup: any) => {
      return {
        label: itemsubgroup?.tranSourceTypeNameBN,
        value: parseInt(itemsubgroup?.tranSourceTypeId),
      };
    });
  const countryOriginOptions =
    datasource &&
    datasource?.result.map((countryorigin: any) => {
      return {
        label: countryorigin?.tranSourceTypeNameBN,
        value: parseInt(countryorigin?.tranSourceTypeId),
      };
    });
  const hscodeOptions =
    datasource &&
    datasource?.result.map((hscode: any) => {
      return {
        label: hscode?.tranSourceTypeNameBN,
        value: parseInt(hscode?.tranSourceTypeId),
      };
    });
  const productTypeOptions =
    datasource &&
    datasource?.result.map((producttype: any) => {
      return {
        label: producttype?.tranSourceTypeNameBN,
        value: parseInt(producttype?.tranSourceTypeId),
      };
    });
  const paymentMethodOptions =
    datasource &&
    datasource?.result.map((paymentmethod: any) => {
      return {
        label: paymentmethod?.tranSourceTypeNameBN,
        value: parseInt(paymentmethod?.tranSourceTypeId),
      };
    });
  const currencyInfoOptions =
    datasource &&
    datasource?.result.map((currencyinfo: any) => {
      return {
        label: currencyinfo?.tranSourceTypeNameBN,
        value: parseInt(currencyinfo?.tranSourceTypeId),
      };
    });
  const defaultVatOptions =
    datasource &&
    datasource?.result.map((defaultVat: any) => {
      return {
        label: defaultVat?.tranSourceTypeNameBN,
        value: parseInt(defaultVat?.tranSourceTypeId),
      };
    });
  const uomNameOptions =
    datasource &&
    datasource?.result.map((uomname: any) => {
      return {
        label: uomname?.tranSourceTypeNameBN,
        value: parseInt(uomname?.tranSourceTypeId),
      };
    });
  const stockUnitOptions =
    datasource &&
    datasource?.result.map((stockunit: any) => {
      return {
        label: stockunit?.tranSourceTypeNameBN,
        value: parseInt(stockunit?.tranSourceTypeId),
      };
    });
  const transUnitOptions =
    datasource &&
    datasource?.result.map((transunit: any) => {
      return {
        label: transunit?.tranSourceTypeNameBN,
        value: parseInt(transunit?.tranSourceTypeId),
      };
    });
  const salesunitOptions =
    datasource &&
    datasource?.result.map((salesUnitOptions: any) => {
      return {
        label: salesUnitOptions?.tranSourceTypeNameBN,
        value: parseInt(salesUnitOptions?.tranSourceTypeId),
      };
    });

  // console.log(transactionOptions,'options');

  useEffect(() => {
    setDefaultValue({
      _method: "PUT",
      id: parseInt(data.result?.id),
      trnsSourceTypeId: parseInt(data.result?.trnsSourceTypeId),
      trnsTypeName: data.result?.trnsTypeName,
      trnsTypeNameBn: data.result?.trnsTypeNameBn,
      seqNo: data.result?.seqNo,
    });
  }, [data, datasource]);

  // console.log(defaultValue, "Default value");

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
    console.log(values, "values");
    try {
      setLoading(true);
      const res = await updateTransaction({
        id,
        body: {
          ...values,
          id,
        }
      }).unwrap();
      if (res) {
        console.log("updateres");
        console.log(res);
        message.success("Item Info updated successfully!");
        router.push(`/super_admin/company-setting/items/item-info/view/${id}`);
      } else {
        message.error("err");
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
      <UMBreadCrumb pageName="Item Info" lastName="Edit" />
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
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={itemsubgroupOptions}
                  label="Item Sub Group Name:  "
                  placeholder="--Select Item Sub Group--"
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
                  name="trnsSourceTypeId"
                  options={countryOriginOptions}
                  label="Country Origin:  "
                  placeholder="--Select Country Origin--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={hscodeOptions}
                  label="Hs Code Name:  "
                  placeholder="--Select Hs Code Name--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={productTypeOptions}
                  label="Product Type:  "
                  placeholder="--Select Product Type--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={paymentMethodOptions}
                  label="Payment Mathod:  "
                  placeholder="--Select Payment Mathod--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={currencyInfoOptions}
                  label="Currency Info Name:  "
                  placeholder="--Select Currency Info Name --"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={defaultVatOptions}
                  label="Default VAT Rate Name:  "
                  placeholder="--Select Default VAT Rate Name--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={uomNameOptions}
                  label="UOM Name:  "
                  placeholder="--Select UOM Name--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={transUnitOptions}
                  label="Trans Unit Name:  "
                  placeholder="--Select Trans Unit Name--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={stockUnitOptions}
                  label="Stock Unit Name:  "
                  placeholder="--Select Stock Unit Name--"
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="trnsSourceTypeId"
                  options={salesunitOptions}
                  label="Sales Unit Name:  "
                  placeholder="--Select Sales Unit Name--"
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
                <Link href={`/super_admin/company-setting/items/item-info`}>
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

export default EditTransaction;
