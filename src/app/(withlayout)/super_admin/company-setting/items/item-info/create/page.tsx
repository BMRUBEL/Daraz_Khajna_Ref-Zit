"use client";

import Loading from "@/app/loading";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import {
  useAddItemInfoMutation,
  useItemInfoDropdownQuery,
} from "@/redux/api/housekeepingApi/itemInfoApi";
import { itemInfoSchema } from "@/schemas/itemInfoSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";



const CreateTransactionPage = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addTransaction, { data: createData }] = useAddItemInfoMutation();
  console.log(createData, "createTransaction");

  const router = useRouter();
  const { data: datasource } = useItemInfoDropdownQuery({
    ...{},
  });
  console.log(datasource,'source');

  const itemsubgroupoptions =
    datasource &&
    datasource?.result.map((itemsubgrop: any) => {
      return {
        label: itemsubgrop?.tranSourceTypeNameBN,
        value: parseInt(itemsubgrop?.tranSourceTypeId),
      };
    });
  const countryoriginoptions =
    datasource &&
    datasource?.result.map((countryorigin: any) => {
      return {
        label: countryorigin?.tranSourceTypeNameBN,
        value: parseInt(countryorigin?.tranSourceTypeId),
      };
    });
    const hscodeoptions =
    datasource &&
    datasource?.result.map((hscode: any) => {
      return {
        label: hscode?.tranSourceTypeNameBN,
        value: parseInt(hscode?.tranSourceTypeId),
      };
    });
    const producttypeoptions =
    datasource &&
    datasource?.result.map((producttype: any) => {
      return {
        label: producttype?.tranSourceTypeNameBN,
        value: parseInt(producttype?.tranSourceTypeId),
      };
    });
    const paymentmethodoptions =
    datasource &&
    datasource?.result.map((paymentmethod: any) => {
      return {
        label: paymentmethod?.tranSourceTypeNameBN,
        value: parseInt(paymentmethod?.tranSourceTypeId),
      };
    });
    const currencyoptions =
    datasource &&
    datasource?.result.map((currencyinfo: any) => {
      return {
        label: currencyinfo?.tranSourceTypeNameBN,
        value: parseInt(currencyinfo?.tranSourceTypeId),
      };
    });
    const defaultvatrateoptions =
    datasource &&
    datasource?.result.map((vatrate: any) => {
      return {
        label: vatrate?.tranSourceTypeNameBN,
        value: parseInt(vatrate?.tranSourceTypeId),
      };
    });
    const uomoptions =
    datasource &&
    datasource?.result.map((uom: any) => {
      return {
        label: uom?.tranSourceTypeNameBN,
        value: parseInt(uom?.tranSourceTypeId),
      };
    });
    const transunitoptions =
    datasource &&
    datasource?.result.map((transunit: any) => {
      return {
        label: transunit?.tranSourceTypeNameBN,
        value: parseInt(transunit?.tranSourceTypeId),
      };
    });
    const stockunitoptions =
    datasource &&
    datasource?.result.map((stockunit: any) => {
      return {
        label: stockunit?.tranSourceTypeNameBN,
        value: parseInt(stockunit?.tranSourceTypeId),
      };
    });
    const salesunitoptions =
    datasource &&
    datasource?.result.map((salesunit: any) => {
      return {
        label: salesunit?.tranSourceTypeNameBN,
        value: parseInt(salesunit?.tranSourceTypeId),
      };
    });

  console.log(itemsubgroupoptions ,'options');
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
      console.log('on submit');
      setLoading(true);
      const res = await addTransaction(values);
      if (res) {
        message.success("Item Info created successfully!");
        router.push(
          `/super_admin/company-setting/items/item-info/view/${res.data.result.id}`
        );
        setLoading(false);
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
      <UMBreadCrumb pageName="Item Info" lastName="Create" />
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
        <Form submitHandler={onSubmit} resolver={yupResolver(itemInfoSchema)}>
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
                  options={itemsubgroupoptions}
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
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeName"
                  label="Item Code:"
                  placeholder="Enter Item Code..."
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
                  name="trnsTypeNameBn"
                  label="Display Item Code: "
                  placeholder="Enter Display Item Code..."
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
                  name="trnsTypeNameBn"
                  label="Display Item Code Bn: "
                  placeholder="Enter Display Item Code Bn..."
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
                  name="trnsTypeNameBn"
                  label="Display Item Name: "
                  placeholder="Enter Display Item Name..."
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
                  name="trnsTypeNameBn"
                  label="Display Item Name Bn: "
                  placeholder="Enter Display Item Name Bn..."
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
                  name="trnsTypeNameBn"
                  label="Company Name Bn: "
                  placeholder="Enter Company Name Bn..."
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
                  name="trnsTypeNameBn"
                  label="Mushak Item Name: "
                  placeholder="Enter Mushak Item Name..."
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
                  name="trnsTypeNameBn"
                  label="Mushak Item Name Bn: "
                  placeholder="Enter Mushak Item Name Bn..."
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
                  options={countryoriginoptions}
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
                  options={hscodeoptions}
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
                  options={producttypeoptions}
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
                  options={paymentmethodoptions}
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
                  options={currencyoptions}
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
                  options={defaultvatrateoptions}
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
                  options={uomoptions}
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
                  options={transunitoptions}
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
                  options={stockunitoptions}
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
                  options={salesunitoptions}
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
                    textAlign: "left",
                  }}
                  type="text"
                  name="trnsTypeNameBn"
                  label="Currency Rate: "
                  placeholder="Enter Currency Rate"
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
                  name="trnsTypeNameBn"
                  label="Sefety level: "
                  placeholder="Enter Sefety level..."
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
                  name="trnsTypeNameBn"
                  label="Recorde level: "
                  placeholder="Enter Recorde level..."
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
              <Link href={`/super_admin/company-setting/items/item-info`}>
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

export default CreateTransactionPage;
