"use client";

import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useAddLegalDocumentsMutation,
  useLegalDocumentsDropDownQuery,
} from "@/redux/api/companyApi/legalDocApi";
import { masterGroupSchema } from "@/schemas/company/companySchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import LegalDocChildTable from "@/components/ChildTable/CompanySetting/LegalDocChildTable";


const CreateLegalDocs = () => {
  // query
  
  const [loading, setLoading] = useState(false);

  
  const [addTransaction, { data: createData }] = useAddLegalDocumentsMutation();
  console.log(createData, "createTransaction");
  const router = useRouter();


  const { data: datasource, isLoading } = useLegalDocumentsDropDownQuery({
    ...{},
  });
  console.log(datasource, "source");

  const productCatOptions =
    datasource &&
    datasource?.result?.contetnt?.map((productcat: any) => {
      return {
        label: productcat?.tranSourceTypeNameBN,
        value: parseInt(productcat?.tranSourceTypeId),
      };
    });


  console.log(productCatOptions, "options");
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
      const res = await addTransaction(values);
      if (res) {
        message.success("legal-documents created successfully!");
        router.push(
          `/super_admin/company-setting/legal-documents/view/${res.data.result.id}`
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
      <UMBreadCrumb pageName="Legal Docs" lastName="Create" />

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
          resolver={yupResolver(masterGroupSchema)}
        >
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
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  type="text"
                  name="receiveNo"
                  size="large"
                  label="Doc No:"
                  required
                  placeholder="<<</New/>>"
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
                    textAlign: "left",
                  }}
                  type="text"
                  name="itemgroupPrefix"
                  label="Doc Name:"
                  placeholder="Enter Doc Name"
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
                  name="prodCatName"
                  options={productCatOptions}
                  label="Doc Type:"
                  placeholder="--Select Doc Type--"
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
                  name="receiveDate"
                  label="Upload Date:"
                  size="large"
                  required
                  style={{
                    width: "100%",
                  }}
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
                  name="receiveDate"
                  label="Expire Date:"
                  size="large"
                  required
                  style={{
                    width: "100%",
                  }}
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
                  type="file"
                  name="trnsTypeName"
                  label="Select File:"
                  placeholder="Trans Type Name"
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
                  name="itemDescription"
                  label="Remarks :"
                  placeholder="Trans Type Name"
                  required
                />
              </Col>
            </Row>
          </div>
        <LegalDocChildTable/>
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
              <Link href={`/super_admin/company-setting/legal-documents`}>
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

export default CreateLegalDocs;
