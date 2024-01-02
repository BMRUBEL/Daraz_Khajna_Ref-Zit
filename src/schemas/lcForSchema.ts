import * as yup from "yup";

export const lcForSchema = yup.object().shape({

  description: yup.string().required("Description is required"),
  seqNo: yup.number().required("Sequence Number is required"),
});
