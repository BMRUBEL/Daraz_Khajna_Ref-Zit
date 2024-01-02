import * as yup from "yup";

export const upazillaSchema = yup.object().shape({
  districtId: yup.string().required("District Name is required"),
  name: yup.string().required("Upazilla Name is required"),
  nameBn: yup.string().required("Upazilla Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});