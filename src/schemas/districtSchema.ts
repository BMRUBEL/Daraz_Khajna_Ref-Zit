import * as yup from "yup";

export const districtSchema = yup.object().shape({
  divisionId: yup.string().required("Division is required"),
  name: yup.string().required("District Name is required"),
  nameBn: yup.string().required("District Name Bn is required"),
  // lat: yup.string().required("Latitude is required"),
  // longitude: yup.string().required("Longitude is required"),
  seqNo: yup.string().required("Seq No. is required"),
});