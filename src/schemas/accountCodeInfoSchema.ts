import * as yup from "yup";

export const accountCodeInfoSchema = yup.object().shape({
  name: yup.string().required("Account Code Name is required"),
  nameBn: yup.string().required("Account Code Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
