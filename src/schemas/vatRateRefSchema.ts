import * as yup from "yup";

export const vatRateRefSchema = yup.object().shape({
    vatRateRefName: yup.string().required("Vat Rate Ref Name is required"),
    vatRateRefNameBn: yup.string().required("Vat Rate Ref Name Bn is required"),
    seqNo: yup.string().required("Sequence Number is required"),
  });