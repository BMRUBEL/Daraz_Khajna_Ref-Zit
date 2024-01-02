import * as yup from "yup";

export const divisionSchema = yup.object().shape({
  countryId: yup.string().required("Country is required"),
  name: yup.string().required("Division Name is required"),
  nameBn: yup.string().required("Division Name Bn is required"),
  // lat: yup.string().required("Latitude is required"),
  // longitude: yup.string().required("Longitude is required"),
  seqNo: yup.number().required("Sequence Number is required"),
});
