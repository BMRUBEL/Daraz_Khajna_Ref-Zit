"use client";

import Loading from "@/app/loading";
import LegalDocChildTable from "@/components/ChildTable/CompanySetting/LegalDocChildTable";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import LogoInput from "@/components/Forms/LogoUpload";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleCompanyInfoQuery,
  useCompanyInfoDropDownQuery,
  useUpdateCompanyInfoMutation,
} from "@/redux/api/companyApi/companyInfoApi";

import { Col, message, Row, Select } from "antd";
import { Slabo_13px } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditCompanyInfo = ({ params }: any) => {
  // state
  const [companyTypeOptions, setCompanyTypeOptions] = useState([]);
  const [compTypeId, setSelectedCompanyType] = useState(null);
  const [compType, setSelectedCompanyNamebn] = useState("");

  const [areaCodeOptions, setAreaCodeOptions] = useState([]);
  const [areaCode, setSelectedAreaCode] = useState(null);
  const [areaCodeBn, setSelectedAreaCodeNamebn] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data } = useGetSingleCompanyInfoQuery(id);
  const companyData = data?.result;


  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(sourceId);

  // console.log(sourceId);
  const [updateTransaction] = useUpdateCompanyInfoMutation();

  const { data: datasource } = useCompanyInfoDropDownQuery({
    ...{},
  });
  const countryOptions =
    datasource &&
    datasource?.result?.country?.map((country: any) => {
      return {
        label: country?.name,
        value: parseInt(country?.id),
      };
    });
  const currencyOptions =
    datasource &&
    datasource?.result?.currency?.map((options: any) => {
      return {
        label: options?.name,
        value: parseInt(options?.id),
      };
    });

  useEffect(() => {
    const companyOptions =
      datasource &&
      datasource?.result?.companyType?.map((companyname: any) => {
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
  const handleAreaCodeChange = (value, options) => {
    setSelectedAreaCode(value);
    setSelectedAreaCodeNamebn(options.namebn || "");
  };
  const handleCompanyTypeChange = (value, options) => {
    setSelectedCompanyType(value);
    setSelectedCompanyNamebn(options?.namebn || "");
  };
  // console.log(transactionOptions,'options');

  useEffect(() => {
    setLoading(true);
    setDefaultValue({
      id: parseInt(companyData?.id),
      countryName: companyData?.countryName,
      // companyLogo: companyData?.companyLogo,
      compCode: companyData?.compCode,
      companyTypeName: companyData?.companyTypeName,
      compType: companyData?.compType,
      compName: companyData?.compName,
      compNameBn: companyData?.compNameBn,
      regPersonName: companyData?.regPersonName,
      regPersonNameBn: companyData?.regPersonNameBn,
      regPersonNid: companyData?.regPersonNid,
      regPersonNidBn: companyData?.regPersonNidBn,
      compShortName: companyData?.compShortName,
      compShortNameBn: companyData?.compShortNameBn,
      compAddress: companyData?.compAddress,
      compAddressBn: companyData?.compAddressBn,
      currencyName: companyData?.currencyName,
      areaCode: companyData?.areaCode,
      areaCodeBn: companyData?.areaCodeBn,
      phoneNumber: companyData?.phoneNumber,
      emailAddress: companyData?.emailAddress,

    });
    setLoading(false);
  }, [companyData]);

  console.log(defaultValue, "Default value");

  if (loading) {
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
    
    values.compLogo = "logo_image.jpg";

    try {
      setLoading(true);
      const res = await updateTransaction({
        id,
        body: data,
      }).unwrap();
      if (res) {
        message.success("Company Info updated successfully!");
        router.push(`/super_admin/company-setting/company-Info/view/${id}`);
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
      <UMBreadCrumb pageName="Company Info" lastName="Update" />
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
                  name="compCode"
                  label="Company Code: "
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
                  <label htmlFor="">
                   Company Type:<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    showSearch
                    // name="companyId"
                    title="Company Type"
                    placeholder="Select Company Type"
                    onChange={handleCompanyTypeChange}
                    options={companyTypeOptions}
                    filterOption={filterOption}
                  />
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
                  name="compTypeCode"
                  label="Company Type Code: "
                  value={compType}
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
                  name="compName"
                  label="Company Name: "
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
                  name="compShortName"
                  label="Company Short Name: "
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
                  options={currencyOptions}
                  name="currencyId"
                  label="Currency: "
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
                  <label htmlFor="">
                    Area Code:<span style={{ color: "red" }}>*</span>
                  </label>
                  <Select
                    style={{
                      width: "100%",
                      textAlign: "left",
                    }}
                    onChange={handleAreaCodeChange}
                    options={areaCodeOptions}
                    value={areaCode}
                    placeholder="Enter Area Code"
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
                  value={areaCodeBn}
                  label="Area Code Bn: "
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
                  name="contactPersonPhone"
                  label="Contact Person Phone: "
                  required
                />
              </Col>
            </Row>
            <LegalDocChildTable />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: "30px 40px",
              alignItems: "center",
            }}
          >
            <Link href={`/super_admin/company-setting/company-Info`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <DarazCommonCloseButton>Close</DarazCommonCloseButton>
              </div>
            </Link>
            <DarazCommonButton className="ml-3">Update</DarazCommonButton>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditCompanyInfo;
