import * as yup from "yup";

export const portInfoSchema = yup.object().shape({

  name: yup.string().required("Port Info Name is required"),
  nameBn: yup.string().required("Port Info Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
