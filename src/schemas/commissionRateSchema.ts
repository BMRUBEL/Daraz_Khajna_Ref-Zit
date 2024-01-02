import * as yup from "yup";

export const commissionRateSchema = yup.object().shape({
  name: yup.string().required("Commission Rate Name is required"),
  nameBn: yup.string().required("Commission Rate Name Bn is required"),
  code: yup.string().required("Code is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
