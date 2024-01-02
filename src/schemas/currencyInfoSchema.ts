import * as yup from "yup";

export const currencyInfoSchema = yup.object().shape({
  currencyShortCode: yup.string().required("Currency Short Code is required"),
  currencyDesc: yup.string().required("Currency Desc is required"),
  // trnsTypeNameBn: yup.string().required("Area Name Bn is required"),
  // seqNo: yup.string().required("Sequence Number is required"),
});
