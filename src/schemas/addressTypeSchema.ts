import * as yup from "yup";

export const addressTypeSchema = yup.object().shape({
  name: yup.string().required("Address Type is required"),
  nameBn: yup.string().required("Address Type Bn is required"),
  seqNo: yup.string().required("Sequence Number is required")
});