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

import { Col, Input, message, Row, Select, Upload } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LegalDocChildTable from "@/components/ChildTable/CompanySetting/LegalDocChildTable";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import FormImageUpload from "@/components/Forms/FormImageUpload";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import DarazSelectWithCheckBox from "@/components/Forms/DRZSelectFieldWithCheckBox";








const CreateCompanyInfoPage = () => {


  //Image upload state

  const [imagePath, setImagePath] = useState<string | null>(null);

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
          `/super_admin/security/user-registration/view/${res.data.result?.id}`
        );
        setLoading(false);
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };



  const handleImageUpload = (filePath: string) => {
    setImagePath(filePath);
  };

  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <UMBreadCrumb pageName="User Registration" lastName="Create" link={"/super_admin/security/user-registration"} />
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
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  type="text"
                  name="compCode"
                  label="User Name: "
                  placeholder="Enter User Name..."
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
                  name="countryId"
                  options={countryOptions}
                  label="Employee:  "
                  placeholder="Select Employee..."
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
                  }}
                  type="text"
                  name="emailAddress"
                  label="Email Address: "
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
                  }}
                  type="text"
                  name="address"
                  label="Address: "
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
                  }}
                  type="text"
                  name="compCode"
                  label="Password: "
                  placeholder="Enter Password..."
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
                  name="compCode"
                  label="Confirm Password: "
                  placeholder="Enter Confirm Password..."
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
                <FormImageUpload
                  name="compCode"
                  label="Upload Company Logo: "
                  style={{
                    width: "100%",
                    textAlign: "left",

                  }}
                  onImageUpload={handleImageUpload}
                />
              </Col>
            </Row>
            <Row style={{
              display: "flex",
              alignItems: "left",

              // justifyContent: "space-between",
            }}
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormRadioSelect
                  label="Active Status: "
                  name="active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "InActive" },
                  ]}
                  defaultValue={true}
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                }}
              >
                <DarazSelectWithCheckBox
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="storeId"
                  options={countryOptions}
                  label="Store:  "
                  placeholder="Select Store..."
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
              >
                <DarazSelectWithCheckBox
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="roleId"
                  options={countryOptions}
                  label="Role:  "
                  placeholder="Select Role..."
                  required
                  onSearch={onSearch}
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
              <Link href={`/super_admin/security/user-registration`}>
                {" "}
                <DarazCommonCloseButton>Cancel</DarazCommonCloseButton>
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
