import * as yup from "yup";

export const bankAccountTypeSchema = yup.object().shape({
  bankAccountTypeName: yup.string().required("Bank Account Type Name is required"),
  bankAccountTypeNameBn: yup.string().required("Bank Account Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});