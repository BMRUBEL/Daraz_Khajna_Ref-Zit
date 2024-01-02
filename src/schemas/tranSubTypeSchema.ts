import * as yup from "yup";

export const tranSubTypeSchema = yup.object().shape({
    trnsTypeId: yup.string().required("Tran Type Name is required"),
    trnsSubTypeName: yup.string().required("Tran Sub Type Name is required"),
    trnsSubTypeNameBn: yup.string().required("Tran Sub Type Name Bn is required"),
  seqNo: yup.string().required("Sequence Number is required"),
});
