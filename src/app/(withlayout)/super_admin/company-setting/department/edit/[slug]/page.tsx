"use client";

import Loading from "@/app/loading";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleDepartmentQuery,
  useUpdateDepartmentMutation,
  useSectionDropDownQuery
} from "@/redux/api/companyApi/departmentApi";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import { yupResolver } from "@hookform/resolvers/yup";
import { departmentSchema } from "@/schemas/company/companySchema";
import DRZSelectField from "@/components/Forms/DRZSelectField";

const EditDepartment = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;



  // console.log(sourceId);
  const [updateDepartment] = useUpdateDepartmentMutation();
  const { data: datasource } = useSectionDropDownQuery({});
  const { data, isLoading } = useGetSingleDepartmentQuery(id);

  const singleDepartment = data?.result;

  useEffect(() => {
    setDefaultValue({
      companyId: singleDepartment?.companyId,
      companyName: singleDepartment?.companyName,
      departmentName: singleDepartment?.departmentName,
      departmentNameBn: singleDepartment?.departmentNameBn,
      departmentPrefix: singleDepartment?.departmentPrefix,
      departmentPrefixBn: singleDepartment?.departmentPrefixBn,
      active: singleDepartment?.active,
      seqNo: singleDepartment?.seqNo,
    });
  }, [singleDepartment]);


  console.log(datasource, "section");
  const sectionOptions =
    datasource && datasource?.result?.map((section: any) => {
      return {
        label: section?.name,
        value: parseInt(section?.id)
      };
    })

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

    try {
      setLoading(true);
      const res = await updateDepartment({
        id,
        body: values,
      }).unwrap();
      if (res) {
        message.success("Department updated successfully!");
        router.push(`/super_admin/company-setting/department/view/${id}`);
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
      <Link href={`/super_admin/company-setting/department`}>
        <UMBreadCrumb pageName="Department" lastName="Update" />
      </Link>

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
        <Form submitHandler={onSubmit}
          resolver={yupResolver(departmentSchema)}
          defaultValues={defaultValue}>
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="companyId"
                  options={sectionOptions}
                  label="Company Name:   "
                  placeholder="Select Company"
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
                  name="departmentName"
                  label="Department Name: "
                  placeholder="Enter Department Name..."
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
                  name="departmentNameBn"
                  label="Department Name Bn: "
                  placeholder="Enter Department Name Bn..."
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
                  name="departmentPrefix"
                  label="Department Prefix: "
                  placeholder="Enter Department Prefix..."
                  required
                />
              </Col>
            </Row>
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
                  name="departmentPrefixBn"
                  label="Department Prefix Bn: "
                  placeholder="Enter Department Prefix Bn..."
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
                  name="seqNo"
                  label="Seq No: "
                  placeholder="Enter Seq No..."
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
                <FormRadioSelect
                  label="Status: "
                  name="active"
                  options={[
                    { value: true, label: "Active" },
                    { value: false, label: "InActive" },
                  ]}
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
            <Link href={`/super_admin/company-setting/department`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/company-setting/department`}>
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

export default EditDepartment;
