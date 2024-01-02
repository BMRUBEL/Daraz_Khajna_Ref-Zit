import * as yup from "yup";

export const storeDetailsSchema = yup.object().shape({
  branchId: yup.string().trim().required("Branch Name is required"),
  slCode: yup.string().trim().required("Store Location is required"),
  slName: yup.string().trim().required("Store Location Name is required"),
  slNameBn: yup.string().trim().required("Store Location Name Bn is required"),
  // stroeShortName:yup.string().trim().required("Store Short Name is required"),
  // stroeShortNameBn:yup.string().trim().required("Store Short Name Bn is required"),
  slAddress: yup.string().trim().required("Address is required"),
  slAddressBn: yup.string().trim().required("Address Bn is required"),
  slType: yup.string().trim().required("Store Type is required"),
  // employee:yup.string().trim().required("Employee is required"),
});
export const departmentSchema = yup.object().shape({
  departmentName: yup.string().trim().required("Department Name is required"),
  departmentNameBn: yup.string().trim().required("Department Name Bn is required"),
  departmentPrefix: yup.string().trim().required("Department Prefix is required").max(10, "Department Prefix not more than 10 Character "),
  departmentPrefixBn: yup.string().trim().required("Department Prefix Bn is required").max(10, "Department Prefix Bn is not more than 10 Character "),
  seqNo: yup.number().required("Seq No is required"),
});
export const designationSchema = yup.object().shape({
  desigName: yup.string().trim().required("Designation Name is required"),
  desigNameBn: yup.string().trim().required("Designation Name Bn is required"),
  seqNo: yup.string().trim().required("Seq No is required"),
});
export const sectionSchema = yup.object().shape({
  departmentId: yup.string().trim().required("Department is required"),
  secName: yup.string().trim("Blank space is not acceptable").required("Section Name is required").matches(/[a-zA-Z].*\d|[a-zA-Z]/, 'Not only number is acceptable'),
  secNameBn: yup.string().trim().required("Section Name Bn is required").matches(/[a-zA-Zঅ-হড়-ৎ].*\d|[a-zA-Zঅ-হড়-ৎ]/, 'Not only number is acceptable'),
  seqNo: yup.string().trim().required("Seq No is required"),
});
export const masterGroupSchema = yup.object().shape({
  itmMstrGrpName: yup.string().trim().required("Master Group Name is required"),
  itmMstrGrpNameBn: yup.string().trim().required("Master Group Name Bn is required"),
  itmMstrGrpPrefix: yup.string().trim().required("Master Group Prefix is required"),
  seqNo: yup.number().required("Seq No is required"),
});
export const legalDocSchema = yup.object().shape({
  branchId: yup.string().trim().required("Department is required"),
  storeLocation: yup.string().trim().required("Section Name is required"),
  storeLocationName: yup.string().trim().required("Section Name Bn is required"),
  seqNo: yup.string().trim().required("Seq No is required"),
});
