"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import LogoInput from "@/components/Forms/LogoUpload";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import { useDepartmentsQuery } from "@/redux/api/departmentApi";

import { yupResolver } from "@hookform/resolvers/yup";
import { Upload, Button, Col, Input, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEmployeeSchema } from "@/schemas/company/createEmplyeeSchema";
import {
  useSelectDepartmentQuery,
  useCreateEmployeeMutation,
} from "@/redux/api/companyApi/companyEmployeeApi";

const CreateEmployeePage = () => {

  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // State to store the uploaded image URL

  const handleFileChange = (event) => {
    // Update the selected file when the input changes
    setSelectedFile(event.target.files[0]);
  };

  const [loading, setLoading] = useState(false);

  const [addEmployee] = useCreateEmployeeMutation();

  // console.log(createData, "Create Employee");

  const router = useRouter();
  const { data: datasource } = useSelectDepartmentQuery({
    ...{},
  });
  // console.log(datasource, "source");

  const departmentOptions =
    datasource &&
    datasource?.result?.map((department: any) => {
      return {
        label: department?.name,
        value: parseInt(department?.id),
      };
    });

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
     // Default value is here


    try {

      console.log("on submit");
      setLoading(true);

      //Create a FormData object
      const formData = new FormData();

      //Append the selected file to the formData object
      formData.append("uplaodImage", selectedFile);

      //Append the other form  values to the FormData Object
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Use the addCompanyInfo mutation function to send the request
      const res = await addEmployee(formData);

      if (res) {
         
        if ('data' in res && res.data && res.data.result) {
          message.success("Data created successfully!");
          router.push(
            `/super_admin/company-setting/employee/view/${result.data.result.id}`
          );
          setLoading(false);
        } else {
          message.error("Error!! Insert Failed");
        }
      } else {
        console.error("Error adding company info:", res.error);
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
      <UMBreadCrumb pageName="Employee" lastName="Create" />
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
          resolver={yupResolver(createEmployeeSchema)}
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
                  marginBottom: "20px",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="uploadImage"
                  type="file"
                  label="Upload Image: "
                  required
                  onChange={handleFileChange}
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
                  name="departmentId"
                  options={departmentOptions}
                  label="Department Name:  "
                  placeholder="Select Department..."
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
                  name="designationId"
                  label="Designation: "
                  placeholder="Enter Designation..."
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
                  name="code"
                  label="Employee Code: "
                  placeholder="Employee Code..."
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
                  name="codeBn"
                  label="Employee Code Bn: "
                  placeholder="Employee Code Bn..."
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
                  name="name"
                  label="Employee Name: "
                  placeholder="Employee Name..."
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
                  name="nameBn"
                  label="Employee Name Bn: "
                  placeholder="Employee Name Bn..."
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
                  name="type"
                  label="Employee Type: "
                  placeholder="Employee Type..."
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
                  name="address"
                  label="Employee Address: "
                  placeholder="Employee Address..."
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
                  name="addressBn"
                  label="Employee Address Bn: "
                  placeholder="Employee Address Bn..."
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
                  name="phone"
                  label="Phone: "
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
                  label="Email: "
                  placeholder="Email..."
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
                  type="number"
                  name="nid"
                  label="NID: "
                  placeholder="Employee NID..."
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
                  type="file"
                  name="uploadNid"
                  label="Upload NID: "
                  placeholder="Choose File"
                  required
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
              <Link href={`/super_admin/company-setting/employee`}>
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

export default CreateEmployeePage;
