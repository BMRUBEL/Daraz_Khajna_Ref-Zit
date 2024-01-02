import * as yup from "yup";

export const languageSchema = yup.object().shape({
  name: yup.string().required("Country Name is required"),
  appLangCode: yup.string().required("App Lang Code is required"),
  code: yup.string().required("Code is required"),
  rtl: yup.number().required("RTL is required"),
  seqNo: yup.number().required("RTL is required"),
  
});
