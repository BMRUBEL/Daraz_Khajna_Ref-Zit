import * as yup from "yup";

export const challanTypeSchema = yup.object().shape({
    name: yup.string().required(" Challan Type Name is required"),
     nameBn: yup.string().required(" Challan Type Name Bn is required"),
     seqNo: yup.string().required("Sequence Number is required"),
  });