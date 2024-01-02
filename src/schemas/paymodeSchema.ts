import * as yup from "yup";

export const paymodeSchema = yup.object().shape({
  name: yup.string().required("Paymode Type Name is required"),
  nameBn: yup.string().required("Paymode Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
