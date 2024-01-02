"use client";

import Loading from "@/app/loading";
import FormRadioSelect from "@/components/Forms/DarazRadioSelect";
import DRZSelectField from "@/components/Forms/DRZSelectField";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import DarazCommonButton from "@/components/ui/DarazCommnonSaveButton";
import DarazCommonCloseButton from "@/components/ui/DarazCommonCloseButton";
import UMBreadCrumb from "@/components/ui/DRZBreadCrumb";
import {
  useGetSingleBankBranchQuery,
  useBankbranchDropdownQuery,
  useUpdateBankbranchMutation,
} from "@/redux/api/housekeepingApi/bankbranchInfoApi";
import { bankBranchSchema } from "@/schemas/bankBranchSchema";
import { yupResolver } from "@hookform/resolvers/yup";

import { Col, message, Row } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditBankBranch = ({ params }: any) => {
  // state
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [defaultValue, setDefaultValue] = useState({});

  const id = params.slug as string;
  const { data = [], isLoading } = useGetSingleBankBranchQuery(id, {});
  // const sourceId: any = data[0]?.tran_source_type_id;
  // console.log(sourceId);

  // console.log(sourceId);
  const [updateBnakbranch] = useUpdateBankbranchMutation();

  // const { data: datasource } = useGetSingleTransactionSourceQuery(sourceId);
  const { data: datasource } = useBankbranchDropdownQuery({
    ...{},
  });
  const bankbranchOptions =
    datasource &&
    datasource?.result.map((transaction: any) => {
      return {
        label: transaction?.bankNameBn,
        value: parseInt(transaction?.bankId),
      };
    });

  // console.log(transactionOptions,'options');

  useEffect(() => {
    setDefaultValue({
      id: parseInt(data.result?.id),
      active: data.result?.active,
      bankId: data.result?.bankId,
      bankBranchName: data.result?.bankBranchName,
      bankBranchNameBn: data.result?.bankBranchNameBn,
      bankBranchAddress: data.result?.bankBranchAddress,
      bankBranchAddressBn: data.result?.bankBranchAddressBn,
      bankBranchRoutingNo: data.result?.bankBranchRoutingNo,
      bankBranchPhoneNumber: data.result?.bankBranchPhoneNumber,
      bankBranchEmailAddress: data.result?.bankBranchEmailAddress,
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
      const res = await updateBnakbranch({
        id,
        body: values,
      }).unwrap();
      const errorMessage= res?.message;
      console.log(errorMessage, "After getting res")
      console.log(res?.code, res?.message,"updated failed")
      if (res) {
        if(res?.code===400){
          message.error(errorMessage)
        }
        else if(res?.code===200){
          message.success("Bank Branch updated successfully!");
          router.push(`/super_admin/hk/bank-branch-info/view/${id}`);
        }
        
      } else {
        message.error("Error!! Invalid Input");
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

      
        <UMBreadCrumb pageName="Bank Branch Info" lastName="Update" link={`/super_admin/hk/bank-branch-info`} />
     
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
        resolver={yupResolver(bankBranchSchema)} 
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


                <DRZSelectField
                  style={{
                    width: "100%",
                    textAlign: "left",
                  }}
                  name="bankId"
                  options={bankbranchOptions}
                  label="Bank Name:  "
                  placeholder="--Select Name--"
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
                  color: "black",
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
                  name="bankBranchName"
                  label="Bank Branch Name:"
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
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
                  name="bankBranchNameBn"
                  label="Bank Branch Name BN:"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
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
                  name="bankBranchPhoneNumber"
                  label="Phone Number: "
                  placeholder="Enter Phone Number"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
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
                  name="bankBranchEmailAddress"
                  label="Email Address: "
                  placeholder="Enter Email Address"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
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
                  name="bankBranchRoutingNo"
                  label="Routing Number: "
                  placeholder="Enter Routing Number"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    lineHeight: "35px",
                    width: "100%",
                    textAlign: "left",
                    color: "black",
                  }}
                  type="text"
                  name="bankBranchAddress"
                  label="Bank Branch Address: "
                  placeholder="Enter Bank Branch Address"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={6}
                style={{
                  marginBottom: "20px",
                  color: "black",
                }}
                aria-required
              >
                <FormInput
                  style={{
                    lineHeight: "35px",
                    width: "100%",
                    textAlign: "left",
                    color: "black",

                  }}
                  type="text-area"
                  name="bankBranchAddressBn"
                  label="Bank Branch Address Bn: "
                  placeholder="Enter Bank Branch Address Bn"
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
                  type="number"
                  name="seqNo"
                  label="Seq No: "
                  required
                />
              </Col>

              <Col
                className="gutter-row"
                span={6}
                style={{
                  color: "black",
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
            <Link href={`/super_admin/hk/bank-branch-info`}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  gap: "10px",
                }}
              >
                <Link href={`/super_admin/hk/bank-branch-info`}>
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

export default EditBankBranch;
