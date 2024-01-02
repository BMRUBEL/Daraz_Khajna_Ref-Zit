import * as yup from "yup";

export const transAccountItemSchema = yup.object().shape({
   
    name: yup.string().required("Trans Account Name is required"),
    nameBn: yup.string().required("Trans Account Name Bn is required"),
    seqNo: yup.number().required("Sequence Number is required"),
  });