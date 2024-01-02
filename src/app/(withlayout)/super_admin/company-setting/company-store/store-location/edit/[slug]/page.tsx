"use client";

import Loading from "@/app/loading";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormCheckbox from "@/components/Forms/DarazCheckBox";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleStoreDetailsQuery,
  useStoreDetailsDropDownQuery,
  useUpdateStoreDetailsMutation,
} from "@/redux/api/companyApi/storeDetailsApi";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditStoreDetails = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleStoreDetailsQuery(id, {});
  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(sourceId);

  // console.log(sourceId);
  const [updateStoreDetails] = useUpdateStoreDetailsMutation();

  // const { data: datasource } = useGetSingleTransactionSourceQuery(sourceId);
  const { data: datasource } = useStoreDetailsDropDownQuery({
    ...{},
  });
 //Dropdown fields
 const branchOptions =
 datasource &&
 datasource?.result?.companyBranch?.map((branch: any) => {
   return {
     label: branch?.name,
     value: parseInt(branch?.id),
   };
 });
const storeTypeOptions =
 datasource &&
 datasource?.result?.slType?.map((strType: any) => {
   return {
     label: strType?.name,
     value: parseInt(strType?.id),
   };
 });


  // console.log(transactionOptions,'options');

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      branchId: parseInt(data.result?.branchId),
      slCode: data.result?.slCode,
      slName: data.result?.slName,
      slNameBn: data.result?.slNameBn,
      slAddress: data.result?.slAddress,
      slAddressBn: data.result?.slAddressBn,
      slOfficerId: data.result?.slOfficerId,
      slType: data.result?.slType,
      isDefaultLocation: data.result?.isDefaultLocation,
      isVirtualLocation: data.result?.isVirtualLocation,
      isSalesPoint: data.result?.isSalesPoint,
      active: data.result?.active,
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
      const res = await updateStoreDetails({
        id,
        body: values,
      }).unwrap();
      if (res) {
        message.success("Store Location updated successfully!");
        router.push(`/super_admin/company-setting/company-store/store-location/view/${id}`);
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
      <UMBreadCrumb pageName="Store Location" lastName="Update" />
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
                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="branchId"
                  options={branchOptions}
                  label="Branch Name:   "
                  placeholder="Select Branch Name"
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
                  name="slCode"
                  label="Store Location Code: "
                  placeholder="Enter Code..."
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
                  name="slName"
                  label="Store Lcoation Name: "
                  placeholder="Enter Store Lcoation Name..."
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
                  name="slNameBn"
                  label="Store Lcoation Name BN: "
                  placeholder="Enter Store Lcoation Name BN..."
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
                  name="stroeShortName"
                  label="Store Short Name: "
                  placeholder="Enter Store Short Name..."
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
                  name="stroeShortNameBn"
                  label="Store Short Name Bn: "
                  placeholder="Enter Store Short Name Bn..."
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
                  name="slAddress"
                  label="Address: "
                  placeholder="Enter Address..."
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
                  name="slAddressBn"
                  label="Address Bn: "
                  placeholder="Enter Address Bn..."
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
                  name="slType"
                  options={storeTypeOptions}
                  label="Store Type:   "
                  placeholder="Enter Store Type..."
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
                  name="slOfficerId"
                  options={storeTypeOptions}
                  label="Employee:  "
                  placeholder="Select Employee"
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
                <FormCheckbox
                  name=""
                  options={[
                    {
                      value: "isDefaultLocation",
                      label: "Is Default Location",
                    },
                  ]}
                  checked={defaultValue?.isDefaultLocation}
                  isViewPage={true}
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
                      value: "isVirtualLocation",
                      label: "Is Virtual Location",
                    },
                  ]}
                  checked={defaultValue?.isVirtualLocation}
                  isViewPage={true}
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
                  name=""
                  options={[{ 
                   value: "isSalesPoint",
                   label: "Sales Point" 
                  }]}
                  checked={defaultValue?.isSalesPoint}
                  isViewPage={true}
                
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
            <Link href={`/super_admin/company-setting/company-store/store-location`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/company-setting/company-store/store-location`}>
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

export default EditStoreDetails;
