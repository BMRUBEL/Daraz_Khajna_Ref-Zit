import * as yup from "yup";

export const fiscalYearSchema = yup.object().shape({
    fiscalYear: yup.string().required("Fiscal Year info is required"),
    fiscalYearBn: yup.string().required("Fiscal Year info Bn is required"),
    seqNo: yup.number().required("Sequence Number is required"),
  });