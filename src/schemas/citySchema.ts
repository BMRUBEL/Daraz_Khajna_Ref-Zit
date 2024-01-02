import * as yup from "yup";

export const citySchema = yup.object().shape({
  countryId: yup.string().required("Country Name is required"),
  name: yup.string().required("City Name is required"),
  nameBn: yup.string().required("City Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
