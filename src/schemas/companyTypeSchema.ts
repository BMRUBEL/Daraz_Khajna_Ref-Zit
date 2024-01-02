import * as yup from "yup";

export const companyTypeSchema = yup.object().shape({
  companyTypeCode: yup.string().required("Company Type Code is required"),
  companyTypeCodeBn: yup.string().required("Company Type Code BN is required"),
  companyType: yup.string().required("Company Type Name is required"),
  companyTypeBn: yup.string().required("Company Type Name BN is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
