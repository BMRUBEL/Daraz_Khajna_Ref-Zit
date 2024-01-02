import * as yup from "yup";

export const tranSourceTypeSchema = yup.object().shape({

  tranSourceTypeName: yup.string().required("Source Type Name is required"),

  tranSourceTypeNameBN: yup.string().required(" Source Type Name Bn is required"),

  seqNo: yup.string().required("Sequence Number is required"),
});

