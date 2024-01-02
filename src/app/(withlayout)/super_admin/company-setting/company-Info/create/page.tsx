"use client";

import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import LogoInput from "@/components/Forms/LogoUpload";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";
import {
  useCompanyInfoDropDownQuery,
  useAddCompanyInfoMutation,
} from "@/redux/api/companyApi/companyInfoApi";
import { createCompanySchema } from "@/schemas/company/createCompanySchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, Input, message, Row, Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LegalDocChildTable from "@/components/ChildTable/CompanySetting/LegalDocChildTable";

const CreateCompanyInfoPage = () => {
  const [loading, setLoading] = useState(false);
  //onchange selecting field loading data
  const [companyTypeOptions, setCompanyTypeOptions] = useState([]);
  const [compTypeId, setSelectedCompanyType] = useState(null);
  const [compType, setSelectedCompanyNamebn] = useState("");

  const [areaCodeOptions, setAreaCodeOptions] = useState([]);
  const [areaCode, setSelectedAreaCode] = useState(null);
  const [areaCodeBn, setSelectedAreaCodeNamebn] = useState("");

  //end onchange selecting field loading data end
  const { data, isLoading } = useDepartmentsQuery({ limit: 100, page: 1 });

  const [addCompany, { data: createData }] = useAddCompanyInfoMutation();

  // console.log(createData, "Create Company");

  const router = useRouter();
  const { data: datasource } = useCompanyInfoDropDownQuery({
    ...{},
  });
  console.log(datasource, "source");

  const countryOptions =
    datasource &&
    datasource?.result?.country?.map((options: any) => {
      return {
        label: options?.name,
        value: parseInt(options?.id),
      };
    });

  //company options value pass

  useEffect(() => {
    const companyOptions =
      datasource &&
      datasource?.result?.companyType?.map((companyname: any) => {
        console.log("Company name", companyname)
        return {
          label: companyname?.name,
          value: parseInt(companyname?.id),
          namebn: companyname.namebn,
        };
      });
    setCompanyTypeOptions(companyOptions);

    // areacode data loading

    const areacodeOptions =
      datasource &&
      datasource?.result?.areaCode?.map((areacode: any) => {
        return {
          label: areacode?.name,
          value: parseInt(areacode?.id),
          namebn: areacode.namebn,
        };
      });
    setAreaCodeOptions(areacodeOptions);

    // areacode data loading end
  }, [datasource]);

  const handleCompanyTypeChange = (value: any, options: any) => {
    setSelectedCompanyType(value);
    setSelectedCompanyNamebn(options?.namebn || "");
  };

  const handleAreaCodeChange = (value: any, options: any) => {
    setSelectedAreaCode(value);
    setSelectedAreaCodeNamebn(options?.namebn || "");
  };
  //company options end
  const currencyOptions =
    datasource &&
    datasource?.result?.currency?.map((options: any) => {
      return {
        label: options?.name,
        value: parseInt(options?.id),
      };
    });

  console.log(countryOptions, "options");

  if (isLoading || loading) {
    return <Loading />;
  }

  const onChange = (value: string) => { };

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

    values.compLogo = "logo_image.jpg";

    try {
      console.log("on submit");
      setLoading(true);


      const res = await addCompany(values);
      console.log("all data", res);
      if (res) {
        message.success("Company Info created successfully!");
        router.push(
          `/super_admin/company-setting/company-Info/view/${res.data.result?.id}`
        );
        setLoading(false);
      }
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
      <UMBreadCrumb pageName="Company Info" lastName="Create" />
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
          resolver={yupResolver(createCompanySchema)}
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
                justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "5px",
                }}
              >
                <LogoInput
                  style={{
                    width: "100%",
                    textAlign: "center",
                  }}
                  type="file"
                  name="compLogo"
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
                  name="countryId"
                  options={countryOptions}
                  label="Country Name:  "
                  placeholder="Select Country..."
                  required
                  onSearch={onSearch}
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
                  name="compCode"
                  label="Company Code: "
                  placeholder="Enter Company Code..."
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
                <div>
                  <label htmlFor=""

                  >Company Type:<span style={{ color: "red" }}>*</span></label>

                  <Select
                    style={{ width: "100%" }}
                    showSearch
                    title="Company Type"
                    placeholder="Select Company Type"
                    onChange={handleCompanyTypeChange}
                    options={companyTypeOptions}
                    filterOption={filterOption}
                  />

                  {/* <DRZSelectField
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    name=""
                    options={companyTypeOptions}
                    label="Company Type:  "
                    placeholder="Select Company Type..."
                    required
                    onSearch={onSearch}
                    onChange={handleCompanyTypeChange}
                  /> */}
                </div>
              </Col>
            </Row>
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
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="compType"
                  value={compType}
                  label="Company Type Code: "
                  required
                  readOnly
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
                  name="compName"
                  label="Company Name: "
                  placeholder="Enter Company Name ..."
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
                  name="compNameBn"
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
                  name="compShortName"
                  label="Company Short Name: "
                  placeholder="Enter Company Short Name..."
                  required
                />
              </Col>
            </Row>
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
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="compShortNameBn"
                  label="Company Short Name BN: "
                  placeholder="Enter Company Short Name BN..."
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="currencyId"
                  options={currencyOptions}
                  label="Currency: "
                  placeholder="Enter Currency..."
                  filterOption={filterOption}
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
                <div>
                  <label htmlFor="">Area Code:<span style={{ color: "red" }}>*</span></label>
                  <Select
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    options={areaCodeOptions}
                    onChange={handleAreaCodeChange}
                    placeholder="Enter Area Code..."

                  />
                </div>
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
                  name="areaCodeBn"
                  label="Area Code Bn: "
                  placeholder="Enter Area Code Bn..."
                  value={areaCodeBn}
                  required
                  readOnly
                />
              </Col>
            </Row>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            ></Row>
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
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
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="compAddress"
                  label="Company Address: "
                  placeholder="Enter Company Address..."
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
                  name="compAddressBn"
                  label="Company Address BN: "
                  placeholder="Enter Company Address BN..."
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
                  name="phoneNumber"
                  label="Phone Number: "
                  placeholder="Enter Phone Number..."
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
                  name="emailAddress"
                  label="Email Address: "
                  placeholder="Enter Email Address..."
                  required
                />
              </Col>
            </Row>

            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
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
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="regPersonName"
                  label="Contact Person Name: "
                  placeholder="Enter Contact Person Name..."
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
                  name="regPersonNameBn"
                  label="Contact Person Name BN: "
                  placeholder="Enter Contact Person Name BN..."
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
                  name="regPersonNid"
                  label="Contact Person NID: "
                  placeholder="Enter Contact Person NID..."
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
                  name="regPersonNidBn"
                  label="Contact Person NID BN: "
                  placeholder="Enter Contact Person NID BN..."
                  required
                />
              </Col>

            </Row>
            {/* <LegalDocChildTable /> */}
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
              <Link href={`/super_admin/company-setting/company-Info`}>
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

export default CreateCompanyInfoPage;
