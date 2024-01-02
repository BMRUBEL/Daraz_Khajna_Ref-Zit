import * as yup from "yup";

export const vatRateTypeSchema = yup.object().shape({
    vatRateTypeName: yup.string().required("VAT Rate Name is required"),
    vatRateTypeNameBn: yup.string().required("VAT Rate Name Bn is required"),
    seqNo: yup.string().required("Sequence Number is required"),
  });
