import * as yup from "yup";

export const bankInfoSchema = yup.object().shape({
  bankName: yup.string().required("Bank Info Name is required"),
  bankNameBn: yup.string().required("Bank Info Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
 });
