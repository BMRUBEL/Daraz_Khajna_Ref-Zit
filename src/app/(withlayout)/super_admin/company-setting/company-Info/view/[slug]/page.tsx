"use client";

import Loading from "@/app/loading";
import LegalDocChildTable from "@/components/ChildTable/CompanySetting/LegalDocChildTable";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import DarazCommonRedirectButton from "@/components/ui/DarazCommonRedirectButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useGetSingleCompanyInfoQuery } from "@/redux/api/companyApi/companyInfoApi";

import { Col, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";

const ViewCompanyInfoPage = ({ params }: any) => {
  // state
  const [defaultValue, setDefaultValue] = useState({});
  const [loading, setLoading] = useState(true);

  const id = params.slug as string;

  const { data } = useGetSingleCompanyInfoQuery(id);
  const companyData = data?.result;

  console.log(companyData, "Company Data");

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

  // console.log(defaultValue, "Default value");

  if (loading) {
    return <Loading />;
  }

  const onSubmit = () => { };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="Company Info" lastName="View" />
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
                  marginBottom: "20px",
                }}
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                    color: "black",
                  }}
                  name="companyLogo"
                  label="Logo:  "
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
                    textAlign: "left",
                    color: "black",
                  }}
                  name="countryName"
                  label="Country Name:  "
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
                    textAlign: "left",
                    color: "black",
                  }}
                  type="text"
                  name="compCode"
                  label="Company Code: "
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
                    textAlign: "left",
                    color: "black",
                  }}
                  type="text"
                  name="companyTypeName"
                  label="Company Type: "
                  required
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="compType"
                  label="Company Type Code: "
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
                    textAlign: "left",
                    color: "black",
                  }}
                  type="text"
                  name="compName"
                  label="Company Name: "
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
                    textAlign: "left",
                    color: "black",
                  }}
                  type="text"
                  name="compNameBn"
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
                    textAlign: "left",
                    color: "black",
                  }}
                  type="text"
                  name="compShortName"
                  label="Company Short Name: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="compShortNameBn"
                  label="Company Short Name Bn: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="currencyName"
                  label="Currency: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="areaCode"
                  label="Area Code: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="areaCodeBn"
                  label="Area Code BN: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="compAddress"
                  label="Company Address: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="compAddressBn"
                  label="Company Address BN: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="phoneNumber"
                  label="Phone Number: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="emailAddress"
                  label="Email Address: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="regPersonName"
                  label="Contact Person Name: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="regPersonNameBn"
                  label="Contact Person Name BN: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="regPersonNid"
                  label="Contact Person NID: "
                  disable
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
                    color: "black",
                  }}
                  type="text"
                  name="regPersonNidBn"
                  label="Contact Person NID BN: "
                  disable
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
                <DarazCommonRedirectButton
                  to={`/super_admin/company-setting/company-Info/edit/${id}`}
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

export default ViewCompanyInfoPage;
